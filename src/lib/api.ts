// ── WorldCupDNA API client ──────────────────────────────────────────────
// Single typed gateway to the FastAPI backend. Handles Bearer-token auth,
// JSON (de)serialization, and consistent error surfacing. Every page imports
// from here — never call fetch() against the backend directly elsewhere.

import type {
  AuthResponse,
  GroupStanding,
  Leaderboard,
  Match,
  MatchList,
  Prediction,
  PredictionList,
  ScorerList,
  Shot,
  StatsCompetition,
  StatsMatch,
  StatsSource,
  User,
  VenueList,
} from '@/types'

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ||
  'https://worldcupdna-backend.onrender.com/api/v1'

const TOKEN_KEY = 'wcdna_token'
const REFRESH_KEY = 'wcdna_refresh'
const USER_KEY = 'wcdna_user'

// ── Token storage (client-only; guarded for SSR) ────────────────────────
export const tokenStore = {
  get(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(TOKEN_KEY)
  },
  getRefresh(): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(REFRESH_KEY)
  },
  getUser(): User | null {
    if (typeof window === 'undefined') return null
    const raw = window.localStorage.getItem(USER_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as User
    } catch {
      return null
    }
  },
  set(access: string, refresh: string, user: User) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(TOKEN_KEY, access)
    window.localStorage.setItem(REFRESH_KEY, refresh)
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  setUser(user: User) {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  clear() {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(REFRESH_KEY)
    window.localStorage.removeItem(USER_KEY)
  },
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions {
  method?: string
  body?: unknown
  auth?: boolean // attach Bearer token
  query?: Record<string, string | number | boolean | undefined | null>
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = `${API_BASE}${path}`
  if (!query) return url
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== null && v !== '') params.set(k, String(v))
  }
  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json'
  if (opts.auth) {
    const token = tokenStore.get()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(buildUrl(path, opts.query), {
      method: opts.method || 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    })
  } catch {
    throw new ApiError('Network error — could not reach the server.', 0)
  }

  if (res.status === 204) return undefined as T

  let data: unknown = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    throw new ApiError(extractError(data, res.status), res.status)
  }
  return data as T
}

function extractError(data: unknown, status: number): string {
  if (data && typeof data === 'object' && 'detail' in data) {
    const detail = (data as { detail: unknown }).detail
    if (typeof detail === 'string') return detail
    // FastAPI validation errors arrive as an array of {msg, loc}
    if (Array.isArray(detail) && detail.length) {
      const first = detail[0]
      if (first && typeof first === 'object' && 'msg' in first) {
        return String((first as { msg: unknown }).msg)
      }
    }
  }
  if (status === 401) return 'Invalid credentials.'
  if (status === 0) return 'Network error.'
  return `Request failed (${status}).`
}

// ── Auth ────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  username: string
  email: string
  password: string
  full_name?: string
  favorite_team?: string
  tactical_style?: string
  rivalry_level?: number
}

export const api = {
  // auth
  register: (payload: RegisterPayload) =>
    request<AuthResponse>('/auth/register', { method: 'POST', body: payload }),
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } }),

  // users
  me: () => request<User>('/users/me', { auth: true }),
  updateMe: (payload: Partial<User>) =>
    request<User>('/users/me', { method: 'PATCH', body: payload, auth: true }),
  updateInterests: (payload: {
    favorite_team?: string
    tactical_style?: string
    rivalry_level?: number
  }) => request<User>('/users/me/interests', { method: 'PUT', body: payload, auth: true }),

  // matches
  matches: (filters?: {
    stage?: string
    status?: string
    group?: string
    matchday?: number
  }) => request<MatchList>('/matches/', { query: filters }),
  today: () => request<MatchList>('/matches/today'),
  recent: (days = 3) => request<MatchList>('/matches/recent', { query: { days } }),
  upcoming: (limit = 12) => request<MatchList>('/matches/upcoming', { query: { limit } }),
  live: () => request<MatchList>('/matches/live'),
  standings: () => request<GroupStanding[]>('/matches/standings'),
  match: (id: string) => request<Match>(`/matches/${id}`),

  // predictions
  myPredictions: () => request<PredictionList>('/predictions/me', { auth: true }),
  predict: (match_id: string, predicted_home: number, predicted_away: number) =>
    request<Prediction>('/predictions/', {
      method: 'POST',
      body: { match_id, predicted_home, predicted_away },
      auth: true,
    }),
  updatePrediction: (id: string, predicted_home: number, predicted_away: number) =>
    request<Prediction>(`/predictions/${id}`, {
      method: 'PATCH',
      body: { predicted_home, predicted_away },
      auth: true,
    }),
  deletePrediction: (id: string) =>
    request<void>(`/predictions/${id}`, { method: 'DELETE', auth: true }),

  // leaderboard
  leaderboard: (limit = 100) =>
    request<Leaderboard>('/leaderboard/', { query: { limit }, auth: !!tokenStore.get() }),

  // venues
  venues: (params?: {
    city?: string
    county?: string
    country?: string
    lat?: number
    lng?: number
    radius_km?: number
  }) => request<VenueList>('/venues/', { query: params }),
  submitVenue: (payload: {
    name: string
    address: string
    city: string
    county?: string
    country?: string
    lat?: number
    lng?: number
    description?: string
    contact?: string
  }) => request<unknown>('/venues/submit', { method: 'POST', body: payload }),

  // players
  scorers: (limit = 20) => request<ScorerList>('/players/scorers', { query: { limit } }),

  // stats (StatsBomb advanced analytics)
  statsSource: () => request<StatsSource>('/stats/source'),
  statsCompetitions: () => request<StatsCompetition[]>('/stats/competitions'),
  statsMatches: (competitionId: number, seasonId: number) =>
    request<StatsMatch[]>(`/stats/competitions/${competitionId}/seasons/${seasonId}/matches`),
  statsShots: (matchId: number) => request<Shot[]>(`/stats/matches/${matchId}/shots`),
}

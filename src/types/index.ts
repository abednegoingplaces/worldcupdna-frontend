// ── Shared types — mirror the backend Pydantic schemas (app/modules/*/schemas.py)

export interface User {
  id: string
  username: string
  email: string
  full_name?: string | null
  avatar_url?: string | null
  favorite_team?: string | null
  tactical_style?: string | null
  rivalry_level?: number | null
  total_points: number
  is_verified: boolean
  is_admin: boolean
}

export interface AuthResponse {
  message: string
  access_token: string
  refresh_token: string
  token_type: string
  user: User
}

export type MatchStatus = 'scheduled' | 'live' | 'finished' | string

export interface Match {
  id: string
  home_team: string
  home_team_code?: string | null
  home_team_crest?: string | null
  away_team: string
  away_team_code?: string | null
  away_team_crest?: string | null
  home_score?: number | null
  away_score?: number | null
  match_date?: string | null
  stage?: string | null
  group_name?: string | null
  matchday?: number | null
  status: MatchStatus
  venue?: string | null
}

export interface MatchList {
  matches: Match[]
  total: number
}

export interface StandingRow {
  position: number
  team: string
  team_code?: string | null
  crest?: string | null
  played: number
  won: number
  draw: number
  lost: number
  goals_for: number
  goals_against: number
  goal_difference: number
  points: number
}

export interface GroupStanding {
  group?: string | null
  table: StandingRow[]
}

export interface Prediction {
  id: string
  user_id: string
  match_id: string
  predicted_home: number
  predicted_away: number
  points: number
  scored: number
  created_at?: string | null
}

export interface PredictionList {
  predictions: Prediction[]
  total: number
}

export interface LeaderboardRow {
  rank: number
  user_id: string
  username: string
  avatar_url?: string | null
  favorite_team?: string | null
  total_points: number
}

export interface Leaderboard {
  rows: LeaderboardRow[]
  total: number
  me?: LeaderboardRow | null
}

export interface Venue {
  id: string
  name: string
  address: string
  city?: string | null
  county?: string | null
  country?: string | null
  area?: string | null
  lat?: number | null
  lng?: number | null
  description?: string | null
  verified: boolean
  distance_km?: number | null
}

export interface VenueList {
  venues: Venue[]
  total: number
}

export interface Scorer {
  rank: number
  player: string
  player_id?: number | null
  team?: string | null
  team_crest?: string | null
  nationality?: string | null
  goals: number
  assists?: number | null
  penalties?: number | null
}

export interface ScorerList {
  scorers: Scorer[]
  total: number
}

// ── StatsBomb (advanced analytics) ──────────────────────────────────────
export interface StatsSource {
  provider: string
  tier: 'paid' | 'open-data' | string
  note: string
}

export interface StatsCompetition {
  competition_id: number
  season_id: number
  competition_name?: string | null
  season_name?: string | null
  country_name?: string | null
}

export interface StatsMatch {
  match_id: number
  home_team?: string | null
  away_team?: string | null
  home_score?: number | null
  away_score?: number | null
  match_date?: string | null
  competition_stage?: string | null
}

export interface Shot {
  minute?: number | null
  second?: number | null
  team?: string | null
  player?: string | null
  xg?: number | null
  outcome?: string | null
  location?: number[] | null
}

const API_BASE = 'https://worldcupdna-backend.onrender.com/api/v1'

export async function getMatches() {
  const res = await fetch(`${API_BASE}/matches/`)
  return res.json()
}

export async function getLiveMatches() {
  const res = await fetch(`${API_BASE}/matches/live`)
  return res.json()
}

export async function getVenues(params?: { city?: string; country?: string; lat?: number; lng?: number }) {
  const query = new URLSearchParams(params as any).toString()
  const res = await fetch(`${API_BASE}/venues/${query ? '?' + query : ''}`)
  return res.json()
}

export async function getLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard/`)
  return res.json()
}

export async function register(data: { username: string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}
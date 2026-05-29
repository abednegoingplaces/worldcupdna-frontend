export interface Profile {
  id: string
  username: string
  favorite_team: string
  tactical_style: string
  rival_hate_level: number
  dna_badge_url?: string
  total_points: number
  created_at: string
}

export interface Match {
  id: string
  home_team: string
  away_team: string
  home_score?: number
  away_score?: number
  match_date: string
  stage: string
  group_name?: string
  status: 'scheduled' | 'live' | 'finished'
}

export interface Prediction {
  id: string
  user_id: string
  match_id: string
  predicted_home: number
  predicted_away: number
  points_earned: number
  created_at: string
}

export interface Venue {
  id: string
  name: string
  address: string
  area: string
  lat?: number
  lng?: number
  description?: string
  verified: boolean
}
# WorldCupDNA — Project Plan

## Overview
WorldCupDNA is a fan identity and prediction platform built for FIFA World Cup 2026 (June 11 – July 19, 2026). Fans build a football DNA profile, predict match scores, compete on a leaderboard, and find watch parties in Nairobi.

---

## Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (frontend), Supabase (backend)

---

## Repository Structure
- `worldcupdna` — monorepo (source of truth)
- `worldcupdna-frontend` — Next.js frontend app
- `worldcupdna-backend` — API routes, Supabase migrations, seed scripts

---

## Database Tables
| Table | Purpose |
|---|---|
| `profiles` | Fan DNA profiles |
| `matches` | All 64 World Cup fixtures |
| `predictions` | User score predictions |
| `venues` | Nairobi watch party locations |

---

## API Routes
| Route | Method | Purpose |
|---|---|---|
| `/api/matches` | GET | Fetch matches (filter by stage/group) |
| `/api/venues` | GET | Fetch Nairobi watch party venues |
| `/api/leaderboard` | GET | Fetch top 50 users by points |
| `/api/profile` | GET/POST | Get or create fan profile |
| `/api/predictions` | GET/POST | Get or save predictions |
| `/api/predictions/score` | POST | Score predictions after match ends |

---

## Features
### 1. Fan DNA Profile Builder
- 3-step onboarding: account → team → tactical style
- Generates a shareable DNA badge
- Saves to Supabase profiles table

### 2. Match Predictions
- Fans predict scores before each match
- 3 points for exact score, 1 point for correct outcome
- Predictions lock when match kicks off

### 3. Live Match Hub
- Group stage standings
- Knockout bracket visualizer
- Real-time match status

### 4. Global Leaderboard
- Ranked by total prediction points
- Updates after each match is scored

### 5. Watch Party Finder (Nairobi)
- 8 verified sports bars and fan zones
- Map view with directions
- Filter by area

---

## Build Phases
### Phase 1 — Foundation ✅
- [x] Next.js project setup
- [x] Supabase config and auth
- [x] Database schema and migrations
- [x] Match and venue data seeded
- [x] API routes built and tested

### Phase 2 — Core Features (In Progress)
- [ ] Fan Profile Builder page
- [ ] Match Hub page
- [ ] Predictions page
- [ ] Leaderboard page
- [ ] Watch Party Finder page
- [ ] Auth pages (sign in / sign up)

### Phase 3 — Launch Polish
- [ ] Shareable DNA badge cards
- [ ] Social sharing (Twitter/WhatsApp)
- [ ] SEO and Open Graph tags
- [ ] Deploy to Vercel

---

## Timeline
| Date | Milestone |
|---|---|
| May 28, 2026 | Project started |
| May 30, 2026 | Backend complete |
| June 5, 2026 | Frontend complete |
| June 10, 2026 | Deployed to Vercel |
| June 11, 2026 | 🏆 FIFA World Cup 2026 kicks off |

---

## Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Contributors
- Built by abednegoingplaces
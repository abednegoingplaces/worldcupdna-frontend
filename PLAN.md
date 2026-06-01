# WorldCupDNA — Frontend Plan

## Overview
Next.js 14 PWA for FIFA World Cup 2026 fan platform.
Connected to FastAPI backend at worldcupdna-backend.onrender.com

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Anton (headlines) + Inter (body)
- **Deployment:** Vercel

---

## Color Palette (World Cup 2026 Theme)
| Color | Hex | Usage |
|---|---|---|
| Dark Navy | #080d1a | Base background |
| Metallic Gold | #c9a84c | Primary accent, stats, buttons |
| Crimson Red | #dc2626 | Live badges, urgency |
| Electric Blue | #1d4ed8 | Interactive elements |
| Ice White | #f8fafc | Text, headings |
| Glass | rgba(255,255,255,0.04) | Card backgrounds |

---

## Pages

| Page | Route | Status |
|---|---|---|
| Homepage | / | ⏳ Not Started |
| Sign In / Sign Up | /auth | ⏳ Not Started |
| Fan Profile Builder | /profile/build | ⏳ Not Started |
| My Profile | /profile | ⏳ Not Started |
| Match Hub | /matches | ⏳ Not Started |
| Leaderboard | /leaderboard | ⏳ Not Started |
| Watch Party Finder | /venues | ⏳ Not Started |

---

## Page Breakdown

### 1. Homepage (/)
- Fixed top navigation (glassmorphism)
- Hero section — stadium background, trophy, countdown timer
- Player legends row — Messi, Ronaldo, Mbappe, Vinicius, Bellingham, Hakimi
- Stats bar — 48 Teams, 104 Matches, 16 Cities, 5B+ Fans
- Features grid — DNA Profile, Predictions, Leaderboard, Watch Parties
- CTA banner — "Tournament kicks off June 11"
- Bottom mobile navigation
- Footer

### 2. Auth (/auth)
- Toggle Sign In / Sign Up
- Email + password fields
- Google OAuth button
- Connected to POST /api/v1/auth/register
- Connected to POST /api/v1/auth/login
- JWT token stored in localStorage

### 3. Fan Profile Builder (/profile/build)
- Step 1: Account creation (username, email, password)
- Step 2: Pick your nation (16 team cards with player photos)
- Step 3: Tactical style + rivalry slider
- Generates shareable DNA badge on completion
- Connected to POST /api/v1/users/me

### 4. My Profile (/profile)
- Display DNA badge
- Favorite team + tactical style
- Total points
- Prediction history
- Connected to GET /api/v1/users/me

### 5. Match Hub (/matches)
- Featured live match hero card
- Tab navigation — Group Stage, R16, QF, SF, Final
- Match cards grid with scores/times
- Group standings tables
- Knockout bracket visualizer
- Connected to GET /api/v1/matches
- Connected to GET /api/v1/matches/live

### 6. Leaderboard (/leaderboard)
- Top 3 podium (gold, silver, bronze)
- Global ranked list
- Friends tab
- My rank pinned at bottom
- Connected to GET /api/v1/leaderboard/global
- Connected to GET /api/v1/leaderboard/friends

### 7. Watch Party Finder (/venues)
- Next match countdown banner
- Search + area filter chips
- Venue cards with directions
- Map view
- Connected to GET /api/v1/venues

---

## Components
---

## API Integration
All API calls go to:
`https://worldcupdna-backend.onrender.com/api/v1/`

```typescript
// src/lib/api.ts
const API_BASE = 'https://worldcupdna-backend.onrender.com/api/v1'
```

---

## Build Order
1. [ ] Deploy to Vercel
2. [ ] Homepage
3. [ ] Auth page
4. [ ] Fan Profile Builder
5. [ ] Match Hub
6. [ ] Leaderboard
7. [ ] Watch Party Finder
8. [ ] Connect all pages to backend
9. [ ] DNA badge sharing
10. [ ] PWA config
11. [ ] SEO + Open Graph

---

## Timeline
| Date | Milestone |
|---|---|
| June 1, 2026 | Deploy to Vercel |
| June 3, 2026 | Homepage + Auth done |
| June 5, 2026 | All pages built |
| June 8, 2026 | Backend connected |
| June 10, 2026 | Polish + testing |
| June 11, 2026 | 🏆 Tournament kicks off |
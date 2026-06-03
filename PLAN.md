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

## API Integration
All calls go to: `https://worldcupdna-backend.onrender.com/api/v1`

```typescript
// src/lib/api.ts
const API_BASE = 'https://worldcupdna-backend.onrender.com/api/v1'
```

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
- Hero — stadium background, trophy, countdown to June 11
- Player legends row — Messi, Ronaldo, Mbappe, Vinicius, Bellingham, Hakimi
- Stats bar — 48 Teams, 104 Matches, 16 Cities, 5B+ Fans
- Features grid — DNA Profile, Predictions, Leaderboard, Watch Parties
- CTA banner — "Tournament kicks off June 11"
- Mobile bottom navigation

### 2. Auth (/auth)
- Toggle Sign In / Sign Up
- Email + password fields
- Google OAuth button
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- JWT stored in localStorage

### 3. Fan Profile Builder (/profile/build)
- Step 1: Account (username, email, password)
- Step 2: Pick your nation (16 team cards)
- Step 3: Tactical style + rivalry slider
- Generates shareable DNA badge
- POST /api/v1/users/me

### 4. My Profile (/profile)
- DNA badge display
- Favorite team + tactical style
- Total points + prediction history
- GET /api/v1/users/me

### 5. Match Hub (/matches)
- Featured live match hero card
- Tabs — Group Stage, R16, QF, SF, Final
- Match cards with live scores
- Group standings tables
- GET /api/v1/matches/
- GET /api/v1/matches/live
- GET /api/v1/matches/standings

### 6. Leaderboard (/leaderboard)
- Top 3 podium (gold, silver, bronze)
- Global ranked list
- My rank pinned at bottom
- GET /api/v1/leaderboard/

### 7. Watch Party Finder (/venues)
- Next match countdown banner
- Search + filter by city/country
- Location detection (auto-nearest venues)
- Venue cards + "Suggest a venue" button
- GET /api/v1/venues/
- POST /api/v1/venues/submit

---

## Components Structure
---

## Build Order
1. [x] Deploy to Vercel
2. [ ] Homepage
3. [ ] Auth page
4. [ ] Fan Profile Builder
5. [ ] Match Hub
6. [ ] Leaderboard
7. [ ] Watch Party Finder
8. [ ] Connect all to backend
9. [ ] DNA badge sharing
10. [ ] PWA config + install prompt
11. [ ] SEO + Open Graph

---

## Timeline
| Date | Milestone |
|---|---|
| June 3, 2026 | Deploy to Vercel |
| June 5, 2026 | All pages built |
| June 8, 2026 | Backend connected |
| June 10, 2026 | Polish + testing |
| June 11, 2026 | 🏆 Tournament kicks off |
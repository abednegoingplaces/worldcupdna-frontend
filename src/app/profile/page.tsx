'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Hardcoded mapping of NATION to football-data.org Team ID
// These IDs correspond to teams in the API. 
const NATION_TO_TEAM_ID: Record<string, number> = {
  'ARGENTINA': 107,
  'BRAZIL': 63,
  'FRANCE': 77,
  'ENGLAND': 66,
  'SPAIN': 79,
  'GERMANY': 759,
  'PORTUGAL': 764,
  'NETHERLANDS': 8600,
  'ITALY': 82, // Not in the 48 list but good to have
  'URUGUAY': 758,
  'CROATIA': 794,
  'BELGIUM': 805,
  'USA': 10, // Example IDs, might need adjustment based on exact API
  'MEXICO': 16,
}

interface Match {
  id: number
  homeTeam: { name: string }
  awayTeam: { name: string }
  utcDate: string
  competition: { name: string }
  status: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [nation, setNation] = useState<string | null>(null)
  const [starPlayer, setStarPlayer] = useState<string | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('FAN')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth?redirect=/profile')
      return
    }

    const savedNation = localStorage.getItem('selectedNation')
    const savedPlayer = localStorage.getItem('selectedPlayer')
    const savedUsername = localStorage.getItem('username')

    if (!savedNation || !savedPlayer) {
      // If no team picked, redirect back to home
      router.push('/')
      return
    }

    setNation(savedNation)
    setStarPlayer(savedPlayer)
    if (savedUsername) {
      setUsername(savedUsername)
    }

    const fetchMatches = async () => {
      try {
        const teamId = NATION_TO_TEAM_ID[savedNation.toUpperCase()]
        if (!teamId) {
          setError(`No upcoming match data available for ${savedNation} at this moment.`)
          setLoading(false)
          return
        }

        const res = await fetch(`/api/squad?teamId=${teamId}`)

        if (!res.ok) {
          throw new Error('Failed to fetch match data. Check API key or rate limits.')
        }

        const data = await res.json()
        setMatches(data.matches || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [router])

  const handleChangeTeam = () => {
    localStorage.removeItem('selectedNation')
    localStorage.removeItem('selectedPlayer')
    router.push('/')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-on-background flex justify-center items-center font-inter">
        <div className="flex flex-col items-center gap-md">
          <span className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></span>
          <div className="font-display-md text-headline-md text-primary-container font-black tracking-widest uppercase mt-4">LOADING MATCHES...</div>
        </div>
      </main>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-on-background font-inter">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/matches">
              Matches
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/predictions">
              Predictions
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/leaderboard">
              Leaderboard
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/venues">
              Watch Parties
            </Link>
          </nav>
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-sm">
              <span className="hidden sm:inline font-label-caps text-xs text-on-surface-variant uppercase tracking-wider">
                👋 {username}
              </span>
              <button 
                onClick={handleChangeTeam} 
                className="bg-transparent text-primary-container border border-primary-container px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-container hover:text-black transition-all font-montserrat"
              >
                Change Team
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-[88px] flex-grow">
        {/* Profile Header Hero */}
        <section className="relative py-xl px-gutter max-w-container-max mx-auto text-center overflow-hidden border-b border-outline-variant/20">
          <div className="absolute inset-0 bg-radial-gradient(circle, rgba(233,196,0,0.05) 0%, transparent 80%) pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-sm relative z-10">
            <div className="inline-flex items-center gap-sm bg-primary-container/10 border border-primary-container/20 px-md py-xs rounded-full text-primary-container font-label-caps text-xs tracking-widest uppercase">
              Your Selected Team
            </div>
            <h1 className="font-display-lg text-display-lg text-on-background tracking-tighter leading-none uppercase">
              {nation}
            </h1>
            <p className="font-headline-md text-headline-md text-on-surface-variant tracking-wide">
              Star Player: <span className="text-white font-extrabold">{starPlayer}</span>
            </p>
          </div>
        </section>

        {/* Upcoming Matches Section */}
        <section className="py-xl px-gutter max-w-[1000px] mx-auto space-y-lg">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
            <h2 className="font-display-md text-headline-lg font-black tracking-tight text-white uppercase flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>stadium</span>
              Upcoming Matches
            </h2>
            <span className="font-label-caps text-xs text-on-surface-variant/70 uppercase">
              Real-time API Data
            </span>
          </div>

          {error ? (
            <div className="bg-error-container/20 border border-error-container text-on-error-container p-md rounded-xl text-center font-body-md">
              <span className="material-symbols-outlined block text-3xl mb-xs">error</span>
              {error}
            </div>
          ) : matches.length === 0 ? (
            <div className="glass-card p-xl text-center text-on-surface-variant font-body-md">
              <span className="material-symbols-outlined block text-4xl mb-xs text-on-surface-variant/40">event_busy</span>
              No upcoming matches scheduled for {nation}.
            </div>
          ) : (
            <div className="flex flex-col gap-md">
              {matches.map((match) => (
                <div key={match.id} className="glass-card p-md md:p-lg relative overflow-hidden transition-all hover:border-outline-variant/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-md">
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-primary-container"></div>
                  
                  <div className="space-y-xs">
                    <span className="bg-surface-variant/40 text-primary-container border border-outline-variant/30 text-[10px] font-bold font-label-caps px-sm py-0.5 rounded-full uppercase tracking-wider">
                      {match.competition?.name || 'Competition'}
                    </span>
                    <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest pt-xs">
                      {match.utcDate ? new Date(match.utcDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Date TBD'}
                    </p>
                  </div>

                  <div className="flex items-center gap-md justify-center flex-1 max-w-xl">
                    <div className="font-display-md text-headline-md text-on-background font-black text-right flex-1 truncate">{match.homeTeam?.name || 'TBD'}</div>
                    <div className="bg-surface-variant/50 border border-outline-variant/30 px-3 py-1.5 rounded-lg text-primary-container font-label-caps text-xs font-black font-semibold">VS</div>
                    <div className="font-display-md text-headline-md text-on-background font-black text-left flex-1 truncate">{match.awayTeam?.name || 'TBD'}</div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-xs min-w-[120px]">
                    <span className="font-label-caps text-[12px] font-bold text-on-surface-variant bg-white/[0.02] border border-white/5 px-3 py-1 rounded">
                      {match.utcDate ? new Date(match.utcDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Time TBD'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl bg-surface-container-lowest border-t border-outline-variant/50 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto space-y-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-headline-md text-headline-md text-primary-container font-black">WorldCupDNA</span>
            <p className="font-body-md text-body-md text-on-tertiary-container">© 2026 WorldCupDNA. All Rights Reserved. One Dream, One World.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-md">
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Terms of Service</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Fan Support</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="https://www.fifa.com" target="_blank" rel="noopener noreferrer">Official FIFA Site</Link>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 flex items-center justify-around z-50">
        {[
          { href: '/', icon: 'home', label: 'Home', active: false },
          { href: '/matches', icon: 'sports_soccer', label: 'Matches', active: false },
          { href: '/predictions', icon: 'analytics', label: 'Predict', active: false },
          { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks', active: false },
          { href: '/venues', icon: 'location_on', label: 'Venues', active: false },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-xs transition-colors ${item.active ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

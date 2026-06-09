'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const A = 'Anton, sans-serif'

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth?redirect=/profile')
      return
    }

    const savedNation = localStorage.getItem('selectedNation')
    const savedPlayer = localStorage.getItem('selectedPlayer')

    if (!savedNation || !savedPlayer) {
      // If no team picked, redirect back to home
      router.push('/')
      return
    }

    setNation(savedNation)
    setStarPlayer(savedPlayer)

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
      <main style={{ minHeight: '100vh', backgroundColor: '#101415', color: '#e0e3e5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontFamily: A, fontSize: '32px', color: '#e6c364' }}>LOADING MATCHES...</div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#101415', color: '#e0e3e5' }}>
      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 48px', height: '64px', backgroundColor: 'rgba(16,20,21,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/" style={{ fontFamily: A, color: '#e6c364', fontSize: '20px', letterSpacing: '1px', textDecoration: 'none' }}>WORLDCUPDNA</Link>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button onClick={handleChangeTeam} style={{ border: '1px solid #e6c364', background: 'transparent', color: '#e6c364', padding: '8px 20px', fontSize: '14px', cursor: 'pointer' }}>CHANGE TEAM</button>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <section style={{ paddingTop: '120px', paddingBottom: '40px', textAlign: 'center', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ color: '#e6c364', fontSize: '14px', letterSpacing: '4px', marginBottom: '8px' }}>YOUR SELECTED TEAM</div>
        <h1 style={{ fontFamily: A, fontSize: 'clamp(40px,6vw,72px)', color: '#fff', marginBottom: '16px', lineHeight: 1 }}>{nation}</h1>
        <p style={{ color: '#c6c6cc', fontSize: '18px', letterSpacing: '2px' }}>STAR PLAYER: <span style={{ color: '#fff' }}>{starPlayer}</span></p>
      </section>

      {/* UPCOMING MATCHES */}
      <section style={{ padding: '40px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: A, fontSize: '32px', color: '#fff', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>UPCOMING MATCHES</h2>
        
        {error ? (
          <div style={{ color: '#ff6b6b', backgroundColor: 'rgba(255,107,107,0.1)', padding: '24px', border: '1px solid rgba(255,107,107,0.2)', textAlign: 'center' }}>
            {error}
          </div>
        ) : matches.length === 0 ? (
          <div style={{ color: '#909096', textAlign: 'center', padding: '40px' }}>No upcoming matches scheduled.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {matches.map((match) => (
              <div key={match.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#e6c364' }}></div>
                <div style={{ color: '#e6c364', fontSize: '11px', letterSpacing: '2px', marginBottom: '12px', textTransform: 'uppercase' }}>{match.competition?.name || 'Competition'}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginBottom: '12px' }}>
                  <div style={{ fontFamily: A, fontSize: '24px', color: '#fff', flex: 1, textAlign: 'right' }}>{match.homeTeam?.name || 'TBD'}</div>
                  <div style={{ color: '#e6c364', fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px' }}>VS</div>
                  <div style={{ fontFamily: A, fontSize: '24px', color: '#fff', flex: 1, textAlign: 'left' }}>{match.awayTeam?.name || 'TBD'}</div>
                </div>
                <div style={{ color: '#909096', fontSize: '13px', textAlign: 'center' }}>
                  {match.utcDate ? new Date(match.utcDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date TBD'}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

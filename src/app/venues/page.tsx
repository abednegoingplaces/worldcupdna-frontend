'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const A = 'Anton, sans-serif'

const FILTERS = ['ALL', 'NAIROBI', 'MOMBASA', 'LAGOS', 'LONDON']

export default function VenuesPage() {
  const [venues, setVenues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [isMobile, setIsMobile] = useState(false)
  const [countdown, setCountdown] = useState('LOADING...')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const target = new Date('2026-06-11T00:00:00')
    const timer = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) { setCountdown('LIVE NOW!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setCountdown(`${String(d).padStart(2,'0')}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M TO KICKOFF`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch('https://worldcupdna-backend.onrender.com/api/v1/venues/')
        if (res.ok) {
          const data = await res.json()
          setVenues(data.venues || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVenues()
  }, [])

  const filteredVenues = venues.filter(v => {
    const matchesSearch = (v.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
                          (v.city?.toLowerCase() || '').includes(search.toLowerCase()) || 
                          (v.country?.toLowerCase() || '').includes(search.toLowerCase())
    
    if (activeFilter !== 'ALL') {
      return matchesSearch && v.city?.toUpperCase() === activeFilter
    }
    return matchesSearch
  })

  return (
    <main style={{minHeight:'100vh', backgroundColor:'#101415', color:'#e0e3e5', overflowX:'hidden'}}>
      {/* NAVBAR */}
      <nav style={{position:'fixed', top:0, width:'100%', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '0 16px' : '0 48px', height:'52px', backgroundColor:'rgba(16,20,21,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{fontFamily:A, color:'#e6c364', fontSize: isMobile ? '16px' : '20px', letterSpacing:'1px'}}>WORLDCUPDNA</div>
        <div style={{display:'flex', gap: isMobile ? '12px' : '32px', alignItems:'center'}}>
          {!isMobile && <Link href="/matches" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Matches</Link>}
          {!isMobile && <Link href="/leaderboard" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Leaderboard</Link>}
          {!isMobile && <Link href="/venues" style={{color:'#e6c364', textDecoration:'none', fontSize:'14px'}}>Watch Parties</Link>}
          <Link href="/auth" style={{border:'1px solid #e6c364', color:'#e6c364', padding: isMobile ? '6px 14px' : '8px 20px', textDecoration:'none', fontSize: isMobile ? '12px' : '14px'}}>LOGIN</Link>
        </div>
      </nav>

      {/* COUNTDOWN BANNER */}
      <div style={{marginTop: '52px', backgroundColor: '#e6c364', padding: '12px', textAlign: 'center', color: '#000', fontFamily: A, fontSize: '18px', letterSpacing: '2px'}}>
        NEXT MATCH: {countdown}
      </div>

      {/* HEADER & SEARCH */}
      <section style={{padding: isMobile ? '40px 16px' : '64px 48px', textAlign: 'center'}}>
        <h1 style={{fontFamily: A, fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : '64px', color: '#fff', marginBottom: '16px'}}>WATCH PARTY FINDER</h1>
        <p style={{color: '#c6c6cc', fontSize: '16px', marginBottom: '32px'}}>Find verified venues to experience the tournament together.</p>
        
        <input 
          type="text" 
          placeholder="Search venues by city or country..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', 
            maxWidth: '600px', 
            padding: '16px 24px', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            color: '#fff', 
            fontSize: '16px', 
            borderRadius: '30px', 
            outline: 'none',
            marginBottom: '24px'
          }}
        />

        {/* FILTER CHIPS */}
        <div style={{display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap'}}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                backgroundColor: activeFilter === f ? '#e6c364' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f ? '#000' : '#e0e3e5',
                border: activeFilter === f ? '1px solid #e6c364' : '1px solid rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* VENUE GRID */}
      <section style={{padding: isMobile ? '0 16px 64px' : '0 48px 80px', maxWidth: '1200px', margin: '0 auto'}}>
        {loading ? (
          <div style={{textAlign: 'center', color: '#e6c364', fontFamily: A, fontSize: '24px'}}>LOADING VENUES...</div>
        ) : filteredVenues.length === 0 ? (
          <div style={{textAlign: 'center', color: '#c6c6cc', padding: '64px 0'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🏟️</div>
            <div style={{fontSize: '20px', color: '#fff', marginBottom: '8px'}}>No venues found</div>
            <div style={{color: '#909096'}}>Try adjusting your search or filters.</div>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px'}}>
            {filteredVenues.map(v => (
              <div key={v.id} style={{backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                  <h2 style={{fontFamily: A, fontSize: '24px', color: '#fff', margin: 0}}>{v.name}</h2>
                  {v.verified && (
                    <span style={{backgroundColor: 'rgba(35,159,64,0.1)', color: '#239F40', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px'}}>VERIFIED</span>
                  )}
                </div>
                <div style={{color: '#e6c364', fontSize: '14px', marginBottom: '8px'}}>★ ★ ★ ★ ★</div>
                <div style={{color: '#909096', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span>📍</span> {v.city}, {v.country}
                </div>
                <p style={{color: '#c6c6cc', fontSize: '14px', lineHeight: 1.6, flexGrow: 1, marginBottom: '24px'}}>
                  {v.description || 'Join local fans to watch the biggest matches on the big screen!'}
                </p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(v.name + ' ' + v.city)}`} 
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block', 
                    textAlign: 'center', 
                    backgroundColor: '#0052cc', 
                    color: '#fff', 
                    padding: '12px', 
                    borderRadius: '6px', 
                    textDecoration: 'none', 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    letterSpacing: '1px'
                  }}
                >
                  GET DIRECTIONS
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SUGGEST LINK */}
      <div style={{textAlign: 'center', padding: '40px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
        <p style={{color: '#c6c6cc', fontSize: '14px', marginBottom: '16px'}}>Know a great place to watch the matches?</p>
        <Link href="/venues/suggest" style={{color: '#e6c364', textDecoration: 'none', fontWeight: 'bold', borderBottom: '1px solid #e6c364', paddingBottom: '2px'}}>SUGGEST A VENUE</Link>
      </div>
    </main>
  )
}

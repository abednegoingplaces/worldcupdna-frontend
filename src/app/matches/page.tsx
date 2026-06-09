'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const A = 'Anton, sans-serif'

const TABS = ['GROUP STAGE', 'R16', 'QF', 'SF', 'FINAL']

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('GROUP STAGE')
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('https://worldcupdna-backend.onrender.com/api/v1/matches/')
        if (res.ok) {
          const data = await res.json()
          setMatches(data.matches || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const filteredMatches = matches.filter(m => {
    if (activeTab === 'GROUP STAGE') return m.stage?.toUpperCase().includes('GROUP')
    if (activeTab === 'R16') return m.stage?.toUpperCase().includes('16') || m.stage?.toUpperCase().includes('EIGHTH')
    if (activeTab === 'QF') return m.stage?.toUpperCase().includes('QUARTER')
    if (activeTab === 'SF') return m.stage?.toUpperCase().includes('SEMI')
    if (activeTab === 'FINAL') return m.stage?.toUpperCase().includes('FINAL') && !m.stage?.toUpperCase().includes('SEMI') && !m.stage?.toUpperCase().includes('QUARTER')
    return true
  })

  return (
    <main style={{minHeight:'100vh', backgroundColor:'#101415', color:'#e0e3e5', overflowX:'hidden'}}>
      {/* NAVBAR */}
      <nav style={{position:'fixed', top:0, width:'100%', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '0 16px' : '0 48px', height:'52px', backgroundColor:'rgba(16,20,21,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{fontFamily:A, color:'#e6c364', fontSize: isMobile ? '16px' : '20px', letterSpacing:'1px'}}>WORLDCUPDNA</div>
        <div style={{display:'flex', gap: isMobile ? '12px' : '32px', alignItems:'center'}}>
          {!isMobile && <Link href="/matches" style={{color:'#e6c364', textDecoration:'none', fontSize:'14px'}}>Matches</Link>}
          {!isMobile && <Link href="/leaderboard" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Leaderboard</Link>}
          {!isMobile && <Link href="/venues" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Watch Parties</Link>}
          <Link href="/auth" style={{border:'1px solid #e6c364', color:'#e6c364', padding: isMobile ? '6px 14px' : '8px 20px', textDecoration:'none', fontSize: isMobile ? '12px' : '14px'}}>LOGIN</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{paddingTop: '100px', paddingBottom: '40px', textAlign: 'center', backgroundColor: '#080d1a', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
        <h1 style={{fontFamily: A, fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : '64px', color: '#fff', marginBottom: '8px'}}>MATCH HUB</h1>
        <p style={{color: '#e6c364', letterSpacing: '2px', fontSize: isMobile ? '12px' : '14px'}}>FOLLOW EVERY MOMENT OF THE 2026 WORLD CUP</p>
      </section>

      {/* TABS */}
      <section style={{display: 'flex', justifyContent: 'center', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.1)', scrollbarWidth: 'none', touchAction: 'pan-x'}}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab ? '#e6c364' : '#c6c6cc',
              padding: '16px 24px',
              fontFamily: A,
              fontSize: '18px',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #e6c364' : '2px solid transparent',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </section>

      {/* MATCH GRID */}
      <section style={{padding: isMobile ? '32px 16px' : '64px 48px', maxWidth: '1200px', margin: '0 auto'}}>
        {loading ? (
          <div style={{textAlign: 'center', color: '#e6c364', fontFamily: A, fontSize: '24px'}}>LOADING MATCHES...</div>
        ) : filteredMatches.length === 0 ? (
          <div style={{textAlign: 'center', color: '#c6c6cc', padding: '40px'}}>No matches found for this stage yet.</div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px'}}>
            {filteredMatches.map(m => (
              <div key={m.id} style={{backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)'}}>
                  <span style={{fontSize: '11px', color: '#c6c6cc', letterSpacing: '1px'}}>{m.match_date ? new Date(m.match_date).toLocaleDateString() : 'TBD'}</span>
                  {m.status === 'LIVE' ? (
                    <span style={{backgroundColor: '#e70013', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '2px', fontWeight: 'bold', letterSpacing: '1px', animation: 'pulse 2s infinite'}}>LIVE</span>
                  ) : (
                    <span style={{fontSize: '11px', color: '#e6c364', letterSpacing: '1px'}}>{m.status || 'SCHEDULED'}</span>
                  )}
                </div>
                <div style={{padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{textAlign: 'center', flex: 1}}>
                    <div style={{fontFamily: A, fontSize: '24px', color: '#fff'}}>{m.home_team || 'TBD'}</div>
                  </div>
                  <div style={{padding: '0 16px', textAlign: 'center'}}>
                    {m.status === 'FINISHED' || m.status === 'LIVE' ? (
                      <div style={{fontFamily: A, fontSize: '32px', color: '#e6c364', letterSpacing: '2px'}}>
                        {m.home_score ?? '-'} : {m.away_score ?? '-'}
                      </div>
                    ) : (
                      <div style={{fontSize: '12px', color: '#909096', letterSpacing: '1px'}}>VS</div>
                    )}
                  </div>
                  <div style={{textAlign: 'center', flex: 1}}>
                    <div style={{fontFamily: A, fontSize: '24px', color: '#fff'}}>{m.away_team || 'TBD'}</div>
                  </div>
                </div>
                <div style={{padding: '12px', textAlign: 'center', fontSize: '11px', color: '#909096', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
                  {m.venue || 'Venue TBD'}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* PULSE ANIMATION */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}} />
    </main>
  )
}

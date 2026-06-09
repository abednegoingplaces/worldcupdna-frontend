'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const A = 'Anton, sans-serif'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('GLOBAL')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('https://worldcupdna-backend.onrender.com/api/v1/leaderboard/')
        if (res.ok) {
          const data = await res.json()
          setLeaderboard(data.leaderboard || [])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)

  // Podium order: 2, 1, 3
  const podium = [top3[1], top3[0], top3[2]]

  return (
    <main style={{minHeight:'100vh', backgroundColor:'#101415', color:'#e0e3e5', overflowX:'hidden', paddingBottom: '80px'}}>
      {/* NAVBAR */}
      <nav style={{position:'fixed', top:0, width:'100%', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '0 16px' : '0 48px', height:'52px', backgroundColor:'rgba(16,20,21,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{fontFamily:A, color:'#e6c364', fontSize: isMobile ? '16px' : '20px', letterSpacing:'1px'}}>WORLDCUPDNA</div>
        <div style={{display:'flex', gap: isMobile ? '12px' : '32px', alignItems:'center'}}>
          {!isMobile && <Link href="/matches" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Matches</Link>}
          {!isMobile && <Link href="/leaderboard" style={{color:'#e6c364', textDecoration:'none', fontSize:'14px'}}>Leaderboard</Link>}
          {!isMobile && <Link href="/venues" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Watch Parties</Link>}
          <Link href="/auth" style={{border:'1px solid #e6c364', color:'#e6c364', padding: isMobile ? '6px 14px' : '8px 20px', textDecoration:'none', fontSize: isMobile ? '12px' : '14px'}}>LOGIN</Link>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{paddingTop: '100px', textAlign: 'center'}}>
        <h1 style={{fontFamily: A, fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : '64px', color: '#fff', margin: 0}}>GLOBAL LEADERBOARD</h1>
      </section>

      {/* TABS */}
      <div style={{display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px'}}>
        {['GLOBAL', 'FRIENDS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab ? '#e6c364' : '#c6c6cc',
              fontFamily: A,
              fontSize: '20px',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid #e6c364' : '2px solid transparent',
              paddingBottom: '4px',
              letterSpacing: '1px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: isMobile ? '32px 16px' : '48px 24px'}}>
        {loading ? (
          <div style={{textAlign: 'center', color: '#e6c364', fontFamily: A, fontSize: '24px'}}>LOADING...</div>
        ) : leaderboard.length === 0 ? (
          <div style={{textAlign: 'center', color: '#c6c6cc'}}>No data available.</div>
        ) : (
          <>
            {/* PODIUM */}
            {top3.length > 0 && (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: isMobile ? '8px' : '16px', marginBottom: '48px'}}>
                {/* RANK 2 */}
                {podium[0] && (
                  <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #c0c0c0', borderRadius: '8px 8px 0 0', height: isMobile ? '140px' : '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', borderBottom: 'none'}}>
                    <div style={{fontSize: '24px', marginBottom: '8px'}}>🥈</div>
                    <div style={{fontFamily: A, color: '#fff', fontSize: isMobile ? '14px' : '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center'}}>{podium[0].username || 'User'}</div>
                    <div style={{color: '#e6c364', fontSize: '14px', fontWeight: 'bold'}}>{podium[0].total_points || 0} PTS</div>
                  </div>
                )}
                {/* RANK 1 */}
                {podium[1] && (
                  <div style={{flex: 1.2, backgroundColor: 'rgba(230,195,100,0.1)', border: '2px solid #e6c364', borderRadius: '8px 8px 0 0', height: isMobile ? '180px' : '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', borderBottom: 'none', boxShadow: '0 0 20px rgba(230,195,100,0.2)'}}>
                    <div style={{fontSize: '32px', marginBottom: '8px'}}>🥇</div>
                    <div style={{fontFamily: A, color: '#fff', fontSize: isMobile ? '18px' : '22px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center'}}>{podium[1].username || 'User'}</div>
                    <div style={{color: '#e6c364', fontSize: '18px', fontWeight: 'bold'}}>{podium[1].total_points || 0} PTS</div>
                  </div>
                )}
                {/* RANK 3 */}
                {podium[2] && (
                  <div style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #cd7f32', borderRadius: '8px 8px 0 0', height: isMobile ? '120px' : '160px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', borderBottom: 'none'}}>
                    <div style={{fontSize: '24px', marginBottom: '8px'}}>🥉</div>
                    <div style={{fontFamily: A, color: '#fff', fontSize: isMobile ? '14px' : '18px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center'}}>{podium[2].username || 'User'}</div>
                    <div style={{color: '#e6c364', fontSize: '14px', fontWeight: 'bold'}}>{podium[2].total_points || 0} PTS</div>
                  </div>
                )}
              </div>
            )}

            {/* LIST */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              {rest.map((user, idx) => {
                const rank = idx + 4
                return (
                  <div key={user.id || rank} style={{display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '4px'}}>
                    <div style={{width: '40px', fontFamily: A, color: '#909096', fontSize: '18px'}}>{rank}</div>
                    <div style={{flex: 1, color: '#fff', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{user.username || 'User'}</div>
                    <div style={{color: '#e6c364', fontFamily: A, fontSize: '18px', marginRight: '16px'}}>{user.total_points || 0}</div>
                    <div style={{color: '#239F40', fontSize: '14px'}}>▲</div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* MY RANK PINNED */}
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#101415', borderTop: '2px solid #e6c364', padding: '16px', display: 'flex', justifyContent: 'center', zIndex: 100, boxShadow: '0 -4px 20px rgba(0,0,0,0.5)'}}>
        <div style={{fontFamily: A, color: '#fff', fontSize: isMobile ? '18px' : '22px', letterSpacing: '1px'}}>
          YOUR RANK <span style={{color: '#e6c364'}}>#247</span> — <span style={{color: '#e6c364'}}>18 PTS</span>
        </div>
      </div>
    </main>
  )
}

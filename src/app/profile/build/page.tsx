'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const A = 'Anton, sans-serif'

const PLAYERS = [
  // CONCACAF (6)
  { name: 'HIRVING LOZANO', nation: 'MEXICO', color: '#006847' },
  { name: 'JOSE FAJARDO', nation: 'PANAMA', color: '#DA121A' },
  { name: 'FRANTZDY PIERROT', nation: 'HAITI', color: '#00205B' },
  { name: 'LEANDRO BACUNA', nation: 'CURAÇAO', color: '#002B7F' },
  { name: 'ALPHONSO DAVIES', nation: 'CANADA', color: '#FF0000' },
  { name: 'CHRISTIAN PULISIC', nation: 'USA', color: '#002868' },
  // AFC (9)
  { name: 'TAKUMI MINAMINO', nation: 'JAPAN', color: '#BC002D' },
  { name: 'MEHDI TAREMI', nation: 'IRAN', color: '#239F40' },
  { name: 'SON HEUNG-MIN', nation: 'SOUTH KOREA', color: '#CD2E3A' },
  { name: 'MATHEW LECKIE', nation: 'AUSTRALIA', color: '#FFCD00' },
  { name: 'AKRAM AFIF', nation: 'QATAR', color: '#8D1B3D' },
  { name: 'SALEM AL-DAWSARI', nation: 'SAUDI ARABIA', color: '#006C35' },
  { name: 'AYMEN HUSSEIN', nation: 'IRAQ', color: '#007A3D' },
  { name: 'ELDOR SHOMURODOV', nation: 'UZBEKISTAN', color: '#1EB53A' },
  { name: 'YAZAN AL-NAIMAT', nation: 'JORDAN', color: '#007A3D' },
  // CAF (10)
  { name: 'ACHRAF HAKIMI', nation: 'MOROCCO', color: '#c1272d' },
  { name: 'SADIO MANE', nation: 'SENEGAL', color: '#00853F' },
  { name: 'MOHAMED SALAH', nation: 'EGYPT', color: '#CE1126' },
  { name: 'YASSINE MERIAH', nation: 'TUNISIA', color: '#E70013' },
  { name: 'RIYAD MAHREZ', nation: 'ALGERIA', color: '#006233' },
  { name: 'PERCY TAU', nation: 'SOUTH AFRICA', color: '#007749' },
  { name: 'SEBASTIEN HALLER', nation: 'IVORY COAST', color: '#F77F00' },
  { name: 'MOHAMMED KUDUS', nation: 'GHANA', color: '#006B3F' },
  { name: 'CHANCEL MBEMBA', nation: 'DR CONGO', color: '#007FFF' },
  { name: 'JULIO TAVARES', nation: 'CAPE VERDE', color: '#003893' },
  // CONMEBOL (6)
  { name: 'LIONEL MESSI', nation: 'ARGENTINA', color: '#74acdf' },
  { name: 'VINICIUS JR', nation: 'BRAZIL', color: '#009c3b' },
  { name: 'JAMES RODRIGUEZ', nation: 'COLOMBIA', color: '#FCD116' },
  { name: 'ENNER VALENCIA', nation: 'ECUADOR', color: '#FFD100' },
  { name: 'DARWIN NUNEZ', nation: 'URUGUAY', color: '#5EB6E4' },
  { name: 'MIGUEL ALMIRON', nation: 'PARAGUAY', color: '#D52B1E' },
  // OFC (1)
  { name: 'CHRIS WOOD', nation: 'NEW ZEALAND', color: '#000000' },
  // UEFA (16)
  { name: 'KYLIAN MBAPPE', nation: 'FRANCE', color: '#002395' },
  { name: 'LAMINE YAMAL', nation: 'SPAIN', color: '#c60b1e' },
  { name: 'HARRY KANE', nation: 'ENGLAND', color: '#CF1B1B' },
  { name: 'CRISTIANO RONALDO', nation: 'PORTUGAL', color: '#006600' },
  { name: 'JAMAL MUSIALA', nation: 'GERMANY', color: '#000000' },
  { name: 'VIRGIL VAN DIJK', nation: 'NETHERLANDS', color: '#FF6600' },
  { name: 'KEVIN DE BRUYNE', nation: 'BELGIUM', color: '#EF3340' },
  { name: 'LUKA MODRIC', nation: 'CROATIA', color: '#FF0000' },
  { name: 'GRANIT XHAKA', nation: 'SWITZERLAND', color: '#FF0000' },
  { name: 'MARCEL SABITZER', nation: 'AUSTRIA', color: '#ED2939' },
  { name: 'ANDY ROBERTSON', nation: 'SCOTLAND', color: '#004B84' },
  { name: 'ERLING HAALAND', nation: 'NORWAY', color: '#BA0C2F' },
  { name: 'VIKTOR GYOKERES', nation: 'SWEDEN', color: '#FECC02' },
  { name: 'HAKAN CALHANOGLU', nation: 'TURKEY', color: '#E30A17' },
  { name: 'PATRIK SCHICK', nation: 'CZECHIA', color: '#D7141A' },
  { name: 'EDIN DZEKO', nation: 'BOSNIA AND HERZEGOVINA', color: '#002F6C' }
]

const TACTICS = [
  { id: 'TIKI-TAKA', desc: 'Pass, move, dominate' },
  { id: 'ROUTE ONE', desc: 'Direct and physical' },
  { id: 'GEGENPRESSING', desc: 'High intensity, press everything' },
  { id: 'COUNTER ATTACK', desc: 'Defend deep, strike fast' }
]

export default function BuildProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    favorite_team: '',
    tactical_style: '',
    rivalry_level: 50
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleRegister = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://worldcupdna-backend.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          // Sending extra fields - the backend will likely ignore them, so we also store in localStorage
          favorite_team: formData.favorite_team,
          tactical_style: formData.tactical_style,
          rivalry_level: formData.rivalry_level
        })
      })
      const data = await res.json()
      if (res.ok) {
        // Save to local storage to simulate the profile creation
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('selectedNation', formData.favorite_team)
        localStorage.setItem('tacticalStyle', formData.tactical_style)
        localStorage.setItem('rivalryLevel', formData.rivalry_level.toString())
        localStorage.setItem('username', formData.username)
        router.push('/profile')
      } else {
        setError(data.detail || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{minHeight:'100vh', backgroundColor:'#101415', color:'#e0e3e5', overflowX:'hidden'}}>
      {/* NAVBAR */}
      <nav style={{position:'fixed', top:0, width:'100%', zIndex:50, display:'flex', justifyContent:'space-between', alignItems:'center', padding: isMobile ? '0 16px' : '0 48px', height:'52px', backgroundColor:'rgba(16,20,21,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{fontFamily:A, color:'#e6c364', fontSize: isMobile ? '16px' : '20px', letterSpacing:'1px'}}>WORLDCUPDNA</div>
        <div style={{display:'flex', gap: isMobile ? '12px' : '32px', alignItems:'center'}}>
          {!isMobile && <Link href="/matches" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Matches</Link>}
          {!isMobile && <Link href="/leaderboard" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Leaderboard</Link>}
          {!isMobile && <Link href="/venues" style={{color:'#c6c6cc', textDecoration:'none', fontSize:'14px'}}>Watch Parties</Link>}
          <Link href="/auth" style={{border:'1px solid #e6c364', color:'#e6c364', padding: isMobile ? '6px 14px' : '8px 20px', textDecoration:'none', fontSize: isMobile ? '12px' : '14px'}}>LOGIN</Link>
        </div>
      </nav>

      <div style={{paddingTop: '52px', minHeight: 'calc(100vh - 52px)', display: 'flex', flexDirection: 'column'}}>
        <style dangerouslySetInnerHTML={{__html: `
          .custom-input::placeholder { color: rgba(255,255,255,0.7); }
        `}} />
        
        {/* PROGRESS BAR */}
        <div style={{width: '100%', backgroundColor: 'rgba(255,255,255,0.05)', height: '4px'}}>
          <div style={{width: `${(step / 3) * 100}%`, backgroundColor: '#e6c364', height: '100%', transition: 'width 0.3s ease'}} />
        </div>
        <div style={{textAlign: 'center', padding: '16px', color: '#c6c6cc', fontSize: '12px', letterSpacing: '2px'}}>
          STEP {step} OF 3
        </div>

        <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: isMobile ? '24px 16px' : '48px 24px', position: 'relative'}}>
          
          {/* STEP 1: ACCOUNT */}
          {step === 1 && (
            <div style={{width: '100%', maxWidth: '400px', zIndex: 10}}>
              {/* Stadium Background */}
              <div style={{position: 'absolute', inset: 0, zIndex: -1, opacity: 0.15, backgroundImage: 'url(/wc2026-poster-enhanced.webp)', backgroundSize: 'cover', backgroundPosition: 'center'}} />
              
              <div style={{textAlign: 'center', marginBottom: '40px'}}>
                <h1 style={{fontFamily: A, fontSize: 'clamp(40px, 8vw, 56px)', color: '#e6c364', margin: 0}}>JOIN THE DNA</h1>
                <p style={{color: '#c6c6cc', marginTop: '8px'}}>Create your fan profile to begin.</p>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <input 
                  type="text" 
                  className="custom-input"
                  placeholder="Username" 
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  style={{width: '100%', padding: '16px', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', fontSize: '16px', borderRadius: '4px', outline: 'none', transition: 'border 0.2s'}}
                  onFocus={e => e.target.style.borderColor = '#e6c364'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
                <input 
                  type="email" 
                  className="custom-input"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  style={{width: '100%', padding: '16px', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', fontSize: '16px', borderRadius: '4px', outline: 'none', transition: 'border 0.2s'}}
                  onFocus={e => e.target.style.borderColor = '#e6c364'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
                <input 
                  type="password" 
                  className="custom-input"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  style={{width: '100%', padding: '16px', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', fontSize: '16px', borderRadius: '4px', outline: 'none', transition: 'border 0.2s'}}
                  onFocus={e => e.target.style.borderColor = '#e6c364'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                />
                <button 
                  onClick={() => {
                    if (formData.username && formData.email && formData.password) setStep(2)
                  }}
                  style={{width: '100%', backgroundColor: '#e6c364', color: '#000', padding: '16px', fontFamily: A, fontSize: '20px', border: 'none', cursor: 'pointer', marginTop: '16px'}}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: YOUR NATION */}
          {step === 2 && (
            <div style={{width: '100%', maxWidth: '1000px', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%'}}>
              <div style={{textAlign: 'center', marginBottom: '32px'}}>
                <h1 style={{fontFamily: A, fontSize: 'clamp(32px, 6vw, 48px)', color: '#fff', margin: 0}}>WHO DO YOU RIDE WITH?</h1>
                <p style={{color: '#e6c364', marginTop: '8px', letterSpacing: '1px'}}>SELECT YOUR NATION</p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', flex: 1, overflowY: 'auto', paddingBottom: '100px', scrollbarWidth: 'none'}}>
                {PLAYERS.map(p => {
                  const isSelected = formData.favorite_team === p.nation
                  return (
                    <div 
                      key={p.nation}
                      onClick={() => setFormData({...formData, favorite_team: p.nation})}
                      style={{
                        backgroundColor: isSelected ? 'rgba(230,195,100,0.1)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? `2px solid #e6c364` : `1px solid rgba(255,255,255,0.05)`,
                        borderTop: isSelected ? `2px solid #e6c364` : `2px solid ${p.color}`,
                        padding: '16px',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s',
                        borderRadius: '4px'
                      }}
                    >
                      {isSelected && (
                        <div style={{position: 'absolute', top: '8px', right: '8px', backgroundColor: '#e6c364', color: '#000', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>
                          ✓
                        </div>
                      )}
                      <div style={{fontFamily: A, fontSize: '32px', color: p.color, opacity: 0.3, letterSpacing: '-2px', marginBottom: '8px'}}>{p.nation.slice(0,3)}</div>
                      <div style={{color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px'}}>{p.nation}</div>
                      <div style={{color: '#909096', fontSize: '11px'}}>{p.name}</div>
                    </div>
                  )
                })}
              </div>

              <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '24px', backgroundColor: '#101415', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', zIndex: 100}}>
                <button 
                  onClick={() => {
                    if (formData.favorite_team) setStep(3)
                  }}
                  style={{width: '100%', maxWidth: '400px', backgroundColor: formData.favorite_team ? '#e6c364' : '#323537', color: formData.favorite_team ? '#000' : '#909096', padding: '16px', fontFamily: A, fontSize: '20px', border: 'none', cursor: formData.favorite_team ? 'pointer' : 'not-allowed'}}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: YOUR DNA */}
          {step === 3 && (
            <div style={{width: '100%', maxWidth: '600px', zIndex: 10}}>
              <div style={{textAlign: 'center', marginBottom: '40px'}}>
                <h1 style={{fontFamily: A, fontSize: 'clamp(32px, 6vw, 48px)', color: '#fff', margin: 0}}>YOUR TACTICAL IDENTITY</h1>
                <p style={{color: '#c6c6cc', marginTop: '8px'}}>Define how you watch the game.</p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '48px'}}>
                {TACTICS.map(t => {
                  const isSelected = formData.tactical_style === t.id
                  return (
                    <div 
                      key={t.id}
                      onClick={() => setFormData({...formData, tactical_style: t.id})}
                      style={{
                        backgroundColor: isSelected ? 'rgba(230,195,100,0.1)' : 'rgba(255,255,255,0.05)',
                        border: isSelected ? '2px solid #e6c364' : '1px solid rgba(255,255,255,0.1)',
                        padding: '24px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{fontFamily: A, color: isSelected ? '#e6c364' : '#fff', fontSize: '20px', marginBottom: '8px'}}>{t.id}</div>
                      <div style={{color: '#909096', fontSize: '12px'}}>{t.desc}</div>
                    </div>
                  )
                })}
              </div>

              <div style={{marginBottom: '48px'}}>
                <div style={{textAlign: 'center', fontFamily: A, color: '#fff', fontSize: '20px', marginBottom: '24px'}}>RIVALRY LEVEL</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <span style={{fontSize: '24px'}}>💀</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={formData.rivalry_level}
                    onChange={e => setFormData({...formData, rivalry_level: parseInt(e.target.value)})}
                    style={{flex: 1, accentColor: '#e6c364'}}
                  />
                  <span style={{fontSize: '24px'}}>🔥</span>
                </div>
              </div>

              {error && <div style={{color: '#ff4d4d', textAlign: 'center', marginBottom: '16px'}}>{error}</div>}

              <button 
                onClick={handleRegister}
                disabled={loading || !formData.tactical_style}
                style={{
                  width: '100%', 
                  backgroundColor: formData.tactical_style ? '#e6c364' : '#323537', 
                  color: formData.tactical_style ? '#000' : '#909096', 
                  padding: '20px', 
                  fontFamily: A, 
                  fontSize: '24px', 
                  border: 'none', 
                  cursor: formData.tactical_style ? 'pointer' : 'not-allowed',
                  boxShadow: formData.tactical_style ? '0 0 20px rgba(230,195,100,0.4)' : 'none',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                {loading ? 'GENERATING...' : 'GENERATE MY DNA BADGE'}
              </button>

              <div style={{textAlign: 'center', marginTop: '24px'}}>
                <button onClick={() => setStep(2)} style={{background: 'none', border: 'none', color: '#909096', cursor: 'pointer', textDecoration: 'underline'}}>Back</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}

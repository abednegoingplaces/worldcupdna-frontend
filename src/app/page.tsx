'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

const FEATURES = [
  { icon: 'fingerprint', title: 'FAN DNA PROFILE', desc: 'Build your tactical identity and get a unique badge.', link: '/profile/build' },
  { icon: 'track_changes', title: 'MATCH PREDICTIONS', desc: 'Pick scores, earn points, win status.', link: '/matches' },
  { icon: 'leaderboard', title: 'LIVE LEADERBOARD', desc: 'Climb global rankings after every match.', link: '/leaderboard' },
  { icon: 'location_on', title: 'WATCH PARTIES', desc: 'Find venues near you worldwide.', link: '/venues' },
]

const A = 'Anton, sans-serif'

export default function Home() {
  const [countdown, setCountdown] = useState('LOADING...')
  const [playerImages, setPlayerImages] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handlePickTeam = (nation: string, name: string) => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth?redirect=/profile')
    } else {
      localStorage.setItem('selectedNation', nation)
      localStorage.setItem('selectedPlayer', name)
      router.push('/profile')
    }
  }

  useEffect(() => {
    const target = new Date('2026-06-11T00:00:00')
    const timer = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) { setCountdown('LIVE NOW!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setCountdown(`${String(d).padStart(2,'0')} DAYS ${String(h).padStart(2,'0')} HRS ${String(m).padStart(2,'0')} MINS`)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchImages = async () => {
      for (const p of PLAYERS) {
        const playerName = p.name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        try {
          console.log('Fetching image for:', playerName)
          const res = await fetch(`https://worldcupdna-backend.onrender.com/api/v1/players/photo/${encodeURIComponent(playerName)}`)
          if (res.ok) {
            const data = await res.json()
            if (data.photo) {
              setPlayerImages(prev => ({ ...prev, [p.nation]: data.photo }))
            }
          }
        } catch (err) {
          // silently skip
        }
      }
    }
    fetchImages()
  }, [])

  const filteredPlayers = PLAYERS.filter(p =>
    p.nation.toLowerCase().includes(search.toLowerCase()) ||
    p.name.toLowerCase().includes(search.toLowerCase())
  )

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

      {/* HERO */}
      <section style={{position:'relative', height: isMobile ? '100svh' : '100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom: isMobile ? '24px' : '40px', textAlign:'center', padding: isMobile ? '0 16px' : '0 24px', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, zIndex:0}}>
          <img alt="Stadium" style={{width:'100%', height:'100%', objectFit:'cover', opacity:0.75, objectPosition:'center 20%'}} src="/wc2026-poster-enhanced.webp" />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, #101415 35%, rgba(16,20,21,0.55) 60%, rgba(16,20,21,0.2) 80%, transparent 100%)'}} />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(16,20,21,0.5) 0%, transparent 30%)'}} />
        </div>
        <div style={{position:'relative', zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', maxWidth:'900px'}}>

          <h1 style={{fontFamily:A, fontSize: isMobile ? 'clamp(26px,9vw,36px)' : 'clamp(40px,7vw,80px)', color:'#ffffff', marginBottom:'16px', lineHeight:1, opacity:0.6}}>DISCOVER YOUR FOOTBALL DNA</h1>
          <p style={{color:'#e6c364', fontSize: isMobile ? '11px' : '18px', marginBottom:'24px', letterSpacing: isMobile ? '1px' : '3px', opacity:0.55}}>48 NATIONS. 104 MATCHES. ONE TROPHY.</p>
          <div style={{marginBottom:'32px', padding: isMobile ? '10px 14px' : '16px 24px', border:'1px solid rgba(230,195,100,0.5)', backgroundColor:'rgba(0,0,0,0.6)'}}>
            <div style={{color:'#e6c364', fontSize:'11px', letterSpacing:'4px', marginBottom:'4px'}}>TOURNAMENT COUNTDOWN</div>
            <div style={{color:'#f5d678', fontSize: isMobile ? '11px' : '16px', letterSpacing:'3px'}}>{countdown}</div>
          </div>
          <div style={{display:'flex', flexDirection: isMobile ? 'column' : 'row', gap:'16px', flexWrap:'wrap', justifyContent:'center', width: isMobile ? '100%' : 'auto'}}>
            <Link href="/profile/build" style={{fontFamily:A, backgroundColor:'#e6c364', color:'#000', padding: isMobile ? '14px 24px' : '16px 40px', fontSize: isMobile ? '16px' : '18px', textDecoration:'none', display:'block', textAlign:'center'}}>BUILD MY DNA</Link>
            <Link href="/matches" style={{fontFamily:A, border:'1px solid #fff', color:'#fff', padding: isMobile ? '14px 24px' : '16px 40px', fontSize: isMobile ? '16px' : '18px', textDecoration:'none', display:'block', textAlign:'center'}}>VIEW MATCHES</Link>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{backgroundColor:'#191c1e', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding: isMobile ? '24px 16px' : '32px 48px'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '24px' : '32px', justItems:'center'}}>
          {[['48','TEAMS'],['104','MATCHES'],['16','CITIES'],['5B+','FANS']].map(([val, label]) => (
            <div key={label} style={{textAlign:'center'}}>
              <div style={{fontFamily:A, fontSize: isMobile ? '28px' : '40px', color:'#e6c364'}}>{val}</div>
              <div style={{fontSize: isMobile ? '10px' : '12px', letterSpacing:'3px', color:'#e0e3e5', marginTop:'4px'}}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLAYER LEGENDS */}
      <section style={{padding: isMobile ? '40px 0' : '80px 0'}}>
        <div style={{padding: isMobile ? '0 16px' : '0 48px', marginBottom:'40px', display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? '16px' : '0'}}>
          <div>
            <div style={{color:'#e6c364', fontSize:'11px', letterSpacing:'6px', textTransform:'uppercase'}}>Choose Your Allegiance</div>
            <h2 style={{fontFamily:A, fontSize: isMobile ? 'clamp(28px,7vw,40px)' : 'clamp(32px,5vw,56px)', color:'#fff', marginTop:'8px'}}>THE ICONS</h2>
          </div>
          <input
            type="text"
            placeholder="SEARCH TEAMS / PLAYERS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 16px', fontSize: isMobile ? '11px' : '13px', letterSpacing: '1px', outline: 'none', width: isMobile ? '100%' : '280px', boxSizing: 'border-box'}}
          />
        </div>
        <div style={{display:'flex', overflowX:'auto', gap: isMobile ? '16px' : '24px', padding: isMobile ? '0 16px 32px' : '0 48px 32px', scrollbarWidth:'none', touchAction:'pan-x', WebkitOverflowScrolling:'touch'}}>
          {filteredPlayers.map((p) => (
            <div key={p.nation} style={{position:'relative', flexShrink:0, width: isMobile ? '160px' : '280px', height: isMobile ? '260px' : '420px', borderTop:`2px solid ${p.color}`, cursor:'pointer', overflow:'hidden'}}>
              {playerImages[p.nation] && (
                <img src={playerImages[p.nation]} alt={p.name} style={{position:'absolute', width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', opacity:0.6}} />
              )}
              <div style={{position:'absolute', inset:0, background:`linear-gradient(to bottom, ${p.color}99, #080d1a)`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{fontFamily:'Anton, sans-serif', fontSize:'70px', color:p.color, opacity:0.4, letterSpacing:'-4px'}}>{p.nation.slice(0,3)}</div>
              </div>
              <div style={{position:'absolute', inset:0, background:'linear-gradient(to top, #101415 30%, transparent)'}} />
              <div className="group" style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'20px'}}>
                <div style={{color:'#e6c364', fontSize: isMobile ? '10px' : '11px', letterSpacing:'2px', marginBottom:'4px'}}>{p.nation}</div>
                <div style={{fontFamily:'Anton, sans-serif', color:'#fff', fontSize: isMobile ? '15px' : '18px', marginBottom:'8px'}}>{p.name}</div>
                <button onClick={() => handlePickTeam(p.nation, p.name)} style={{width:'100%', backgroundColor:'#e6c364', color:'#000', padding: isMobile ? '6px' : '8px', fontSize: isMobile ? '10px' : '11px', letterSpacing:'2px', border:'none', cursor:'pointer'}}>PICK THIS TEAM</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{padding: isMobile ? '40px 16px' : '80px 48px', backgroundColor:'#0b0f10'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto'}}>
          <div style={{textAlign:'center', marginBottom: isMobile ? '32px' : '56px'}}>
            <h2 style={{fontFamily:A, fontSize:'clamp(32px,5vw,56px)', color:'#fff'}}>UNLEASH THE EXPERIENCE</h2>
            <p style={{color:'#c6c6cc', marginTop:'12px'}}>Built for the biggest World Cup ever.</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap:'24px'}}>
            {FEATURES.map(f => (
              <Link href={f.link} key={f.title} style={{display:'flex', gap:'24px', alignItems:'flex-start', padding: isMobile ? '20px' : '32px', backgroundColor:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', textDecoration:'none'}}>
                <div style={{backgroundColor:'rgba(230,195,100,0.1)', padding: isMobile ? '12px' : '16px', border:'1px solid rgba(230,195,100,0.2)', flexShrink:0}}>
                  <span className="material-symbols-outlined" style={{color:'#e6c364', fontSize:'32px'}}>{f.icon}</span>
                </div>
                <div>
                  <h3 style={{fontFamily:A, color:'#fff', fontSize: isMobile ? '16px' : '20px', marginBottom:'8px'}}>{f.title}</h3>
                  <p style={{color:'#c6c6cc', fontSize: isMobile ? '13px' : '14px', lineHeight:1.6}}>{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{padding: isMobile ? '32px 16px' : '80px 48px'}}>
        <div style={{maxWidth:'1000px', margin:'0 auto', background:'linear-gradient(to right, #93000a, #080d1a)', padding: isMobile ? '24px 20px' : '80px', display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexWrap:'wrap', gap:'32px'}}>
          <div>
            <div style={{display:'inline-block', backgroundColor:'#fff', color:'#000', fontSize:'11px', padding:'4px 12px', marginBottom:'16px', letterSpacing:'2px'}}>LIVE ACCESS</div>
            <h2 style={{fontFamily:A, fontSize: isMobile ? 'clamp(22px,6vw,36px)' : 'clamp(28px,4vw,48px)', color:'#fff', marginBottom:'12px'}}>TOURNAMENT KICKS OFF JUNE 11</h2>
            <p style={{color:'rgba(224,227,229,0.8)', fontSize: isMobile ? '15px' : '18px'}}>Don't just watch history. Be part of it.</p>
          </div>
          <Link href="/profile/build" style={{fontFamily:A, backgroundColor:'#e6c364', color:'#000', padding: isMobile ? '16px 24px' : '20px 40px', fontSize: isMobile ? '16px' : '20px', textDecoration:'none', whiteSpace:'nowrap', textAlign:'center', width: isMobile ? '100%' : 'auto', boxSizing:'border-box'}}>BUILD YOUR PROFILE NOW</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{backgroundColor:'#323537', borderTop:'1px solid rgba(255,255,255,0.1)', padding: isMobile ? '32px 16px' : '48px', display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'center' : 'center', textAlign: isMobile ? 'center' : 'left', flexWrap:'wrap', gap:'24px'}}>
        <div>
          <div style={{fontFamily:A, color:'#e6c364', fontSize: isMobile ? '16px' : '20px', marginBottom:'8px'}}>WORLDCUPDNA</div>
          <p style={{color:'#c6c6cc', fontSize:'14px'}}>The ultimate fan platform for FIFA World Cup 2026.</p>
        </div>
        <div style={{color:'#909096', fontSize: isMobile ? '11px' : '12px'}}>© 2026 WORLDCUPDNA. ALL RIGHTS RESERVED.</div>
      </footer>

    </main>
  )
}

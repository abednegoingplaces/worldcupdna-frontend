'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { nationGradient } from '@/lib/nationColors'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/matches', label: 'Matches' },
  { href: '/predictions', label: 'Predictions' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/venues', label: 'Watch Parties' },
]

const PLAYERS = [
  { name: 'HIRVING LOZANO', nation: 'MEXICO', color: '#006847' },
  { name: 'JOSE FAJARDO', nation: 'PANAMA', color: '#DA121A' },
  { name: 'FRANTZDY PIERROT', nation: 'HAITI', color: '#00205B' },
  { name: 'LEANDRO BACUNA', nation: 'CURAÇAO', color: '#002B7F' },
  { name: 'ALPHONSO DAVIES', nation: 'CANADA', color: '#FF0000' },
  { name: 'CHRISTIAN PULISIC', nation: 'USA', color: '#002868' },
  { name: 'TAKUMI MINAMINO', nation: 'JAPAN', color: '#BC002D' },
  { name: 'MEHDI TAREMI', nation: 'IRAN', color: '#239F40' },
  { name: 'SON HEUNG-MIN', nation: 'SOUTH KOREA', color: '#CD2E3A' },
  { name: 'MATHEW LECKIE', nation: 'AUSTRALIA', color: '#FFCD00' },
  { name: 'AKRAM AFIF', nation: 'QATAR', color: '#8D1B3D' },
  { name: 'SALEM AL-DAWSARI', nation: 'SAUDI ARABIA', color: '#006C35' },
  { name: 'AYMEN HUSSEIN', nation: 'IRAQ', color: '#007A3D' },
  { name: 'ELDOR SHOMURODOV', nation: 'UZBEKISTAN', color: '#1EB53A' },
  { name: 'YAZAN AL-NAIMAT', nation: 'JORDAN', color: '#007A3D' },
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
  { name: 'LIONEL MESSI', nation: 'ARGENTINA', color: '#74acdf' },
  { name: 'VINICIUS JR', nation: 'BRAZIL', color: '#009c3b' },
  { name: 'JAMES RODRIGUEZ', nation: 'COLOMBIA', color: '#FCD116' },
  { name: 'ENNER VALENCIA', nation: 'ECUADOR', color: '#FFD100' },
  { name: 'DARWIN NUNEZ', nation: 'URUGUAY', color: '#5EB6E4' },
  { name: 'MIGUEL ALMIRON', nation: 'PARAGUAY', color: '#D52B1E' },
  { name: 'CHRIS WOOD', nation: 'NEW ZEALAND', color: '#000000' },
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
  { name: 'EDIN DZEKO', nation: 'BOSNIA AND HERZEGOVINA', color: '#002F6C' },
]

const TACTICS = [
  { id: 'TIKI-TAKA', desc: 'Pass, move, dominate' },
  { id: 'ROUTE ONE', desc: 'Direct and physical' },
  { id: 'GEGENPRESSING', desc: 'High intensity, press everything' },
  { id: 'COUNTER ATTACK', desc: 'Defend deep, strike fast' },
]

export default function BuildProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    favorite_team: '',
    tactical_style: '',
    rivalry_level: 50,
  })

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
          favorite_team: formData.favorite_team,
          tactical_style: formData.tactical_style,
          rivalry_level: formData.rivalry_level,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('selectedNation', formData.favorite_team)
        // Also map favorite team to a selected player from list
        const playerObj = PLAYERS.find(p => p.nation === formData.favorite_team)
        if (playerObj) {
          localStorage.setItem('selectedPlayer', playerObj.name)
        } else {
          localStorage.setItem('selectedPlayer', 'Key Star')
        }
        localStorage.setItem('tacticalStyle', formData.tactical_style)
        localStorage.setItem('rivalryLevel', formData.rivalry_level.toString())
        localStorage.setItem('username', formData.username)
        router.push('/profile')
      } else {
        setError(data.detail || 'Registration failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-20 md:pb-0 font-inter flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-headline-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/auth"
            className="bg-primary-container text-on-primary-fixed px-md py-sm font-label-caps text-label-caps rounded-lg uppercase tracking-widest font-bold hover:bg-primary-fixed transition-all duration-300 active:scale-95 glow-gold text-center"
          >
            Login
          </Link>
        </div>
      </header>

      <div className="pt-[88px] flex-grow flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1">
          <div
            className="h-full bg-primary-container transition-all duration-300 shadow-[0_0_8px_#e9c400]"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <p className="text-center py-3 font-label-caps text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Step {step} of 3
        </p>

        <div className="flex-1 flex flex-col items-center px-gutter py-8 md:py-12 relative justify-center">
          {step === 1 && (
            <div className="w-full max-w-md z-10 space-y-lg animate-in fade-in duration-300">
              <div className="text-center space-y-xs">
                <h1 className="font-display-md text-display-md font-black uppercase tracking-tight text-primary-container">
                  Join the DNA
                </h1>
                <p className="text-on-surface-variant font-body-md">Create your fan profile to begin.</p>
              </div>
              <div className="flex flex-col gap-md">
                {(['username', 'email', 'password'] as const).map((field) => (
                  <div key={field} className="space-y-xs">
                    <label className="block font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider pl-1">
                      {field}
                    </label>
                    <input
                      type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                      className="input-ds w-full px-4 py-3 font-body-md rounded-lg bg-surface-container/60 border border-outline-variant/30 focus:border-primary-container"
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    if (formData.username && formData.email && formData.password) setStep(2)
                  }}
                  className={`w-full py-4 mt-md font-montserrat uppercase tracking-wider rounded-lg font-bold text-sm ${
                    formData.username && formData.email && formData.password 
                      ? 'btn-primary glow-gold active:scale-[0.98]' 
                      : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                  }`}
                  disabled={!formData.username || !formData.email || !formData.password}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-5xl z-10 flex flex-col h-full animate-in fade-in duration-300">
              <div className="text-center mb-8 space-y-xs">
                <h1 className="font-display-md text-display-md font-black uppercase tracking-tight text-white">
                  Who Do You Ride With?
                </h1>
                <p className="text-primary-container font-montserrat text-xs uppercase tracking-widest font-black">Select Your Nation</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-grow overflow-y-auto pb-28 max-h-[60vh] no-scrollbar">
                {PLAYERS.map((p) => {
                  const isSelected = formData.favorite_team === p.nation
                  return (
                    <button
                      key={p.nation}
                      type="button"
                      onClick={() => setFormData({ ...formData, favorite_team: p.nation })}
                      className={`ds-card relative overflow-hidden text-left transition-all hover:scale-[1.02] border border-outline-variant/30 ${
                        isSelected 
                          ? 'ring-2 ring-primary-container shadow-[0_0_20px_rgba(233,196,0,0.3)] border-primary-container' 
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <div
                        className="h-20 flex items-end p-3 relative"
                        style={{ background: nationGradient(p.nation) }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <span className="font-display-md text-xs font-black text-white uppercase relative z-10 tracking-widest">
                          {p.nation.slice(0, 3)}
                        </span>
                      </div>
                      <div className="p-3 bg-surface-container/40">
                        <p className="font-montserrat text-xs font-black uppercase text-white truncate">{p.nation}</p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant truncate mt-0.5">{p.name}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-container rounded-full flex items-center justify-center text-black text-xs font-black shadow-lg">
                          ✓
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-gutter bg-background/95 backdrop-blur-md border-t border-outline-variant/30 flex justify-center z-40">
                <button
                  onClick={() => formData.favorite_team && setStep(3)}
                  disabled={!formData.favorite_team}
                  className={`w-full max-w-md py-4 font-montserrat uppercase tracking-wider rounded-lg font-bold text-sm ${
                    formData.favorite_team ? 'btn-primary glow-gold active:scale-[0.98]' : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full max-w-xl z-10 space-y-lg animate-in fade-in duration-300">
              <div className="text-center space-y-xs">
                <h1 className="font-display-md text-display-md font-black uppercase tracking-tight text-white">
                  Tactical Identity
                </h1>
                <p className="text-on-surface-variant font-body-md">Define how you watch the game.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TACTICS.map((t) => {
                  const isSelected = formData.tactical_style === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, tactical_style: t.id })}
                      className={`glass-card p-6 text-center cursor-pointer transition-all border ${
                        isSelected
                          ? 'border-primary-container bg-[rgba(233,196,0,0.08)] shadow-[0_0_16px_rgba(233,196,0,0.2)]'
                          : 'border-outline-variant/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <p className={`font-montserrat font-black uppercase tracking-wider text-xs mb-2 ${isSelected ? 'text-primary-container' : 'text-on-surface'}`}>
                        {t.id}
                      </p>
                      <p className="font-body-md text-[11px] text-on-surface-variant leading-relaxed">{t.desc}</p>
                    </button>
                  )
                })}
              </div>

              <div className="bg-surface-container/40 p-md rounded-xl border border-outline-variant/20 space-y-md">
                <p className="text-center font-montserrat font-bold uppercase text-white tracking-widest text-xs">Rivalry Intensity</p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💀</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.rivalry_level}
                    onChange={(e) => setFormData({ ...formData, rivalry_level: parseInt(e.target.value) })}
                    className="flex-1 accent-primary-container h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-2xl">🔥</span>
                </div>
              </div>

              {error && <p className="text-red-400 text-center text-sm font-label-caps">{error}</p>}

              <button
                onClick={handleRegister}
                disabled={loading || !formData.tactical_style}
                className={`w-full py-5 font-montserrat text-md uppercase tracking-wider rounded-lg font-black ${
                  formData.tactical_style ? 'btn-primary glow-gold active:scale-[0.98]' : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-xs">
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Generating DNA Badge...
                  </span>
                ) : 'Generate My DNA Badge'}
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full text-on-surface-variant text-sm hover:text-primary-container transition-colors underline font-label-caps uppercase tracking-wider block text-center"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 flex items-center justify-around z-50">
        {[
          { href: '/', icon: 'home', label: 'Home', active: false },
          { href: '/matches', icon: 'sports_soccer', label: 'Matches', active: false },
          { href: '/predictions', icon: 'analytics', label: 'Predict', active: false },
          { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks', active: false },
          { href: '/profile/build', icon: 'person', label: 'DNA', active: true },
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


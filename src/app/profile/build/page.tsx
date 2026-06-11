'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nationGradient } from '@/lib/nationColors'
import { useAuth } from '@/lib/auth'
import { api, ApiError } from '@/lib/api'

const PLAYERS = [
  { name: 'HIRVING LOZANO', nation: 'MEXICO' },
  { name: 'JOSE FAJARDO', nation: 'PANAMA' },
  { name: 'FRANTZDY PIERROT', nation: 'HAITI' },
  { name: 'LEANDRO BACUNA', nation: 'CURAÇAO' },
  { name: 'ALPHONSO DAVIES', nation: 'CANADA' },
  { name: 'CHRISTIAN PULISIC', nation: 'USA' },
  { name: 'TAKUMI MINAMINO', nation: 'JAPAN' },
  { name: 'MEHDI TAREMI', nation: 'IRAN' },
  { name: 'SON HEUNG-MIN', nation: 'SOUTH KOREA' },
  { name: 'MATHEW LECKIE', nation: 'AUSTRALIA' },
  { name: 'AKRAM AFIF', nation: 'QATAR' },
  { name: 'SALEM AL-DAWSARI', nation: 'SAUDI ARABIA' },
  { name: 'AYMEN HUSSEIN', nation: 'IRAQ' },
  { name: 'ELDOR SHOMURODOV', nation: 'UZBEKISTAN' },
  { name: 'YAZAN AL-NAIMAT', nation: 'JORDAN' },
  { name: 'ACHRAF HAKIMI', nation: 'MOROCCO' },
  { name: 'SADIO MANE', nation: 'SENEGAL' },
  { name: 'MOHAMED SALAH', nation: 'EGYPT' },
  { name: 'YASSINE MERIAH', nation: 'TUNISIA' },
  { name: 'RIYAD MAHREZ', nation: 'ALGERIA' },
  { name: 'PERCY TAU', nation: 'SOUTH AFRICA' },
  { name: 'SEBASTIEN HALLER', nation: 'IVORY COAST' },
  { name: 'MOHAMMED KUDUS', nation: 'GHANA' },
  { name: 'CHANCEL MBEMBA', nation: 'DR CONGO' },
  { name: 'JULIO TAVARES', nation: 'CAPE VERDE' },
  { name: 'LIONEL MESSI', nation: 'ARGENTINA' },
  { name: 'VINICIUS JR', nation: 'BRAZIL' },
  { name: 'JAMES RODRIGUEZ', nation: 'COLOMBIA' },
  { name: 'ENNER VALENCIA', nation: 'ECUADOR' },
  { name: 'DARWIN NUNEZ', nation: 'URUGUAY' },
  { name: 'MIGUEL ALMIRON', nation: 'PARAGUAY' },
  { name: 'CHRIS WOOD', nation: 'NEW ZEALAND' },
  { name: 'KYLIAN MBAPPE', nation: 'FRANCE' },
  { name: 'LAMINE YAMAL', nation: 'SPAIN' },
  { name: 'HARRY KANE', nation: 'ENGLAND' },
  { name: 'CRISTIANO RONALDO', nation: 'PORTUGAL' },
  { name: 'JAMAL MUSIALA', nation: 'GERMANY' },
  { name: 'VIRGIL VAN DIJK', nation: 'NETHERLANDS' },
  { name: 'KEVIN DE BRUYNE', nation: 'BELGIUM' },
  { name: 'LUKA MODRIC', nation: 'CROATIA' },
  { name: 'GRANIT XHAKA', nation: 'SWITZERLAND' },
  { name: 'MARCEL SABITZER', nation: 'AUSTRIA' },
  { name: 'ANDY ROBERTSON', nation: 'SCOTLAND' },
  { name: 'ERLING HAALAND', nation: 'NORWAY' },
  { name: 'VIKTOR GYOKERES', nation: 'SWEDEN' },
  { name: 'HAKAN CALHANOGLU', nation: 'TURKEY' },
  { name: 'PATRIK SCHICK', nation: 'CZECHIA' },
  { name: 'EDIN DZEKO', nation: 'BOSNIA AND HERZEGOVINA' },
]

const TACTICS = [
  { id: 'TIKI-TAKA', desc: 'Pass, move, dominate' },
  { id: 'ROUTE ONE', desc: 'Direct and physical' },
  { id: 'GEGENPRESSING', desc: 'High intensity, press everything' },
  { id: 'COUNTER ATTACK', desc: 'Defend deep, strike fast' },
]

export default function BuildProfilePage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading, register, setUser } = useAuth()

  // Authenticated users skip the account step (they already have one).
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

  const accountStep = !isAuthenticated // whether step 1 (account creation) applies
  const totalSteps = accountStep ? 3 : 2

  useEffect(() => {
    if (!authLoading && isAuthenticated && step === 1) setStep(2)
  }, [authLoading, isAuthenticated, step])

  async function finish() {
    setLoading(true)
    setError('')
    try {
      if (isAuthenticated) {
        // Existing user — just persist their DNA choices.
        const updated = await api.updateInterests({
          favorite_team: formData.favorite_team,
          tactical_style: formData.tactical_style,
          rivalry_level: formData.rivalry_level,
        })
        setUser(updated)
      } else {
        // New user — register with the DNA captured in this flow.
        await register({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          favorite_team: formData.favorite_team,
          tactical_style: formData.tactical_style,
          rivalry_level: formData.rivalry_level,
        })
      }
      router.push('/profile')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // progress is relative to the steps that actually apply
  const shownStep = accountStep ? step : step - 1
  const progress = (shownStep / totalSteps) * 100

  return (
    <div className="bg-background text-on-background min-h-screen pb-20 md:pb-0 font-inter flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-headline-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          {!isAuthenticated && (
            <Link
              href="/auth"
              className="bg-primary-container text-on-primary-fixed px-md py-sm font-label-caps text-label-caps rounded-lg uppercase tracking-widest font-bold hover:bg-primary-fixed transition-all active:scale-95 glow-gold"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <div className="pt-[88px] flex-grow flex flex-col min-h-screen">
        <div className="w-full bg-white/5 h-1">
          <div
            className="h-full bg-primary-container transition-all duration-300 shadow-[0_0_8px_#e9c400]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center py-3 font-label-caps text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Step {shownStep} of {totalSteps}
        </p>

        <div className="flex-1 flex flex-col items-center px-gutter py-8 md:py-12 relative justify-center">
          {step === 1 && accountStep && (
            <div className="w-full max-w-md z-10 space-y-lg">
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
                  disabled={!formData.username || !formData.email || !formData.password}
                  className={`w-full py-4 mt-md font-montserrat uppercase tracking-wider rounded-lg font-bold text-sm ${
                    formData.username && formData.email && formData.password
                      ? 'btn-primary glow-gold active:scale-[0.98]'
                      : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                  }`}
                >
                  Continue
                </button>
                <p className="text-center font-body-md text-body-md text-on-surface-variant">
                  Already have an account?{' '}
                  <Link href="/auth" className="text-primary-container hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-5xl z-10 flex flex-col h-full">
              <div className="text-center mb-8 space-y-xs">
                <h1 className="font-display-md text-display-md font-black uppercase tracking-tight text-white">
                  Who Do You Ride With?
                </h1>
                <p className="text-primary-container font-montserrat text-xs uppercase tracking-widest font-black">
                  Select Your Nation
                </p>
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
                      <div className="h-20 flex items-end p-3 relative" style={{ background: nationGradient(p.nation) }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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

              <div className="fixed bottom-16 md:bottom-0 left-0 right-0 p-gutter bg-background/95 backdrop-blur-md border-t border-outline-variant/30 flex flex-col items-center gap-sm z-40">
                <button
                  onClick={() => formData.favorite_team && setStep(3)}
                  disabled={!formData.favorite_team}
                  className={`w-full max-w-md py-4 font-montserrat uppercase tracking-wider rounded-lg font-bold text-sm ${
                    formData.favorite_team
                      ? 'btn-primary glow-gold active:scale-[0.98]'
                      : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="w-full max-w-xl z-10 space-y-lg">
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
                      <p
                        className={`font-montserrat font-black uppercase tracking-wider text-xs mb-2 ${
                          isSelected ? 'text-primary-container' : 'text-on-surface'
                        }`}
                      >
                        {t.id}
                      </p>
                      <p className="font-body-md text-[11px] text-on-surface-variant leading-relaxed">{t.desc}</p>
                    </button>
                  )
                })}
              </div>

              <div className="bg-surface-container/40 p-md rounded-xl border border-outline-variant/20 space-y-md">
                <p className="text-center font-montserrat font-bold uppercase text-white tracking-widest text-xs">
                  Rivalry Intensity
                </p>
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

              {error && <p className="text-on-error-container text-center text-sm font-label-caps">{error}</p>}

              <button
                onClick={finish}
                disabled={loading || !formData.tactical_style}
                className={`w-full py-5 font-montserrat text-md uppercase tracking-wider rounded-lg font-black ${
                  formData.tactical_style
                    ? 'btn-primary glow-gold active:scale-[0.98]'
                    : 'bg-surface-variant/40 text-on-surface-variant/45 cursor-not-allowed border border-outline-variant/20'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-xs">
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Generating DNA Badge…
                  </span>
                ) : (
                  'Generate My DNA Badge'
                )}
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
    </div>
  )
}

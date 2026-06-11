'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { ApiError } from '@/lib/api'

function AuthCard() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/profile'
  const { login, register } = useAuth()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // signup fields
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [agreed, setAgreed] = useState(false)

  function switchTab(tab: 'login' | 'signup') {
    setActiveTab(tab)
    setError(null)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!loginEmail || !loginPassword) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    try {
      await login(loginEmail.trim(), loginPassword)
      router.push(next)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not sign in.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!username || !signupEmail || !signupPassword) {
      setError('Username, email and password are required.')
      return
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!agreed) {
      setError('Please accept the Terms of Service to continue.')
      return
    }
    setLoading(true)
    try {
      await register({
        username: username.trim(),
        email: signupEmail.trim(),
        password: signupPassword,
        full_name: fullName.trim() || undefined,
      })
      // New users go to the DNA builder to complete their profile.
      router.push('/profile/build')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not create your account.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'w-full bg-surface-container-lowest/60 border border-outline-variant/30 rounded-xl py-3.5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 transition-all font-body-md placeholder:text-on-surface-variant/40'

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="relative bg-surface-container/70 backdrop-blur-2xl border border-outline-variant/25 rounded-3xl p-8 md:p-10 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
        {/* Ambient glows */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-primary-container/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-secondary-fixed/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-container/10 border border-primary-container/20 mb-4">
              <span className="material-symbols-outlined text-primary-container text-[32px]">
                {activeTab === 'login' ? 'shield_person' : 'person_add'}
              </span>
            </div>
            <h1 className="font-display-md text-headline-lg font-black text-on-background">
              {activeTab === 'login' ? 'Welcome back' : 'Join the Game'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs max-w-xs mx-auto">
              {activeTab === 'login'
                ? 'Sign in to predict, score and climb the ranks.'
                : 'Build your Football DNA and start predicting.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-surface-container-low/60 rounded-xl p-1 mb-6">
            <button
              type="button"
              className={`flex-1 py-2.5 rounded-lg font-headline-md text-[15px] transition-all font-bold ${
                activeTab === 'login'
                  ? 'bg-primary-container text-on-primary-fixed shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => switchTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 rounded-lg font-headline-md text-[15px] transition-all font-bold ${
                activeTab === 'signup'
                  ? 'bg-primary-container text-on-primary-fixed shadow-md'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => switchTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-sm bg-error-container/10 border border-error-container/25 text-on-error-container rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
              <p className="font-body-md text-[14px]">{error}</p>
            </div>
          )}

          {/* Login */}
          {activeTab === 'login' && (
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    mail
                  </span>
                  <input
                    className={inputCls}
                    placeholder="alex@stadium.com"
                    type="email"
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    lock
                  </span>
                  <input
                    className={inputCls}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 mt-2 uppercase tracking-wider font-montserrat font-bold text-sm active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>

              <p className="text-center text-[13px] text-on-surface-variant mt-4">
                Don&apos;t have an account?{' '}
                <button type="button" onClick={() => switchTab('signup')} className="text-primary-container font-bold hover:underline">
                  Sign up free
                </button>
              </p>
            </form>
          )}

          {/* Sign up */}
          {activeTab === 'signup' && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Full Name <span className="text-on-surface-variant/40 normal-case">(optional)</span>
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    badge
                  </span>
                  <input
                    className={inputCls}
                    placeholder="Alex Morgan"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Username
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    alternate_email
                  </span>
                  <input
                    className={inputCls}
                    placeholder="goalgetter26"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    mail
                  </span>
                  <input
                    className={inputCls}
                    placeholder="alex@stadium.com"
                    type="email"
                    autoComplete="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary-container transition-colors text-[20px]">
                    lock
                  </span>
                  <input
                    className={inputCls}
                    placeholder="At least 6 characters"
                    type="password"
                    autoComplete="new-password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 px-1 mt-1 cursor-pointer">
                <input
                  className="mt-1 w-4 h-4 accent-[#e9c400] bg-surface-container-highest border-outline-variant/50 rounded"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-[12px] text-on-surface-variant leading-relaxed">
                  By signing up, you agree to the{' '}
                  <span className="text-primary-container hover:underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-primary-container hover:underline cursor-pointer">Privacy Policy</span>.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 mt-1 uppercase tracking-wider font-montserrat font-bold text-sm active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account…' : 'Join the Game'}
              </button>

              <p className="text-center text-[13px] text-on-surface-variant mt-3">
                Already have an account?{' '}
                <button type="button" onClick={() => switchTab('login')} className="text-primary-container font-bold hover:underline">
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-lg mt-6 text-on-surface-variant/40">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider">Encrypted</span>
        </div>
        <div className="w-px h-4 bg-outline-variant/20" />
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider">Secure</span>
        </div>
        <div className="w-px h-4 bg-outline-variant/20" />
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
          <span className="font-label-caps text-[10px] uppercase tracking-wider">Free</span>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative font-inter">
      {/* Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-background/85 z-10" />
        <img
          alt="Grand cinematic stadium"
          className="w-full h-full object-cover opacity-25 scale-105"
          src="/images/heroes/auth-bg.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60 z-20" />
      </div>

      {/* Header */}
      <header className="w-full z-50 flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
        <Link
          href="/"
          className="font-display-md text-headline-md font-black tracking-tighter text-primary-container uppercase"
        >
          WorldCupDNA
        </Link>
        <Link
          href="/"
          className="text-on-surface-variant hover:text-primary-container transition-colors font-montserrat text-sm font-bold uppercase tracking-wider flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-gutter py-lg z-10">
        <Suspense fallback={<div className="text-on-surface-variant">Loading…</div>}>
          <AuthCard />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="w-full py-md text-center border-t border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
        <p className="font-label-caps text-[11px] text-on-surface-variant/40 tracking-wider">
          Official WorldCupDNA Fan Network © 2026
        </p>
      </footer>
    </div>
  )
}

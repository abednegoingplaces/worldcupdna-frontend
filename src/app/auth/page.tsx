'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  return (
    <div className="bg-background min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative font-inter">
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-background/80 z-10"></div>
        <img 
          alt="Grand cinematic stadium" 
          className="w-full h-full object-cover opacity-30 scale-105" 
          src="/images/heroes/auth-bg.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90 z-20"></div>
      </div>

      {/* Header Shell */}
      <header className="w-full z-50 flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
        <Link href="/" className="font-display-md text-headline-md font-black tracking-tighter text-primary-container uppercase">
          WorldCupDNA
        </Link>
        <Link 
          href="/" 
          className="text-on-surface-variant hover:text-primary transition-colors font-montserrat text-sm font-bold uppercase tracking-wider flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-gutter py-xl z-10">
        {/* Auth Card */}
        <div className="w-full max-w-md bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md md:p-lg relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Subtle Decorative Light */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-container/10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary-fixed/5 blur-[80px] rounded-full"></div>

          {/* Tab Navigation */}
          <div className="flex border-b border-outline-variant/30 mb-md relative">
            <button 
              className={`flex-1 py-sm font-headline-md text-headline-md transition-all font-bold ${
                activeTab === 'login' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`flex-1 py-sm font-headline-md text-headline-md transition-all font-bold ${
                activeTab === 'signup' 
                  ? 'text-primary-container border-b-2 border-primary-container' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form Content */}
          {activeTab === 'login' && (
            <div className="space-y-md block animate-in fade-in duration-300">
              <div className="space-y-base">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors text-xl">mail</span>
                  <input 
                    className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                    placeholder="alex@stadium.com" 
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-base">
                <div className="flex justify-between items-center px-1">
                  <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Password</label>
                  <a className="text-[12px] font-semibold text-primary-container hover:underline transition-all" href="#">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors text-xl">lock</span>
                  <input 
                    className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 pl-12 pr-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
              </div>

              <button className="w-full btn-primary py-4 mt-lg uppercase tracking-wider font-montserrat font-bold text-sm glow-gold active:scale-[0.98] transition-all">
                Sign In
              </button>
            </div>
          )}

          {/* Sign Up Form Content */}
          {activeTab === 'signup' && (
            <div className="space-y-md block animate-in fade-in duration-300">
              <div className="grid grid-cols-1 gap-md">
                <div className="space-y-base">
                  <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">Full Name</label>
                  <input 
                    className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                    placeholder="Alex Morgan" 
                    type="text"
                  />
                </div>
                <div className="space-y-base">
                  <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">Username</label>
                  <input 
                    className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                    placeholder="goalgetter26" 
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-base">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">Email Address</label>
                <input 
                  className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                  placeholder="alex@stadium.com" 
                  type="email"
                />
              </div>

              <div className="space-y-base">
                <label className="block font-label-caps text-[11px] text-on-surface-variant uppercase ml-1 tracking-wider">Password</label>
                <input 
                  className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md" 
                  placeholder="Create a strong password" 
                  type="password"
                />
              </div>

              <div className="flex items-start gap-3 px-1 mt-4">
                <input 
                  className="mt-1 bg-surface-container-highest border-outline-variant/50 rounded text-primary-container focus:ring-primary-container/20" 
                  type="checkbox"
                />
                <p className="text-[12px] text-on-surface-variant leading-relaxed">
                  By signing up, you agree to the <span className="text-primary-container hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary-container hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
              </div>

              <button className="w-full btn-primary py-4 mt-base uppercase tracking-wider font-montserrat font-bold text-sm glow-gold active:scale-[0.98] transition-all">
                Join the Game
              </button>
            </div>
          )}

          {/* Social Auth Divider */}
          <div className="relative my-md py-base">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold font-label-caps">
              <span className="bg-[#191919] px-4 text-on-surface-variant">Or Continue With</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-md">
            <button className="p-3 rounded-lg border border-outline-variant/30 hover:bg-white/5 transition-all group">
              <svg className="w-5 h-5 fill-on-surface-variant group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.909 3.161-1.908 4.161-1.269 1.269-3.26 2.66-6.412 2.66-5.141 0-9.271-4.131-9.271-9.271 0-5.141 4.13-9.271 9.271-9.271 2.78 0 4.871 1.09 6.36 2.5l2.33-2.33c-2.18-2.08-5.06-3.32-8.69-3.32-7.18 0-13 5.82-13 13s5.82 13 13 13c3.87 0 6.79-1.28 9.08-3.66 2.33-2.33 3.07-5.59 3.07-8.15 0-.52-.05-1.03-.14-1.52h-12.01z"></path></svg>
            </button>
            <button className="p-3 rounded-lg border border-outline-variant/30 hover:bg-white/5 transition-all group">
              <svg className="w-5 h-5 fill-on-surface-variant group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M16.365 1.43c.691 0 1.262.15 1.744.445l-5.38 14.591a1.2 1.2 0 0 1-.22.428 1.215 1.215 0 0 1-.673.375c-.248.05-.483.05-.705.011a1.285 1.285 0 0 1-.605-.303l-4.13-4.13a1.18 1.18 0 0 1-.34-.835c0-.332.12-.615.362-.848a1.173 1.173 0 0 1 .836-.341c.325 0 .6.115.825.344l2.83 2.827 4.13-11.196c.15-.395.42-.716.804-.962a1.88 1.88 0 0 1 1.026-.316zm5.73 0c.691 0 1.262.15 1.744.445l-5.38 14.591a1.2 1.2 0 0 1-.22.428 1.215 1.215 0 0 1-.673.375c-.248.05-.483.05-.705.011a1.285 1.285 0 0 1-.605-.303l-4.13-4.13a1.18 1.18 0 0 1-.34-.835c0-.332.12-.615.362-.848a1.173 1.173 0 0 1 .836-.341c.325 0 .6.115.825.344l2.83 2.827 4.13-11.196c.15-.395.42-.716.804-.962a1.88 1.88 0 0 1 1.026-.316z"></path></svg>
            </button>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full py-md text-center border-t border-outline-variant/10 bg-surface-container-lowest/80 backdrop-blur-md">
        <p className="font-label-caps text-[11px] text-on-surface-variant/50 tracking-wider">Official WorldCupDNA Fan Network © 2026</p>
      </footer>
    </div>
  )
}


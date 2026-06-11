'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { nationGradient } from '@/lib/nationColors'

const FEATURED_PLAYERS = [
  { name: 'LIONEL MESSI', nation: 'ARGENTINA' },
  { name: 'KYLIAN MBAPPE', nation: 'FRANCE' },
  { name: 'VINICIUS JR', nation: 'BRAZIL' },
  { name: 'CHRISTIAN PULISIC', nation: 'USA' },
  { name: 'SON HEUNG-MIN', nation: 'SOUTH KOREA' },
  { name: 'MOHAMED SALAH', nation: 'EGYPT' },
]

export default function Home() {
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const target = new Date('2026-06-11T00:00:00')
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-on-background">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            <Link className="font-headline-md text-primary-container border-b-2 border-primary-container pb-1 font-bold" href="/">
              Home
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/matches">
              Matches
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/predictions">
              Predictions
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/leaderboard">
              Leaderboard
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/venues">
              Watch Parties
            </Link>
          </nav>
          <div className="flex items-center gap-md">
            <div className="hidden lg:flex items-center bg-surface-variant/30 px-md py-xs rounded-full border border-outline-variant/30">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-body-md placeholder:text-on-surface-variant/50 w-32 outline-none text-on-surface" placeholder="Search matches..." type="text"/>
            </div>
            <div className="flex items-center gap-sm">
              <button className="p-xs text-on-surface-variant hover:bg-surface-variant/20 rounded-full transition-all duration-300 cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-xs text-on-surface-variant hover:bg-surface-variant/20 rounded-full transition-all duration-300 cursor-pointer">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
            <Link href="/auth" className="hidden sm:block bg-primary-container text-on-primary-fixed px-md py-sm font-label-caps text-label-caps rounded-lg uppercase tracking-widest font-bold hover:bg-primary-fixed transition-all duration-300 active:scale-95 glow-gold text-center">
              Join the Game
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* IMAGE: use local /images/heroes/hero-stadium.jpg as img tag, not CSS */}
            <img alt="World Cup Stadium Energy" className="w-full h-full object-cover" src="/images/heroes/hero-stadium.jpg" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 px-gutter max-w-container-max mx-auto w-full">
            <div className="max-w-2xl space-y-md">
              <div className="inline-flex items-center gap-sm bg-secondary-container/10 border border-secondary-container/20 px-md py-xs rounded-full text-secondary-fixed font-label-caps text-label-caps">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed"></span>
                </span>
                2026 ROADMAP LIVE
              </div>
              <h1 className="font-display-lg text-display-lg text-on-background leading-tight">
                {"What's Your"} <br/><span className="text-primary-container">Football DNA?</span>
              </h1>
              <p className="font-headline-md text-headline-md text-primary-container font-bold opacity-90">
                Build your fan profile. Predict matches. Rule the leaderboard.
              </p>
              <div className="flex flex-wrap gap-md pt-base">
                <Link href="/profile/build" className="bg-primary-container text-on-primary-fixed px-lg py-md rounded-lg font-headline-md text-headline-md font-extrabold glow-gold transition-all duration-300 active:scale-95 text-center">
                  Build My DNA
                </Link>
                <button className="glass-card text-on-background px-lg py-md rounded-lg font-headline-md text-headline-md font-bold hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <Link href="/profile/build" className="glass-card group p-lg rounded-xl flex flex-col gap-md transition-all duration-500 hover:-translate-y-2 glow-green">
              <div className="w-14 h-14 rounded-lg bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[32px]">dns</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-background">Fan DNA Profile</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Create your unique fan identity, track your stats across every tournament, and earn legendary badges.</p>
              <div className="mt-auto pt-md flex items-center text-secondary-fixed font-bold font-label-caps group-hover:gap-sm transition-all">
                EXPLORE GENOME <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </Link>
            <Link href="/predictions" className="glass-card group p-lg rounded-xl flex flex-col gap-md transition-all duration-500 hover:-translate-y-2 glow-green">
              <div className="w-14 h-14 rounded-lg bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[32px]">sports_soccer</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-background">Match Predictions</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Put your football IQ to the test. Predict outcomes, scores, and scorers to climb the global ranks.</p>
              <div className="mt-auto pt-md flex items-center text-secondary-fixed font-bold font-label-caps group-hover:gap-sm transition-all">
                MAKE PICKS <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </Link>
            <Link href="/venues" className="glass-card group p-lg rounded-xl flex flex-col gap-md transition-all duration-500 hover:-translate-y-2 glow-green">
              <div className="w-14 h-14 rounded-lg bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[32px]">location_on</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-background">Watch Party Finder</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Join the roar of the crowd. Find official fan zones and local parties in every host city.</p>
              <div className="mt-auto pt-md flex items-center text-secondary-fixed font-bold font-label-caps group-hover:gap-sm transition-all">
                FIND A ZONE <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Star Players Section */}
        <section className="py-xl px-gutter max-w-container-max mx-auto space-y-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div className="space-y-sm">
              <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-tight">Star Players</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">The faces of World Cup 2026</p>
            </div>
            <Link href="/profile/build" className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-primary-container hover:underline">
              Pick Your Nation &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md">
            {FEATURED_PLAYERS.map((player) => (
              <div key={player.name} className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <div
                  className="h-28 w-full"
                  style={{ background: nationGradient(player.nation) }}
                />
                <div className="p-sm">
                  <p className="font-headline-md text-body-md font-black uppercase tracking-tight text-on-background truncate">{player.name}</p>
                  <p className="font-label-caps text-[10px] text-on-surface-variant mt-xs truncate">{player.nation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Countdown Section */}
        <section className="relative py-xl bg-surface-container-lowest overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 h-full">
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
              <div className="border-r border-outline-variant/30"></div>
            </div>
          </div>
          <div className="relative z-10 px-gutter max-w-container-max mx-auto text-center space-y-lg">
            <div className="space-y-sm">
              <h2 className="font-display-md text-display-md text-primary-container">Tournament kicks off June 11</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">The 2026 World Cup awaits. Are you ready?</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-xl max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <span className="font-display-md text-display-lg text-on-background font-black tabular-nums" id="days">{countdown.days}</span>
                <span className="font-label-caps text-label-caps text-on-tertiary-container uppercase">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-md text-display-lg text-on-background font-black tabular-nums" id="hours">{countdown.hours}</span>
                <span className="font-label-caps text-label-caps text-on-tertiary-container uppercase">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-md text-display-lg text-on-background font-black tabular-nums" id="minutes">{countdown.minutes}</span>
                <span className="font-label-caps text-label-caps text-on-tertiary-container uppercase">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-md text-display-lg text-primary-container font-black tabular-nums" id="seconds">{countdown.seconds}</span>
                <span className="font-label-caps text-label-caps text-on-tertiary-container uppercase">Seconds</span>
              </div>
            </div>
            <div className="pt-lg">
              <button className="bg-secondary-fixed text-on-secondary px-lg py-md rounded-full font-label-caps text-label-caps font-black tracking-widest uppercase hover:bg-secondary-container transition-all cursor-pointer">
                Download Tournament Schedule
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-xl bg-surface-container-lowest border-t border-outline-variant/50">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto space-y-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-headline-md text-headline-md text-primary-container font-black">WorldCupDNA</span>
            <p className="font-body-md text-body-md text-on-tertiary-container">© 2026 WorldCupDNA. All Rights Reserved. One Dream, One World.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-md">
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Terms of Service</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="#">Fan Support</Link>
            <Link className="font-body-md text-body-md text-on-tertiary-container hover:text-secondary-fixed transition-colors" href="https://www.fifa.com" target="_blank" rel="noopener noreferrer">Official FIFA Site</Link>
          </div>
          <div className="flex gap-md">
            <Link className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary-container hover:text-primary-container transition-all" href="#">
              <span className="material-symbols-outlined">share</span>
            </Link>
            <Link className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:border-primary-container hover:text-primary-container transition-all" href="#">
              <span className="material-symbols-outlined">public</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 flex items-center justify-around z-50">
        {[
          { href: '/', icon: 'home', label: 'Home', active: true },
          { href: '/matches', icon: 'sports_soccer', label: 'Matches', active: false },
          { href: '/predictions', icon: 'analytics', label: 'Predict', active: false },
          { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks', active: false },
          { href: '/venues', icon: 'location_on', label: 'Venues', active: false },
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

'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PredictionsPage() {
  const [predicted, setPredicted] = useState<Record<string, boolean>>({})

  const handlePredict = (matchId: string) => {
    setPredicted(prev => ({ ...prev, [matchId]: true }))
    setTimeout(() => {
      setPredicted(prev => ({ ...prev, [matchId]: false }))
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-on-background">
      <style dangerouslySetInnerHTML={{ __html: `
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}} />

      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/matches">
              Matches
            </Link>
            <Link className="font-headline-md text-primary-container border-b-2 border-primary-container pb-1 font-bold" href="/predictions">
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

      {/* Main Content */}
      <main className="pt-[88px] flex-grow">

        {/* ═══ Section: Upcoming Matches ═══ */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg gap-md">
            <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-widest">
              Upcoming Matches
            </h2>
            <div className="flex items-center gap-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-fixed"></span>
              </span>
              <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                Live Updates Active
              </span>
            </div>
          </div>

          <div className="space-y-lg">

            {/* Match Card 1 — USA vs MEXICO */}
            <div className="glass-card p-6 rounded-xl hover:border-primary-container/30 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-center gap-md md:gap-lg">
                {/* Left Meta */}
                <div className="flex flex-col items-center md:items-start min-w-[160px] gap-xs">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    June 14, 2026
                  </span>
                  <span className="font-headline-md text-body-md text-primary-container font-bold uppercase tracking-widest">
                    Group A
                  </span>
                  <div className="flex items-center gap-1 text-on-surface-variant/60">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="font-label-caps text-[11px]">MetLife Stadium, NJ</span>
                  </div>
                </div>

                {/* Center — Teams + Inputs */}
                <div className="flex-1 flex items-center justify-center gap-md w-full md:w-auto">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center gap-sm">
                    <div className="w-12 h-8 rounded bg-blue-700 shadow-lg group-hover:scale-110 transition-transform" title="USA" />
                    <span className="font-headline-md text-body-md font-bold text-on-background">USA</span>
                  </div>

                  {/* Score Inputs */}
                  <div className="flex items-center gap-sm">
                    <input
                      id="match1-score-home"
                      className="w-14 h-14 bg-surface-container-highest border-2 border-outline-variant text-center text-headline-md font-bold rounded-xl focus:border-primary-container focus:ring-0 transition-colors text-on-surface outline-none"
                      placeholder="0"
                      type="number"
                      min={0}
                      max={9}
                      onInput={(e) => { const t = e.target as HTMLInputElement; if (t.value.length > 1) t.value = t.value.slice(0,1) }}
                    />
                    <span className="font-display-md text-headline-md text-outline-variant select-none">:</span>
                    <input
                      id="match1-score-away"
                      className="w-14 h-14 bg-surface-container-highest border-2 border-outline-variant text-center text-headline-md font-bold rounded-xl focus:border-primary-container focus:ring-0 transition-colors text-on-surface outline-none"
                      placeholder="0"
                      type="number"
                      min={0}
                      max={9}
                      onInput={(e) => { const t = e.target as HTMLInputElement; if (t.value.length > 1) t.value = t.value.slice(0,1) }}
                    />
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center gap-sm">
                    <div className="w-12 h-8 rounded bg-green-700 shadow-lg group-hover:scale-110 transition-transform" title="Mexico" />
                    <span className="font-headline-md text-body-md font-bold text-on-background">MEXICO</span>
                  </div>
                </div>

                {/* Right — Predict Button */}
                <div className="w-full md:w-auto">
                  <button
                    id="predict-match-1"
                    onClick={() => handlePredict('match-1')}
                    className={`w-full md:w-auto font-black px-6 py-3 rounded-lg active:scale-95 transition-all duration-300 uppercase font-label-caps text-label-caps tracking-widest cursor-pointer ${
                      predicted['match-1']
                        ? 'bg-secondary-fixed text-background'
                        : 'bg-primary-container text-background glow-gold'
                    }`}
                  >
                    {predicted['match-1'] ? 'SAVED!' : 'PREDICT'}
                  </button>
                </div>
              </div>
            </div>

            {/* Match Card 2 — BRAZIL vs FRANCE */}
            <div className="glass-card p-6 rounded-xl hover:border-primary-container/30 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row items-center gap-md md:gap-lg">
                {/* Left Meta */}
                <div className="flex flex-col items-center md:items-start min-w-[160px] gap-xs">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    June 15, 2026
                  </span>
                  <span className="font-headline-md text-body-md text-primary-container font-bold uppercase tracking-widest">
                    Group B
                  </span>
                  <div className="flex items-center gap-1 text-on-surface-variant/60">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="font-label-caps text-[11px]">SoFi Stadium, CA</span>
                  </div>
                </div>

                {/* Center — Teams + Inputs */}
                <div className="flex-1 flex items-center justify-center gap-md w-full md:w-auto">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center gap-sm">
                    <div className="w-12 h-8 rounded bg-yellow-600 shadow-lg group-hover:scale-110 transition-transform" title="Brazil" />
                    <span className="font-headline-md text-body-md font-bold text-on-background">BRAZIL</span>
                  </div>

                  {/* Score Inputs */}
                  <div className="flex items-center gap-sm">
                    <input
                      id="match2-score-home"
                      className="w-14 h-14 bg-surface-container-highest border-2 border-outline-variant text-center text-headline-md font-bold rounded-xl focus:border-primary-container focus:ring-0 transition-colors text-on-surface outline-none"
                      placeholder="0"
                      type="number"
                      min={0}
                      max={9}
                      onInput={(e) => { const t = e.target as HTMLInputElement; if (t.value.length > 1) t.value = t.value.slice(0,1) }}
                    />
                    <span className="font-display-md text-headline-md text-outline-variant select-none">:</span>
                    <input
                      id="match2-score-away"
                      className="w-14 h-14 bg-surface-container-highest border-2 border-outline-variant text-center text-headline-md font-bold rounded-xl focus:border-primary-container focus:ring-0 transition-colors text-on-surface outline-none"
                      placeholder="0"
                      type="number"
                      min={0}
                      max={9}
                      onInput={(e) => { const t = e.target as HTMLInputElement; if (t.value.length > 1) t.value = t.value.slice(0,1) }}
                    />
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-col items-center gap-sm">
                    <div className="w-12 h-8 rounded bg-blue-600 shadow-lg group-hover:scale-110 transition-transform" title="France" />
                    <span className="font-headline-md text-body-md font-bold text-on-background">FRANCE</span>
                  </div>
                </div>

                {/* Right — Predict Button */}
                <div className="w-full md:w-auto">
                  <button
                    id="predict-match-2"
                    onClick={() => handlePredict('match-2')}
                    className={`w-full md:w-auto font-black px-6 py-3 rounded-lg active:scale-95 transition-all duration-300 uppercase font-label-caps text-label-caps tracking-widest cursor-pointer ${
                      predicted['match-2']
                        ? 'bg-secondary-fixed text-background'
                        : 'bg-primary-container text-background glow-gold'
                    }`}
                  >
                    {predicted['match-2'] ? 'SAVED!' : 'PREDICT'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ Section: My Predictions ═══ */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-lg gap-md">
            <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-widest">
              My Predictions
            </h2>
            <div className="bg-[#201f1f] border border-white/5 rounded-full px-4 py-1 flex items-center gap-md">
              <div className="flex items-center gap-xs">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Global Rank</span>
                <span className="font-headline-md text-body-md text-primary-container font-black">#1,245</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10"></div>
              <div className="flex items-center gap-xs">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Points</span>
                <span className="font-headline-md text-body-md text-secondary-fixed font-black">450 pts</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-sm">

            {/* Row 1 — Correct */}
            <div className="glass-card rounded-lg p-3 flex items-center justify-between border-l-4 border-l-[#00FF87]">
              <div className="flex items-center gap-md">
                <div className="flex -space-x-2">
                  <div className="w-6 h-4 rounded-sm bg-sky-400 ring-2 ring-background" title="Argentina" />
                  <div className="w-6 h-4 rounded-sm bg-red-600 ring-2 ring-background" title="Spain" />
                </div>
                <div>
                  <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Argentina vs Spain</p>
                  <p className="font-stats-number text-on-surface text-sm">Pred: 2-1 | Result: 2-1</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className="bg-secondary-fixed/10 text-secondary-fixed px-md py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Correct
                </span>
                <span className="font-stats-number text-secondary-fixed font-black">+50</span>
              </div>
            </div>

            {/* Row 2 — Incorrect */}
            <div className="glass-card rounded-lg p-3 flex items-center justify-between border-l-4 border-l-red-400">
              <div className="flex items-center gap-md">
                <div className="flex -space-x-2">
                  <div className="w-6 h-4 rounded-sm bg-gray-700 ring-2 ring-background" title="Germany" />
                  <div className="w-6 h-4 rounded-sm bg-red-500 ring-2 ring-background" title="Japan" />
                </div>
                <div>
                  <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Germany vs Japan</p>
                  <p className="font-stats-number text-on-surface text-sm">Pred: 3-0 | Result: 1-1</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className="bg-red-400/10 text-red-400 px-md py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Incorrect
                </span>
                <span className="font-stats-number text-red-400 font-black">0</span>
              </div>
            </div>

            {/* Row 3 — Pending */}
            <div className="glass-card rounded-lg p-3 flex items-center justify-between border-l-4 border-l-[#353534]">
              <div className="flex items-center gap-md">
                <div className="flex -space-x-2">
                  <div className="w-6 h-4 rounded-sm bg-red-600 ring-2 ring-background" title="Canada" />
                  <div className="w-6 h-4 rounded-sm bg-white ring-2 ring-background" title="England" />
                </div>
                <div>
                  <p className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">Canada vs England</p>
                  <p className="font-stats-number text-on-surface text-sm">Pred: 0-2 | Live</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <span className="bg-surface-variant text-on-surface-variant px-md py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Pending
                </span>
                <span className="font-stats-number text-on-surface-variant font-black">--</span>
              </div>
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

      {/* Mobile Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#131313]/95 backdrop-blur border-t border-white/10 flex items-center justify-around z-50">
        <Link href="/matches" className="flex flex-col items-center gap-xs text-primary-container">
          <span className="material-symbols-outlined text-[22px]">sports_soccer</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Matches</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">analytics</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Bracket</span>
        </Link>
        <Link href="/profile/build" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">person</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Fan ID</span>
        </Link>
      </nav>
    </div>
  )
}

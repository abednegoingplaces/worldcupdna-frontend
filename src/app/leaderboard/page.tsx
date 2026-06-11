'use client'

import Link from 'next/link'
import { useState } from 'react'
import { nationGradient } from '@/lib/nationColors'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global')

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-[#050505] text-on-background">
      <div className="fixed inset-0 -z-10" style={{background: 'radial-gradient(circle at top, #1a1a2e 0%, #050505 100%)'}} />
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
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/predictions">
              Predictions
            </Link>
            <Link className="font-headline-md text-primary-container border-b-2 border-primary-container pb-1 font-bold" href="/leaderboard">
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

      {/* Main Container */}
      <main className="pt-[112px] px-gutter max-w-container-max mx-auto w-full space-y-xl pb-24">
        
        {/* Page Header */}
        <div className="space-y-sm text-center md:text-left">
          <h1 className="font-display-md text-display-lg italic uppercase text-primary-container tracking-tight leading-none">
            ELITE RANKINGS
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Compete with fans globally. Earn points through predictions, match attendance, and trivia mastery.
          </p>
        </div>

        {/* Podium Section */}
        <div className="grid grid-cols-3 gap-4 items-end max-w-4xl mx-auto pt-lg">
          
          {/* 2nd Place Card (left) */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl border-t-4 border-t-slate-400 p-lg flex flex-col items-center text-center gap-sm transition-transform duration-300 hover:scale-[1.03] shadow-lg">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center font-display-md text-headline-lg text-white border-2 border-slate-400 font-bold" style={{ background: nationGradient('ITALY') }}>
                MR
              </div>
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-slate-400 text-on-primary-fixed text-[11px] font-label-caps px-md py-0.5 rounded-full font-bold">
                #2
              </span>
            </div>
            <div className="space-y-xs pt-xs">
              <h3 className="font-headline-md text-headline-md text-on-background">Marco Rossi</h3>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">Italy</p>
            </div>
            <div className="font-display-md text-headline-md text-slate-300 font-black">
              12,450 PTS
            </div>
          </div>

          {/* 1st Place Card (center, taller) */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl border-t-4 border-t-[#ffd700] p-xl flex flex-col items-center text-center gap-sm transition-transform duration-300 hover:scale-[1.03] shadow-[0_10px_30px_rgba(255,215,0,0.15)] relative min-h-[360px]">
            {/* Crown icon floating above */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <span className="material-symbols-outlined text-5xl text-[#ffd700]" 
                    style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
            </div>
            <div className="relative mt-2">
              <div className="w-32 h-32 rounded-full bg-surface-variant flex items-center justify-center font-display-md text-display-md text-white border-2 border-[#ffd700] font-bold" style={{ background: nationGradient('FRANCE') }}>
                ED
              </div>
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-[#ffd700] text-on-primary-fixed text-[11px] font-label-caps px-md py-0.5 rounded-full font-black">
                #1
              </span>
            </div>
            <div className="space-y-xs pt-xs">
              <div className="flex items-center justify-center gap-xs">
                <h3 className="font-headline-md text-headline-lg text-on-background">Elena Dupont</h3>
                <span className="material-symbols-outlined text-secondary-fixed">trending_up</span>
              </div>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">France</p>
            </div>
            <div className="font-display-md text-display-md text-secondary-fixed font-black">
              15,890 PTS
            </div>
          </div>

          {/* 3rd Place Card (right) */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl border-t-4 border-t-orange-700 p-lg flex flex-col items-center text-center gap-sm transition-transform duration-300 hover:scale-[1.03] shadow-lg">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-surface-variant flex items-center justify-center font-display-md text-headline-lg text-white border-2 border-orange-700 font-bold" style={{ background: nationGradient('JAPAN') }}>
                KS
              </div>
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-orange-700 text-white text-[11px] font-label-caps px-md py-0.5 rounded-full font-bold">
                #3
              </span>
            </div>
            <div className="space-y-xs pt-xs">
              <h3 className="font-headline-md text-headline-md text-on-background">Kenji Sato</h3>
              <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">Japan</p>
            </div>
            <div className="font-display-md text-headline-md text-orange-400 font-black">
              10,120 PTS
            </div>
          </div>

        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-md bg-surface-variant/20 p-md rounded-xl border border-outline-variant/30">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              person_search
            </span>
            <input 
              type="text" 
              placeholder="Find a fan..." 
              className="w-full bg-surface-variant/30 pl-xl pr-md py-sm rounded-full border border-outline-variant/30 text-body-md placeholder:text-on-surface-variant/50 outline-none text-on-surface focus:ring-1 focus:ring-primary-container"
            />
          </div>
          <div className="flex bg-surface-variant/30 p-xs rounded-lg border border-outline-variant/30">
            <button 
              onClick={() => setActiveTab('global')}
              className={`px-lg py-xs font-label-caps text-label-caps uppercase rounded-md transition-all font-bold cursor-pointer ${activeTab === 'global' ? 'bg-[#ffd700] text-black shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Global
            </button>
            <button 
              onClick={() => setActiveTab('friends')}
              className={`px-lg py-xs font-label-caps text-label-caps uppercase rounded-md transition-all font-bold cursor-pointer ${activeTab === 'friends' ? 'bg-[#ffd700] text-black shadow-md' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Friends
            </button>
          </div>
        </div>

        {/* Rankings Table (glass-card container) */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-white/2">
                  <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Rank</th>
                  <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Fan</th>
                  <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Favorite Team</th>
                  <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase text-right">Total Points</th>
                  <th className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {/* Row 4 */}
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-md px-lg font-display-md text-headline-md font-bold text-on-surface-variant/80">04</td>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-surface-variant/80 flex items-center justify-center font-bold text-sm text-on-surface font-display-md">
                        LO
                      </div>
                      <span className="font-body-md text-body-md text-on-background font-semibold">Liam O&apos;Connell</span>
                    </div>
                  </td>
                  <td className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Ireland</td>
                  <td className="py-md px-lg font-display-md text-headline-md text-on-background font-black text-right">9,850</td>
                  <td className="py-md px-lg text-center">
                    <span className="material-symbols-outlined text-[#00FF87]">trending_up</span>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-md px-lg font-display-md text-headline-md font-bold text-on-surface-variant/80">05</td>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-surface-variant/80 flex items-center justify-center font-bold text-sm text-on-surface font-display-md">
                        SG
                      </div>
                      <span className="font-body-md text-body-md text-on-background font-semibold">Sofia Garcia</span>
                    </div>
                  </td>
                  <td className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Spain</td>
                  <td className="py-md px-lg font-display-md text-headline-md text-on-background font-black text-right">9,720</td>
                  <td className="py-md px-lg text-center">
                    <span className="material-symbols-outlined text-on-surface-variant/50">horizontal_rule</span>
                  </td>
                </tr>

                {/* Row 6 (YOU - highlighted: gold left border, bg-primary/5, green labels) */}
                <tr className="border-l-4 border-l-[#ffd700] bg-[#ffd700]/5 hover:bg-[#ffd700]/10 transition-colors group">
                  <td className="py-md px-lg font-display-md text-headline-md font-black text-[#ffd700]">06</td>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-[#ffd700] flex items-center justify-center font-black text-sm text-black font-display-md">
                        Y
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-sm">
                          <span className="font-body-md text-body-md text-on-background font-black uppercase tracking-tight">YOU</span>
                          <span className="bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/30 text-[9px] font-bold font-label-caps px-xs py-0.5 rounded">
                            PRO MEMBER
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-md px-lg font-label-caps text-label-caps text-[#ffd700] uppercase font-bold">Brazil</td>
                  <td className="py-md px-lg font-display-md text-headline-md text-[#ffd700] font-black text-right">9,410</td>
                  <td className="py-md px-lg text-center">
                    <span className="material-symbols-outlined text-[#00FF87] animate-bounce">keyboard_arrow_up</span>
                  </td>
                </tr>

                {/* Row 7 */}
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-md px-lg font-display-md text-headline-md font-bold text-on-surface-variant/80">07</td>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-surface-variant/80 flex items-center justify-center font-bold text-sm text-on-surface font-display-md">
                        AA
                      </div>
                      <span className="font-body-md text-body-md text-on-background font-semibold">Aisha Al-Sayed</span>
                    </div>
                  </td>
                  <td className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Qatar</td>
                  <td className="py-md px-lg font-display-md text-headline-md text-on-background font-black text-right">8,900</td>
                  <td className="py-md px-lg text-center">
                    <span className="material-symbols-outlined text-[#ffb4ab]">trending_down</span>
                  </td>
                </tr>

                {/* Row 8 */}
                <tr className="hover:bg-white/5 transition-colors group">
                  <td className="py-md px-lg font-display-md text-headline-md font-bold text-on-surface-variant/80">08</td>
                  <td className="py-md px-lg">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-surface-variant/80 flex items-center justify-center font-bold text-sm text-on-surface font-display-md">
                        HM
                      </div>
                      <span className="font-body-md text-body-md text-on-background font-semibold">Hans Müller</span>
                    </div>
                  </td>
                  <td className="py-md px-lg font-label-caps text-label-caps text-on-surface-variant uppercase">Germany</td>
                  <td className="py-md px-lg font-display-md text-headline-md text-on-background font-black text-right">8,750</td>
                  <td className="py-md px-lg text-center">
                    <span className="material-symbols-outlined text-on-surface-variant/50">horizontal_rule</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Load More button */}
          <div className="p-md flex justify-center border-t border-outline-variant/30">
            <button className="bg-surface-variant/40 hover:bg-surface-variant/60 text-on-surface px-lg py-sm rounded-lg font-label-caps text-label-caps uppercase tracking-widest font-bold transition-all border border-outline-variant/30 cursor-pointer">
              Load More Rankings
            </button>
          </div>
        </div>

        {/* Rewards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          {/* Card 1 (col-span-2) */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-lg relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-lg group">
            {/* Decorative background icon */}
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[160px] opacity-5 text-on-surface transform -rotate-12 transition-transform group-hover:scale-110">
              confirmation_number
            </span>
            <div className="space-y-xs relative z-10">
              <span className="text-[10px] font-label-caps text-[#00FF87] font-bold tracking-widest uppercase">VIP Perks</span>
              <h3 className="font-headline-lg text-headline-lg text-on-background">Exclusive Rewards</h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Top 100 fans unlock exclusive access to VVIP match tickets, private suites, and limited edition team gear.
              </p>
            </div>
            <div className="pt-md relative z-10">
              <button className="bg-[#00FF87] hover:bg-[#00e478] text-black font-label-caps text-label-caps font-black px-lg py-sm rounded-lg uppercase tracking-widest transition-all cursor-pointer">
                View VIP Portal
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-lg flex flex-col justify-between min-h-[200px] shadow-lg">
            <div className="space-y-xs">
              <span className="text-[10px] font-label-caps text-primary-container font-bold tracking-widest uppercase">Collection</span>
              <h3 className="font-headline-md text-headline-md text-on-background">Your Badges</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">7/20 Collected</p>
            </div>
            <div className="flex gap-md py-sm">
              {/* Badge 1: gold star */}
              <div className="w-12 h-12 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center text-[#ffd700]" title="Gold Star Badge">
                <span className="material-symbols-outlined">grade</span>
              </div>
              {/* Badge 2: green bolt */}
              <div className="w-12 h-12 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 flex items-center justify-center text-[#00FF87]" title="Green Bolt Badge">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              {/* Badge 3: locked */}
              <div className="w-12 h-12 rounded-full bg-surface-variant/40 border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40" title="Locked Badge">
                <span className="material-symbols-outlined">lock</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-lg flex flex-col justify-between min-h-[200px] shadow-lg">
            <div className="space-y-xs">
              <span className="text-[10px] font-label-caps text-secondary-fixed font-bold tracking-widest uppercase">Progress</span>
              <h3 className="font-headline-md text-headline-md text-on-background">Weekly Goal</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">+500 PTS to rank up</p>
            </div>
            <div className="space-y-xs w-full pt-md">
              <div className="flex justify-between text-[11px] font-label-caps text-on-surface-variant">
                <span>325 / 500 PTS</span>
                <span>65%</span>
              </div>
              <div className="w-full h-2 bg-surface-variant/55 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffd700] rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

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
          { href: '/', icon: 'home', label: 'Home', active: false },
          { href: '/matches', icon: 'sports_soccer', label: 'Matches', active: false },
          { href: '/predictions', icon: 'analytics', label: 'Predict', active: false },
          { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks', active: true },
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

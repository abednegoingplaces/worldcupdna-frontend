'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ═══════════════════ DATA ═══════════════════ */

const LIVE_MATCHES = [
  {
    id: 'live-1',
    minute: "75'",
    group: 'Group G',
    home: { code: 'BRA', color: 'bg-yellow-600', score: 2 },
    away: { code: 'GER', color: 'bg-gray-600', score: 1 },
  },
  {
    id: 'live-2',
    minute: "32'",
    group: 'Group A',
    home: { code: 'ARG', color: 'bg-sky-400', score: 1 },
    away: { code: 'MEX', color: 'bg-green-700', score: 0 },
  },
  {
    id: 'live-3',
    minute: "88'",
    group: 'Group D',
    home: { code: 'FRA', color: 'bg-blue-600', score: 3 },
    away: { code: 'ESP', color: 'bg-red-600', score: 3 },
  },
]

const GROUP_A_STANDINGS = [
  { team: 'USA', p: 3, w: 2, d: 1, l: 0, gd: '+4', pts: 7 },
  { team: 'CRO', p: 3, w: 1, d: 2, l: 0, gd: '+2', pts: 5 },
  { team: 'MAR', p: 3, w: 1, d: 0, l: 2, gd: '-1', pts: 3 },
  { team: 'KOR', p: 3, w: 0, d: 1, l: 2, gd: '-5', pts: 1 },
]

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F']

const GROUP_SUMMARIES: Record<string, string> = {
  A: 'USA | MAR | CRO | KOR',
  B: 'BRA | JPN | SEN | CAN',
  C: 'ENG | POL | MEX | QAT',
  D: 'FRA | ESP | AUS | TUN',
  E: 'GER | POR | URU | GHA',
  F: 'ARG | NED | IRN | USA2',
}

/* Bracket data */
const BRACKET_R32 = [
  { winner: 'BRA', loser: 'ITA', ws: 3, ls: 1, gold: true },
  { winner: 'GER', loser: 'KOR', ws: 2, ls: 0, gold: false },
  { winner: 'FRA', loser: 'POL', ws: 1, ls: 0, gold: true },
  { winner: 'ARG', loser: 'AUS', ws: 2, ls: 1, gold: false },
]
const BRACKET_R16 = [
  { winner: 'BRA', loser: 'JPN', ws: 2, ls: 0, gold: true },
  { winner: 'FRA', loser: 'USA', ws: 3, ls: 1, gold: true },
]
const BRACKET_QF = [
  { winner: 'BRA', loser: 'ENG', ws: 4, ls: 1, gold: true },
  { winner: 'FRA', loser: 'ARG', ws: 2, ls: 1, gold: true },
]
const BRACKET_SF = [
  { winner: 'BRA', loser: 'FRA', ws: 2, ls: 2, extra: '(pens)', gold: true },
  { winner: 'ESP', loser: 'GER', ws: 1, ls: 0, gold: true },
]

/* ═══════════════════ COMPONENT ═══════════════════ */

export default function MatchesPage() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ A: true })

  const toggleGroup = (g: string) => {
    setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }))
  }

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-on-background">

      {/* ═══ TopNavBar ═══ */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            <Link className="font-headline-md text-on-surface-variant hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link className="font-headline-md text-primary-container border-b-2 border-primary-container pb-1 font-bold" href="/matches">
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
              <input className="bg-transparent border-none focus:ring-0 text-body-md placeholder:text-on-surface-variant/50 w-32 outline-none text-on-surface" placeholder="Search matches..." type="text" />
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

      {/* ═══ Main Content ═══ */}
      <main className="pt-[88px] flex-grow">

        {/* ────── Section: Live Now ────── */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <div className="flex items-center gap-sm mb-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-widest">
              Live Now
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {LIVE_MATCHES.map((m) => (
              <div key={m.id} className="glass-card rounded-xl p-5 flex flex-col gap-md hover:border-primary-container/30 transition-all duration-300 group">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[11px] font-black font-label-caps tracking-wider">
                    {m.minute}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    {m.group}
                  </span>
                </div>

                {/* Center: teams + score */}
                <div className="flex items-center justify-between gap-sm">
                  {/* Home team */}
                  <div className="flex flex-col items-center gap-sm flex-1">
                    <div className={`w-16 h-12 rounded-lg ${m.home.color} shadow-lg group-hover:scale-105 transition-transform`} title={m.home.code} />
                    <span className="font-headline-md text-body-md font-bold text-on-background tracking-wider">{m.home.code}</span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center gap-xs px-2">
                    <span className="font-display-md text-headline-lg text-primary-container font-black italic tabular-nums">
                      {m.home.score} – {m.away.score}
                    </span>
                    <span className="font-label-caps text-[10px] text-secondary-fixed uppercase tracking-widest font-bold">
                      Live
                    </span>
                  </div>

                  {/* Away team */}
                  <div className="flex flex-col items-center gap-sm flex-1">
                    <div className={`w-16 h-12 rounded-lg ${m.away.color} shadow-lg group-hover:scale-105 transition-transform`} title={m.away.code} />
                    <span className="font-headline-md text-body-md font-bold text-on-background tracking-wider">{m.away.code}</span>
                  </div>
                </div>

                {/* Match Hub button */}
                <button className="w-full bg-white/5 border border-white/10 hover:bg-primary-container hover:text-background rounded-lg py-3 uppercase font-label-caps text-label-caps font-bold tracking-widest transition-all duration-300 text-on-surface cursor-pointer">
                  Match Hub
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ────── Section: Group Standings ────── */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-widest mb-lg">
            Group Standings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {GROUPS.map((g) => {
              const isOpen = !!openGroups[g]
              return (
                <div key={g} className="glass-card rounded-xl overflow-hidden transition-all duration-300">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleGroup(g)}
                    className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-md">
                      <span className="bg-primary-container/15 text-primary-container px-3 py-1 rounded-full text-[11px] font-black font-label-caps tracking-wider uppercase">
                        Group {g}
                      </span>
                      <span className="font-label-caps text-[11px] text-on-surface-variant tracking-wider hidden sm:inline">
                        {GROUP_SUMMARIES[g]}
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 pb-5">
                      {g === 'A' ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-white/10">
                                {['Team', 'P', 'W', 'D', 'L', 'GD', 'Pts'].map((h) => (
                                  <th
                                    key={h}
                                    className={`font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest pb-2 ${
                                      h === 'Team' ? 'text-left pr-4' : 'text-center px-2'
                                    }`}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {GROUP_A_STANDINGS.map((row, i) => {
                                const isFirst = i === 0
                                const gdPositive = row.gd.startsWith('+')
                                return (
                                  <tr
                                    key={row.team}
                                    className={`border-b border-white/5 last:border-b-0 transition-colors ${
                                      isFirst ? 'bg-[#ffd700]/5' : 'hover:bg-white/[0.02]'
                                    }`}
                                  >
                                    <td className="py-3 pr-4">
                                      <span className="font-headline-md text-body-md font-bold text-on-background tracking-wider">
                                        {row.team}
                                      </span>
                                    </td>
                                    <td className="text-center px-2 font-stats-number text-sm text-on-surface">{row.p}</td>
                                    <td className="text-center px-2 font-stats-number text-sm text-on-surface">{row.w}</td>
                                    <td className="text-center px-2 font-stats-number text-sm text-on-surface">{row.d}</td>
                                    <td className="text-center px-2 font-stats-number text-sm text-on-surface">{row.l}</td>
                                    <td className={`text-center px-2 font-stats-number text-sm font-bold ${gdPositive ? 'text-[#34ff8c]' : 'text-red-400'}`}>
                                      {row.gd}
                                    </td>
                                    <td className="text-center px-2 font-stats-number text-sm font-black text-primary-container">
                                      {row.pts}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="font-body-md text-body-md text-on-surface-variant italic">
                          Loading stats for Group {g}...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Collapsed hint for non-A groups */}
                  {!isOpen && g !== 'A' && (
                    <div className="px-5 pb-4 -mt-1">
                      <span className="font-body-md text-[13px] text-on-surface-variant/50 italic">
                        Tap to view standings
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ────── Section: Knockout Bracket ────── */}
        <section className="py-xl px-gutter max-w-container-max mx-auto">
          <h2 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-widest mb-lg">
            Knockout Bracket
          </h2>

          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[1100px] flex items-start gap-0">

              {/* ── Stage: Round of 32 ── */}
              <div className="flex flex-col items-center gap-md">
                <span className="font-label-caps text-[10px] text-[#605f5e] uppercase tracking-widest mb-sm">Round of 32</span>
                <div className="flex flex-col gap-md">
                  {BRACKET_R32.map((m, i) => (
                    <BracketCard key={`r32-${i}`} match={m} />
                  ))}
                </div>
              </div>

              {/* Connector */}
              <BracketConnector count={4} />

              {/* ── Stage: Round of 16 ── */}
              <div className="flex flex-col items-center gap-md">
                <span className="font-label-caps text-[10px] text-[#605f5e] uppercase tracking-widest mb-sm">Round of 16</span>
                <div className="flex flex-col gap-lg">
                  {BRACKET_R16.map((m, i) => (
                    <BracketCard key={`r16-${i}`} match={m} />
                  ))}
                </div>
              </div>

              {/* Connector */}
              <BracketConnector count={2} />

              {/* ── Stage: Quarter-Finals ── */}
              <div className="flex flex-col items-center gap-md">
                <span className="font-label-caps text-[10px] text-[#605f5e] uppercase tracking-widest mb-sm">Quarter-Finals</span>
                <div className="flex flex-col gap-lg">
                  {BRACKET_QF.map((m, i) => (
                    <BracketCard key={`qf-${i}`} match={m} />
                  ))}
                </div>
              </div>

              {/* Connector */}
              <BracketConnector count={2} />

              {/* ── Stage: Semi-Finals ── */}
              <div className="flex flex-col items-center gap-md">
                <span className="font-label-caps text-[10px] text-[#605f5e] uppercase tracking-widest mb-sm">Semi-Finals</span>
                <div className="flex flex-col gap-lg">
                  {BRACKET_SF.map((m, i) => (
                    <BracketCard key={`sf-${i}`} match={m} />
                  ))}
                </div>
              </div>

              {/* Connector */}
              <BracketConnector count={2} />

              {/* ── Stage: Final ── */}
              <div className="flex flex-col items-center gap-md">
                <span className="font-label-caps text-[10px] text-[#605f5e] uppercase tracking-widest mb-sm">Final</span>
                <div className="w-56 p-6 rounded-xl bg-[#201f1f] border-4 border-primary-container shadow-[0_0_30px_rgba(255,215,0,0.35)] flex flex-col items-center gap-md">
                  <span className="material-symbols-outlined text-primary-container text-[40px] animate-bounce">
                    emoji_events
                  </span>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-center gap-xs">
                      <span className="font-headline-md text-body-md font-bold text-[#fff6df]">BRA</span>
                      <span className="font-stats-number text-headline-md text-primary-container font-black">3</span>
                    </div>
                    <span className="font-display-md text-headline-md text-outline-variant select-none">–</span>
                    <div className="flex flex-col items-center gap-xs">
                      <span className="font-headline-md text-body-md text-[#d0c6ab]">ESP</span>
                      <span className="font-stats-number text-headline-md text-on-surface-variant font-black">1</span>
                    </div>
                  </div>
                  <span className="font-headline-md text-headline-md font-black text-secondary-fixed uppercase tracking-wider">
                    Brazil Win!
                  </span>
                  <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-widest">
                    Champion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
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

      {/* ═══ Mobile Bottom Nav ═══ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#131313]/95 backdrop-blur border-t border-white/10 flex items-center justify-around z-50">
        <Link href="/" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Home</span>
        </Link>
        <Link href="/matches" className="flex flex-col items-center gap-xs text-primary-container">
          <span className="material-symbols-outlined text-[22px]">sports_soccer</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Matches</span>
        </Link>
        <Link href="/predictions" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">analytics</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Predict</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">leaderboard</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Ranks</span>
        </Link>
        <Link href="/venues" className="flex flex-col items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[22px]">location_on</span>
          <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">Venues</span>
        </Link>
      </nav>
    </div>
  )
}

/* ═══════════════════ SUB-COMPONENTS ═══════════════════ */

function BracketCard({ match }: {
  match: { winner: string; loser: string; ws: number; ls: number; extra?: string; gold: boolean }
}) {
  return (
    <div
      className={`w-44 p-2 rounded-lg bg-[#201f1f] border-2 transition-all duration-300 ${
        match.gold
          ? 'border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
          : 'border-white/10'
      }`}
    >
      <div className="flex items-center justify-between py-1 px-1">
        <span className="font-headline-md text-[13px] font-bold text-[#fff6df] tracking-wider">{match.winner}</span>
        <span className="font-stats-number text-[13px] font-black text-primary-container">{match.ws}</span>
      </div>
      <div className="w-full h-px bg-white/10" />
      <div className="flex items-center justify-between py-1 px-1">
        <span className="font-headline-md text-[13px] text-[#d0c6ab] tracking-wider">{match.loser}</span>
        <span className="font-stats-number text-[13px] text-on-surface-variant">{match.ls}</span>
      </div>
      {match.extra && (
        <div className="text-center mt-1">
          <span className="font-label-caps text-[9px] text-on-surface-variant/60 uppercase tracking-wider">{match.extra}</span>
        </div>
      )}
    </div>
  )
}

function BracketConnector({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center justify-center self-center mx-2" style={{ minHeight: count > 2 ? 200 : 80 }}>
      {Array.from({ length: Math.ceil(count / 2) }).map((_, i) => (
        <div
          key={i}
          className="w-6 border-r-2 border-t-2 border-b-2 border-[#ffd700]/40 rounded-r-lg"
          style={{ height: count > 2 ? 48 : 40, marginBottom: i < Math.ceil(count / 2) - 1 ? 16 : 0 }}
        />
      ))}
    </div>
  )
}

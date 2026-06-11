'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SiteHeader, MobileNav } from '@/components/layout/SiteShell'
import { TeamCrest } from '@/components/ui'
import { nationGradient } from '@/lib/nationColors'
import { api } from '@/lib/api'
import { matchTime } from '@/lib/format'
import type { Match } from '@/types'

const FEATURED_PLAYERS = [
  { name: 'LIONEL MESSI', nation: 'ARGENTINA', role: 'Forward' },
  { name: 'KYLIAN MBAPPE', nation: 'FRANCE', role: 'Forward' },
  { name: 'VINICIUS JR', nation: 'BRAZIL', role: 'Winger' },
  { name: 'CHRISTIAN PULISIC', nation: 'USA', role: 'Midfielder' },
  { name: 'SON HEUNG-MIN', nation: 'SOUTH KOREA', role: 'Forward' },
  { name: 'MOHAMED SALAH', nation: 'EGYPT', role: 'Winger' },
]

const KICKOFF = new Date('2026-06-11T00:00:00')

export default function Home() {
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })
  const [live, setLive] = useState(false)

  useEffect(() => {
    const tick = () => {
      const diff = KICKOFF.getTime() - Date.now()
      if (diff <= 0) {
        setLive(true)
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
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
      <SiteHeader />

      <main className="pt-[72px]">
        {/* ─── Hero ─── */}
        <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0 z-0">
            <img alt="World Cup Stadium Energy" className="w-full h-full object-cover" src="/images/heroes/hero-stadium.jpg" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent h-[200px]" />
          </div>

          <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter py-xl">
            <div className="max-w-2xl space-y-lg animate-fade-in-up">
              {/* Status badge */}
              <div className="inline-flex items-center gap-sm bg-secondary-container/8 border border-secondary-container/20 px-md py-xs rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed" />
                </span>
                <span className="font-label-caps text-label-caps text-secondary-fixed">
                  {live ? 'TOURNAMENT LIVE' : '2026 ROADMAP LIVE'}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display-lg text-display-lg text-on-background leading-[1.05]">
                {"What's Your"} <br />
                <span className="bg-gradient-to-r from-primary-container to-secondary-fixed bg-clip-text text-transparent">
                  Football DNA?
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Build your fan profile. Predict match scores. Climb the global leaderboard.
                Join the world&apos;s biggest football community for World Cup 2026.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-md pt-sm">
                <Link
                  href="/profile/build"
                  className="bg-primary-container text-on-primary-fixed px-lg py-md rounded-xl font-headline-md text-headline-md font-extrabold glow-gold transition-all duration-300 active:scale-95 text-center shadow-[0_4px_24px_rgba(233,196,0,0.2)]"
                >
                  Build My DNA
                </Link>
                <Link
                  href="/matches"
                  className="glass-card text-on-background px-lg py-md rounded-xl font-headline-md text-headline-md font-bold hover:bg-white/8 transition-all duration-300 text-center flex items-center gap-sm"
                >
                  <span className="material-symbols-outlined text-secondary-fixed">play_circle</span>
                  Watch Live
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-lg pt-sm">
                <QuickStat value="48" label="Teams" />
                <div className="w-px h-8 bg-outline-variant/30" />
                <QuickStat value="104" label="Matches" />
                <div className="w-px h-8 bg-outline-variant/30" />
                <QuickStat value="3" label="Host Nations" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Live / Today strip ─── */}
        <LiveStrip />

        {/* ─── Feature Cards ─── */}
        <section className="py-xl">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex items-end justify-between mb-lg">
              <div>
                <h2 className="font-display-md text-display-md text-on-background font-black uppercase tracking-tight">
                  Your <span className="text-primary-container">Toolkit</span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
                  Everything you need for the ultimate World Cup experience
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <FeatureCard
                href="/profile/build"
                icon="dns"
                title="Fan DNA Profile"
                body="Create your unique fan identity. Track stats across every tournament and earn legendary badges."
                cta="Explore Genome"
                accent="gold"
                delay={1}
              />
              <FeatureCard
                href="/predictions"
                icon="sports_soccer"
                title="Match Predictions"
                body="Put your football IQ to the test. Predict outcomes and exact scores to climb the global ranks."
                cta="Make Picks"
                accent="green"
                delay={2}
              />
              <FeatureCard
                href="/venues"
                icon="location_on"
                title="Watch Party Finder"
                body="Join the roar of the crowd. Find official fan zones and local watch parties in every host city."
                cta="Find a Zone"
                accent="gold"
                delay={3}
              />
            </div>
          </div>
        </section>

        {/* ─── Star Players ─── */}
        <section className="py-xl bg-surface-container-lowest/50">
          <div className="max-w-container-max mx-auto px-gutter space-y-lg">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
              <div className="space-y-xs">
                <h2 className="font-display-md text-display-md text-on-background font-black uppercase tracking-tight">
                  Star <span className="text-primary-container">Players</span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">The faces of World Cup 2026</p>
              </div>
              <Link
                href="/profile/build"
                className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-primary-container hover:underline flex items-center gap-xs"
              >
                Pick Your Nation <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md">
              {FEATURED_PLAYERS.map((player, idx) => (
                <div
                  key={player.name}
                  className="glass-card overflow-hidden group hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div
                    className="h-24 w-full relative"
                    style={{ background: nationGradient(player.nation) }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-sm space-y-xs">
                    <p className="font-headline-md text-[13px] font-black uppercase tracking-tight text-on-background truncate">
                      {player.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-[9px] text-on-surface-variant uppercase truncate">{player.nation}</span>
                      <span className="font-label-caps text-[9px] text-primary-container/70">{player.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Countdown / CTA ─── */}
        <section className="relative py-xl overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border-r border-on-background/30" />
              ))}
            </div>
          </div>
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto px-gutter text-center space-y-lg">
            <div className="space-y-sm">
              <h2 className="font-display-md text-display-md text-on-background font-black">
                {live ? (
                  <>The tournament is <span className="text-secondary-fixed">LIVE</span></>
                ) : (
                  <>Tournament kicks off <span className="text-primary-container">June 11</span></>
                )}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
                {live ? 'Catch every match as it happens.' : 'The 2026 World Cup awaits. Are you ready?'}
              </p>
            </div>
            {!live && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg max-w-2xl mx-auto">
                {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                  <div key={unit} className="flex flex-col items-center gap-xs">
                    <div className="glass-card px-lg py-md rounded-2xl w-full">
                      <span className="font-display-lg text-display-md text-on-background font-black tabular-nums block text-center">
                        {countdown[unit]}
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">{unit}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-md">
              <Link
                href="/matches"
                className="inline-flex items-center gap-sm bg-primary-container text-on-primary-fixed px-lg py-md rounded-xl font-label-caps text-label-caps font-black tracking-widest uppercase hover:shadow-[0_0_30px_rgba(233,196,0,0.4)] transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                {live ? "See Today's Matches" : 'View Full Schedule'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="w-full py-xl bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-center gap-lg">
            <div className="flex flex-col items-center md:items-start gap-xs">
              <span className="font-headline-md text-headline-md text-primary-container font-black">WorldCupDNA</span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                © 2026 WorldCupDNA. All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-md">
              <Link className="font-body-md text-[13px] text-on-surface-variant hover:text-secondary-fixed transition-colors" href="#">Terms of Service</Link>
              <Link className="font-body-md text-[13px] text-on-surface-variant hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</Link>
              <Link className="font-body-md text-[13px] text-on-surface-variant hover:text-secondary-fixed transition-colors" href="#">Fan Support</Link>
              <Link className="font-body-md text-[13px] text-on-surface-variant hover:text-secondary-fixed transition-colors" href="https://www.fifa.com" target="_blank" rel="noopener noreferrer">Official FIFA Site</Link>
            </div>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  )
}

/* ─── Sub-components ────────────────────────────────────────────── */

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-stats-number text-stats-number text-primary-container font-black tabular-nums">{value}</span>
      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">{label}</span>
    </div>
  )
}

function FeatureCard({
  href,
  icon,
  title,
  body,
  cta,
  accent,
  delay,
}: {
  href: string
  icon: string
  title: string
  body: string
  cta: string
  accent: 'gold' | 'green'
  delay: number
}) {
  const glowClass = accent === 'gold' ? 'glow-gold' : 'glow-green'
  return (
    <Link
      href={href}
      className={`glass-card group p-lg rounded-2xl flex flex-col gap-md transition-all duration-500 hover:-translate-y-2 ${glowClass} animate-fade-in-up-delay-${delay}`}
    >
      <div className="w-14 h-14 rounded-xl bg-primary-container/8 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:bg-primary-container/15 transition-colors">
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <h3 className="font-headline-lg text-headline-lg text-on-background">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed flex-1">{body}</p>
      <div className="mt-auto pt-sm flex items-center text-primary-container font-bold font-label-caps text-label-caps uppercase gap-xs group-hover:gap-sm transition-all">
        {cta}
        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
      </div>
    </Link>
  )
}

/** Pulls live/today fixtures from the backend; renders nothing if there's
 *  no data or the API is unreachable, so the homepage degrades gracefully. */
function LiveStrip() {
  const [matches, setMatches] = useState<Match[]>([])
  const [anyLive, setAnyLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const liveRes = await api.live()
        let list = liveRes?.matches ?? []
        let isLive = list.length > 0
        if (list.length === 0) {
          const today = await api.today()
          list = today?.matches ?? []
          isLive = false
        }
        if (!cancelled) {
          setMatches(list.slice(0, 8))
          setAnyLive(isLive)
        }
      } catch {
        /* ignore — strip stays hidden */
      }
    }
    load()
    const id = setInterval(load, 60000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  if (matches.length === 0) return null

  return (
    <section className="border-y border-outline-variant/15 bg-surface-container-low/30">
      <div className="max-w-container-max mx-auto px-gutter py-md">
        <div className="flex items-center gap-sm mb-sm">
          <span className={anyLive ? 'badge-live' : 'badge-scheduled'}>{anyLive ? 'Live now' : 'Today'}</span>
          <Link href="/matches" className="ml-auto font-label-caps text-[11px] text-primary-container uppercase hover:underline flex items-center gap-xs">
            All matches <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
        <div className="flex gap-md overflow-x-auto no-scrollbar pb-1">
          {matches.map((m) => {
            const showScore = m.status === 'live' || m.status === 'finished'
            return (
              <Link
                key={m.id}
                href="/matches"
                className="shrink-0 glass-card rounded-xl p-md flex flex-col gap-sm min-w-[280px] hover:bg-white/[0.04] transition-colors"
              >
                {/* Home Team */}
                <div className="flex items-center justify-between gap-md">
                  <div className="flex items-center gap-sm min-w-0">
                    <TeamCrest name={m.home_team} crest={m.home_team_crest} size={22} />
                    <span className="font-headline-md text-[14px] font-bold text-on-background truncate">{m.home_team}</span>
                  </div>
                  <span className="font-stats-number text-[14px] text-on-background font-black tabular-nums">
                    {showScore ? (m.home_score ?? 0) : ''}
                  </span>
                </div>
                {/* Away Team */}
                <div className="flex items-center justify-between gap-md">
                  <div className="flex items-center gap-sm min-w-0">
                    <TeamCrest name={m.away_team} crest={m.away_team_crest} size={22} />
                    <span className="font-headline-md text-[14px] font-bold text-on-background truncate">{m.away_team}</span>
                  </div>
                  <span className="font-stats-number text-[14px] text-on-background font-black tabular-nums">
                    {showScore ? (m.away_score ?? 0) : ''}
                  </span>
                </div>
                {/* Status/Time Footer */}
                <div className="flex justify-between items-center font-label-caps text-[9px] text-on-surface-variant uppercase border-t border-outline-variant/10 pt-xs mt-xs">
                  <span>{m.status === 'live' ? 'LIVE' : m.group_name || m.stage || ''}</span>
                  <span className="text-secondary-fixed font-bold">{showScore ? '' : matchTime(m.match_date)}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


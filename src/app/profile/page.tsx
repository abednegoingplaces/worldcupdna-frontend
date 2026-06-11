'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SiteShell } from '@/components/layout/SiteShell'
import { TeamCrest } from '@/components/ui'
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { nationGradient } from '@/lib/nationColors'
import { matchDay, matchTime } from '@/lib/format'
import type { Match } from '@/types'

function teamMatches(matches: Match[], team: string): Match[] {
  const t = team.trim().toLowerCase()
  return matches.filter(
    (m) => m.home_team.toLowerCase() === t || m.away_team.toLowerCase() === t
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth()

  const [rank, setRank] = useState<number | null>(null)
  const [fixtures, setFixtures] = useState<Match[]>([])
  const [loadingMatches, setLoadingMatches] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/auth?next=/profile')
  }, [authLoading, isAuthenticated, router])

  const loadExtras = useCallback(async () => {
    setLoadingMatches(true)
    try {
      const [board, upcoming] = await Promise.all([api.leaderboard(100), api.matches()])
      setRank(board.me?.rank ?? null)
      if (user?.favorite_team) {
        setFixtures(teamMatches(upcoming.matches, user.favorite_team).slice(0, 8))
      } else {
        setFixtures([])
      }
    } catch {
      // non-fatal — profile still renders
    } finally {
      setLoadingMatches(false)
    }
  }, [user?.favorite_team])

  useEffect(() => {
    if (isAuthenticated) loadExtras()
  }, [isAuthenticated, loadExtras])

  if (authLoading || !user) {
    return (
      <SiteShell>
        <div className="flex justify-center items-center py-xl">
          <span className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin" />
        </div>
      </SiteShell>
    )
  }

  const team = user.favorite_team || ''

  return (
    <SiteShell>
      {/* DNA hero */}
      <section className="relative overflow-hidden border-b border-outline-variant/20">
        <div className="absolute inset-0 opacity-40" style={{ background: nationGradient(team) }} />
        <div className="relative px-gutter max-w-container-max mx-auto py-xl">
          <div className="flex flex-col md:flex-row md:items-center gap-lg">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center font-black text-3xl text-on-background uppercase border-2 border-primary-container/50 shrink-0"
              style={{ background: nationGradient(team) }}
            >
              {user.username.slice(0, 2)}
            </div>
            <div className="space-y-xs min-w-0">
              <div className="inline-flex items-center gap-sm bg-primary-container/10 border border-primary-container/20 px-md py-xs rounded-full text-primary-container font-label-caps text-xs tracking-widest uppercase">
                Football DNA
              </div>
              <h1 className="font-display-lg text-display-md text-on-background tracking-tight leading-none uppercase">
                {user.username}
              </h1>
              <p className="font-headline-md text-headline-md text-on-surface-variant">
                {team ? team : 'No nation picked yet'}
                {user.tactical_style && (
                  <span className="text-on-surface"> · {user.tactical_style}</span>
                )}
              </p>
            </div>
            <div className="md:ml-auto flex gap-md">
              <Link
                href="/profile/build"
                className="bg-transparent text-primary-container border border-primary-container px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-container hover:text-black transition-all font-montserrat"
              >
                Edit DNA
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                className="bg-transparent text-on-surface-variant border border-outline-variant/40 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:text-on-surface transition-all font-montserrat"
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-lg">
            <StatTile label="Total Points" value={user.total_points.toLocaleString()} icon="stars" />
            <StatTile label="Global Rank" value={rank ? `#${rank}` : '—'} icon="leaderboard" />
            <StatTile
              label="Rivalry"
              value={user.rivalry_level != null ? `${user.rivalry_level}%` : '—'}
              icon="local_fire_department"
            />
            <StatTile
              label="Verified"
              value={user.is_verified ? 'Yes' : 'No'}
              icon={user.is_verified ? 'verified' : 'pending'}
            />
          </div>
        </div>
      </section>

      {/* Favorite team fixtures */}
      <section className="px-gutter max-w-container-max mx-auto py-lg space-y-md">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
          <h2 className="font-display-md text-headline-lg font-black tracking-tight text-white uppercase flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              stadium
            </span>
            {team ? `${team} Fixtures` : 'Your Fixtures'}
          </h2>
          <Link href="/matches" className="font-label-caps text-xs text-primary-container uppercase hover:underline">
            All matches →
          </Link>
        </div>

        {loadingMatches ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl h-24 animate-pulse" />
            ))}
          </div>
        ) : !team ? (
          <div className="glass-card rounded-2xl p-xl text-center space-y-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-[40px]">flag</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pick your nation to see their road through the tournament.
            </p>
            <Link href="/profile/build" className="filter-chip filter-chip-active inline-block">
              Build my DNA
            </Link>
          </div>
        ) : fixtures.length === 0 ? (
          <div className="glass-card rounded-2xl p-xl text-center text-on-surface-variant font-body-md">
            No scheduled fixtures for {team} right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {fixtures.map((m) => {
              const finished = m.status === 'finished'
              return (
                <div key={m.id} className="glass-card rounded-2xl p-md flex items-center justify-between gap-sm">
                  <div className="flex items-center gap-sm min-w-0 flex-1">
                    <TeamCrest name={m.home_team} crest={m.home_team_crest} size={28} />
                    <span className="font-body-md text-body-md text-on-background truncate">{m.home_team}</span>
                  </div>
                  <div className="text-center shrink-0 px-sm">
                    {finished || m.status === 'live' ? (
                      <span className="font-stats-number text-stats-number text-on-background tabular-nums">
                        {m.home_score ?? 0}–{m.away_score ?? 0}
                      </span>
                    ) : (
                      <span className="font-label-caps text-[11px] text-on-surface-variant">
                        {matchTime(m.match_date)}
                      </span>
                    )}
                    <p className="font-label-caps text-[9px] text-on-surface-variant uppercase mt-0.5">
                      {matchDay(m.match_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-sm min-w-0 flex-1 flex-row-reverse text-right">
                    <TeamCrest name={m.away_team} crest={m.away_team_crest} size={28} />
                    <span className="font-body-md text-body-md text-on-background truncate">{m.away_team}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </SiteShell>
  )
}

function StatTile({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="glass-card rounded-xl p-md flex items-center gap-md">
      <span className="gold-icon-box shrink-0">
        <span className="material-symbols-outlined">{icon}</span>
      </span>
      <div className="min-w-0">
        <p className="font-stats-number text-stats-number text-on-background tabular-nums truncate">{value}</p>
        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider truncate">
          {label}
        </p>
      </div>
    </div>
  )
}

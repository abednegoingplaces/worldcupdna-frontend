'use client'

import { useCallback, useEffect, useState } from 'react'
import { SiteShell } from '@/components/layout/SiteShell'
import { TeamCrest } from '@/components/ui'
import { api, ApiError } from '@/lib/api'
import { matchDay, matchTime } from '@/lib/format'
import type { GroupStanding, Match } from '@/types'

const TABS = ['Live', 'Today', 'Upcoming', 'Results', 'Standings', 'Bracket'] as const
type Tab = (typeof TABS)[number]

const TAB_ICONS: Record<Tab, string> = {
  Live: 'stream',
  Today: 'today',
  Upcoming: 'calendar_month',
  Results: 'scoreboard',
  Standings: 'format_list_numbered',
  Bracket: 'account_tree',
}

const KNOCKOUT_ORDER: { code: string; label: string }[] = [
  { code: 'LAST_32', label: 'Round of 32' },
  { code: 'LAST_16', label: 'Round of 16' },
  { code: 'QUARTER_FINALS', label: 'Quarter-finals' },
  { code: 'SEMI_FINALS', label: 'Semi-finals' },
  { code: 'THIRD_PLACE', label: 'Third place' },
  { code: 'FINAL', label: 'Final' },
]

function stageMatches(matches: Match[], code: string): Match[] {
  return matches.filter((m) => (m.stage || '').toUpperCase().replace(/\s|-/g, '_') === code)
}

export default function MatchesPage() {
  const [tab, setTab] = useState<Tab>('Live')

  return (
    <SiteShell>
      <div className="max-w-container-max mx-auto px-gutter pt-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="font-display-md text-display-md text-on-background font-black uppercase tracking-tight">
              Live <span className="text-primary-container">Match Hub</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
              Scores, group standings and the road to the final — World Cup 2026.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-1 border-b border-outline-variant/15">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-xs whitespace-nowrap px-md py-sm rounded-t-lg transition-all ${
                tab === t
                  ? 'bg-primary-container/10 text-primary-container border-b-2 border-primary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.03]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{TAB_ICONS[t]}</span>
              <span className="font-headline-md text-[14px]">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-gutter py-lg">
        {tab === 'Live' && <MatchFeed loader={() => api.live()} empty="No matches are live right now. Check back during game time!" live />}
        {tab === 'Today' && <MatchFeed loader={() => api.today()} empty="No matches scheduled for today." />}
        {tab === 'Upcoming' && <MatchFeed loader={() => api.upcoming(24)} empty="No upcoming fixtures yet." />}
        {tab === 'Results' && <MatchFeed loader={() => api.recent(7)} empty="No recent results yet." />}
        {tab === 'Standings' && <Standings />}
        {tab === 'Bracket' && <Bracket />}
      </div>
    </SiteShell>
  )
}

// ── Match feed (live/today/upcoming/results) ──────────────────────────
function MatchFeed({
  loader,
  empty,
  live = false,
}: {
  loader: () => Promise<{ matches: Match[]; total: number }>
  empty: string
  live?: boolean
}) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await loader()
      setMatches(res?.matches ?? [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load matches.')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    load()
    if (live) {
      const id = setInterval(load, 60000) // refresh live scores every minute
      return () => clearInterval(id)
    }
  }, [load, live])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl h-32 animate-pulse" />
        ))}
      </div>
    )
  }
  if (error) {
    return (
      <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/25">
        <span className="material-symbols-outlined">error</span>
        <span className="font-body-md flex-1">{error}</span>
        <button onClick={load} className="filter-chip">Retry</button>
      </div>
    )
  }
  if (matches.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-xl text-center max-w-lg mx-auto space-y-md">
        <div className="w-16 h-16 rounded-2xl bg-primary-container/8 border border-primary-container/15 flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary-container text-[32px]">sports_soccer</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">{empty}</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      {matches.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  )
}

function MatchCard({ match: m }: { match: Match }) {
  const isLive = m.status === 'live'
  const isFinished = m.status === 'finished'
  const showScore = isLive || isFinished

  return (
    <div className="glass-card rounded-2xl p-md space-y-sm hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center justify-between">
        <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider truncate">
          {m.group_name || m.stage || 'World Cup 2026'}
        </span>
        {isLive ? (
          <span className="badge-live flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-secondary-fixed rounded-full pulse-live" />
            Live
          </span>
        ) : isFinished ? (
          <span className="font-label-caps text-[11px] text-on-surface-variant uppercase">FT</span>
        ) : (
          <span className="badge-scheduled">{matchTime(m.match_date)}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-sm">
        <TeamRow name={m.home_team} crest={m.home_team_crest} />
        <div className="flex items-center gap-sm shrink-0 px-sm">
          {showScore ? (
            <span className="font-stats-number text-stats-number text-on-background tabular-nums">
              {m.home_score ?? 0}
            </span>
          ) : (
            <span className="font-label-caps text-on-surface-variant">vs</span>
          )}
          {showScore && <span className="text-on-surface-variant">–</span>}
          {showScore && (
            <span className="font-stats-number text-stats-number text-on-background tabular-nums">
              {m.away_score ?? 0}
            </span>
          )}
        </div>
        <TeamRow name={m.away_team} crest={m.away_team_crest} alignRight />
      </div>

      <div className="flex items-center justify-between font-label-caps text-[10px] text-on-surface-variant uppercase">
        <span className="truncate">{m.venue || ''}</span>
        <span>{matchDay(m.match_date)}</span>
      </div>
    </div>
  )
}

function TeamRow({
  name,
  crest,
  alignRight = false,
}: {
  name: string
  crest?: string | null
  alignRight?: boolean
}) {
  return (
    <div className={`flex items-center gap-sm min-w-0 flex-1 ${alignRight ? 'flex-row-reverse text-right' : ''}`}>
      <TeamCrest name={name} crest={crest} size={32} />
      <span className="font-headline-md text-[15px] font-bold text-on-background truncate">{name}</span>
    </div>
  )
}

// ── Standings ─────────────────────────────────────────────────────────
function Standings() {
  const [groups, setGroups] = useState<GroupStanding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setGroups(await api.standings())
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Live standings are temporarily unavailable.'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" />
        ))}
      </div>
    )
  }
  if (error) {
    return (
      <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/25">
        <span className="material-symbols-outlined">error</span>
        <span className="font-body-md flex-1">{error}</span>
        <button onClick={load} className="filter-chip">Retry</button>
      </div>
    )
  }
  if (groups.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-xl text-center text-on-surface-variant font-body-md">
        Standings will appear once the group stage begins.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
      {groups.map((g) => (
        <div key={g.group || Math.random()} className="glass-card rounded-2xl overflow-hidden">
          <div className="px-md py-sm bg-primary-container/5 border-b border-outline-variant/15">
            <h3 className="font-display-md text-headline-md font-black uppercase text-primary-container">
              {g.group || 'Group'}
            </h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                <th className="py-2.5 pl-md pr-2 font-bold">#</th>
                <th className="py-2.5 px-2 font-bold">Team</th>
                <th className="py-2.5 px-2 text-center font-bold">P</th>
                <th className="py-2.5 px-2 text-center font-bold hidden sm:table-cell">W</th>
                <th className="py-2.5 px-2 text-center font-bold hidden sm:table-cell">D</th>
                <th className="py-2.5 px-2 text-center font-bold hidden sm:table-cell">L</th>
                <th className="py-2.5 px-2 text-center font-bold">GD</th>
                <th className="py-2.5 px-2 pr-md text-center font-bold text-primary-container">Pts</th>
              </tr>
            </thead>
            <tbody>
              {g.table.map((r) => (
                <tr
                  key={r.team}
                  className={`border-t border-outline-variant/8 ${
                    r.position <= 2 ? 'bg-secondary-fixed/[0.03]' : ''
                  }`}
                >
                  <td className="py-2.5 pl-md pr-2 font-stats-number text-body-md tabular-nums text-on-surface-variant">
                    {r.position}
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-sm min-w-0">
                      <TeamCrest name={r.team} crest={r.crest} size={22} />
                      <span className="font-body-md text-[14px] text-on-background truncate">{r.team}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-center font-body-md text-on-surface-variant tabular-nums">{r.played}</td>
                  <td className="py-2.5 px-2 text-center font-body-md text-on-surface-variant tabular-nums hidden sm:table-cell">{r.won}</td>
                  <td className="py-2.5 px-2 text-center font-body-md text-on-surface-variant tabular-nums hidden sm:table-cell">{r.draw}</td>
                  <td className="py-2.5 px-2 text-center font-body-md text-on-surface-variant tabular-nums hidden sm:table-cell">{r.lost}</td>
                  <td className="py-2.5 px-2 text-center font-body-md text-on-surface-variant tabular-nums">
                    {r.goal_difference > 0 ? `+${r.goal_difference}` : r.goal_difference}
                  </td>
                  <td className="py-2.5 px-2 pr-md text-center font-stats-number text-body-md font-black text-primary-container tabular-nums">
                    {r.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

// ── Knockout bracket ──────────────────────────────────────────────────
function Bracket() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.matches()
      setMatches(res?.matches ?? [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load the bracket.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return <div className="glass-card rounded-2xl h-96 animate-pulse" />
  }
  if (error) {
    return (
      <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/25">
        <span className="material-symbols-outlined">error</span>
        <span className="font-body-md flex-1">{error}</span>
        <button onClick={load} className="filter-chip">Retry</button>
      </div>
    )
  }

  const rounds = KNOCKOUT_ORDER.map((r) => ({ ...r, fixtures: stageMatches(matches, r.code) })).filter(
    (r) => r.fixtures.length > 0
  )

  if (rounds.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-xl text-center space-y-md max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary-container/8 border border-primary-container/15 flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary-container text-[32px]">account_tree</span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          The knockout bracket unlocks once the group stage is complete.
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-lg overflow-x-auto no-scrollbar pb-md">
      {rounds.map((round) => (
        <div key={round.code} className="min-w-[260px] flex flex-col gap-md">
          <h3 className="font-display-md text-headline-md font-black uppercase text-primary-container sticky top-0">
            {round.label}
          </h3>
          <div className="flex flex-col gap-md justify-around flex-1">
            {round.fixtures.map((m) => (
              <BracketCard key={m.id} match={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BracketCard({ match: m }: { match: Match }) {
  const finished = m.status === 'finished'
  const homeWon = finished && (m.home_score ?? 0) > (m.away_score ?? 0)
  const awayWon = finished && (m.away_score ?? 0) > (m.home_score ?? 0)
  return (
    <div className="glass-card rounded-xl p-sm space-y-1">
      <BracketTeam name={m.home_team} crest={m.home_team_crest} score={m.home_score} won={homeWon} dim={awayWon} />
      <div className="border-t border-outline-variant/8" />
      <BracketTeam name={m.away_team} crest={m.away_team_crest} score={m.away_score} won={awayWon} dim={homeWon} />
      <p className="font-label-caps text-[9px] text-on-surface-variant uppercase pt-1">
        {finished ? 'Full time' : matchDay(m.match_date)}
      </p>
    </div>
  )
}

function BracketTeam({
  name,
  crest,
  score,
  won,
  dim,
}: {
  name: string
  crest?: string | null
  score?: number | null
  won: boolean
  dim: boolean
}) {
  return (
    <div className={`flex items-center justify-between gap-sm ${dim ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-sm min-w-0">
        <TeamCrest name={name} crest={crest} size={20} />
        <span
          className={`font-body-md text-[14px] truncate ${won ? 'text-primary-container font-bold' : 'text-on-background'}`}
        >
          {name}
        </span>
      </div>
      {score != null && (
        <span className="font-stats-number text-body-md tabular-nums text-on-background">{score}</span>
      )}
    </div>
  )
}

'use client'

// Deep Stats — StatsBomb xG explorer. football-data.org's free tier has no
// expected-goals data, so this surface is powered by the backend's StatsBomb
// integration (/api/v1/stats/*). Coverage is historical (past tournaments)
// unless a paid StatsBomb subscription is configured server-side.

import { useCallback, useEffect, useMemo, useState } from 'react'
import { SiteShell } from '@/components/layout/SiteShell'
import { api, ApiError } from '@/lib/api'
import type { Shot, StatsCompetition, StatsMatch, StatsSource } from '@/types'

export default function StatsPage() {
  const [source, setSource] = useState<StatsSource | null>(null)
  const [competitions, setCompetitions] = useState<StatsCompetition[]>([])
  const [compKey, setCompKey] = useState('') // `${competition_id}:${season_id}`
  const [matches, setMatches] = useState<StatsMatch[]>([])
  const [matchId, setMatchId] = useState('')
  const [shots, setShots] = useState<Shot[]>([])

  const [loadingComps, setLoadingComps] = useState(true)
  const [loadingMatches, setLoadingMatches] = useState(false)
  const [loadingShots, setLoadingShots] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Bootstrap: data source + competitions list.
  const loadComps = useCallback(async () => {
    setLoadingComps(true)
    setError(null)
    try {
      const [src, comps] = await Promise.all([api.statsSource(), api.statsCompetitions()])
      setSource(src)
      setCompetitions(comps)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load competitions.')
    } finally {
      setLoadingComps(false)
    }
  }, [])

  useEffect(() => {
    loadComps()
  }, [loadComps])

  // When a competition+season is chosen, load its matches.
  useEffect(() => {
    if (!compKey) return
    const [cid, sid] = compKey.split(':').map(Number)
    setLoadingMatches(true)
    setMatches([])
    setMatchId('')
    setShots([])
    api
      .statsMatches(cid, sid)
      .then(setMatches)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Could not load matches.')
      )
      .finally(() => setLoadingMatches(false))
  }, [compKey])

  // When a match is chosen, load its shots.
  useEffect(() => {
    if (!matchId) return
    setLoadingShots(true)
    setShots([])
    api
      .statsShots(Number(matchId))
      .then(setShots)
      .catch((err) =>
        setError(err instanceof ApiError ? err.message : 'Could not load shot data.')
      )
      .finally(() => setLoadingShots(false))
  }, [matchId])

  const selectedMatch = matches.find((m) => String(m.match_id) === matchId)

  // Team xG totals derived from the shot stream.
  const teams = useMemo(() => {
    const totals: Record<string, { xg: number; shots: number; goals: number }> = {}
    for (const s of shots) {
      const t = s.team || 'Unknown'
      totals[t] ??= { xg: 0, shots: 0, goals: 0 }
      totals[t].xg += s.xg ?? 0
      totals[t].shots += 1
      if ((s.outcome || '').toLowerCase() === 'goal') totals[t].goals += 1
    }
    return Object.entries(totals).map(([name, v]) => ({ name, ...v }))
  }, [shots])

  const teamColors = useMemo(() => {
    const palette = ['#e9c400', '#00ff87']
    const map: Record<string, string> = {}
    teams.forEach((t, i) => (map[t.name] = palette[i % palette.length]))
    return map
  }, [teams])

  return (
    <SiteShell>
      <div className="px-gutter max-w-container-max mx-auto pt-lg space-y-md">
        <div>
          <h1 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-tight">
            Deep Stats — xG Explorer
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
            Shot maps and expected goals, powered by StatsBomb.
          </p>
        </div>

        {source && (
          <div className="inline-flex items-center gap-sm glass-card rounded-full px-md py-xs">
            <span className={source.tier === 'paid' ? 'badge-live' : 'badge-scheduled'}>
              {source.tier === 'paid' ? 'Live data' : 'Historical'}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">{source.note}</span>
          </div>
        )}
      </div>

      <div className="px-gutter max-w-container-max mx-auto py-lg space-y-lg">
        {error && (
          <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/30">
            <span className="material-symbols-outlined">error</span>
            <span className="font-body-md">{error}</span>
            <button onClick={loadComps} className="ml-auto filter-chip">Retry</button>
          </div>
        )}

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
              Competition &amp; season
            </label>
            <select
              value={compKey}
              onChange={(e) => setCompKey(e.target.value)}
              disabled={loadingComps}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container transition-all font-body-md"
            >
              <option value="">{loadingComps ? 'Loading…' : 'Select a competition'}</option>
              {competitions.map((c) => (
                <option key={`${c.competition_id}:${c.season_id}`} value={`${c.competition_id}:${c.season_id}`}>
                  {[c.competition_name, c.season_name].filter(Boolean).join(' · ')}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-xs">
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
              Match
            </label>
            <select
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              disabled={!compKey || loadingMatches}
              className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container transition-all font-body-md disabled:opacity-50"
            >
              <option value="">
                {!compKey ? 'Pick a competition first' : loadingMatches ? 'Loading…' : 'Select a match'}
              </option>
              {matches.map((m) => (
                <option key={m.match_id} value={m.match_id}>
                  {m.home_team} {m.home_score ?? '-'}–{m.away_score ?? '-'} {m.away_team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        {loadingShots ? (
          <div className="glass-card rounded-2xl h-96 animate-pulse" />
        ) : matchId && shots.length === 0 ? (
          <div className="glass-card rounded-2xl p-xl text-center text-on-surface-variant font-body-md">
            No shot data available for this match.
          </div>
        ) : shots.length > 0 ? (
          <div className="space-y-lg">
            {/* Team xG summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              {teams.map((t) => (
                <div key={t.name} className="glass-card rounded-2xl p-md flex items-center justify-between">
                  <div className="flex items-center gap-sm min-w-0">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: teamColors[t.name] }} />
                    <span className="font-headline-md text-body-md font-bold text-on-background truncate">{t.name}</span>
                  </div>
                  <div className="flex items-center gap-md shrink-0 text-right">
                    <Stat label="xG" value={t.xg.toFixed(2)} />
                    <Stat label="Shots" value={String(t.shots)} />
                    <Stat label="Goals" value={String(t.goals)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Shot map */}
            <div className="glass-card rounded-2xl p-md">
              <div className="flex items-center justify-between mb-md">
                <h3 className="font-display-md text-headline-md font-black uppercase text-primary-container">Shot Map</h3>
                {selectedMatch && (
                  <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                    {selectedMatch.competition_stage || ''}
                  </span>
                )}
              </div>
              <ShotMap shots={shots} teamColors={teamColors} />
              <div className="flex flex-wrap items-center gap-md mt-md font-label-caps text-[10px] text-on-surface-variant uppercase">
                {teams.map((t) => (
                  <span key={t.name} className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: teamColors[t.name] }} />
                    {t.name}
                  </span>
                ))}
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-on-surface" /> Goal
                </span>
                <span>Circle size = xG</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-xl text-center space-y-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-[48px]">scatter_plot</span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pick a competition and match to see its xG shot map.
            </p>
          </div>
        )}
      </div>
    </SiteShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-stats-number text-stats-number text-on-background tabular-nums">{value}</p>
      <p className="font-label-caps text-[9px] text-on-surface-variant uppercase">{label}</p>
    </div>
  )
}

/** Renders shots on a StatsBomb-coordinate attacking half (x: 60–120, y: 0–80).
 *  All events are stored attacking left→right toward the goal at x=120. */
function ShotMap({ shots, teamColors }: { shots: Shot[]; teamColors: Record<string, string> }) {
  // viewBox covers the attacking half: x 60→120, y 0→80
  return (
    <svg viewBox="60 0 60 80" className="w-full h-auto rounded-lg bg-secondary/[0.02]" style={{ aspectRatio: '60 / 80' }}>
      {/* pitch outline */}
      <rect x="60" y="0" width="60" height="80" fill="none" stroke="rgba(208,198,171,0.25)" strokeWidth="0.4" />
      {/* penalty box */}
      <rect x="102" y="18" width="18" height="44" fill="none" stroke="rgba(208,198,171,0.25)" strokeWidth="0.4" />
      {/* six-yard box */}
      <rect x="114" y="30" width="6" height="20" fill="none" stroke="rgba(208,198,171,0.25)" strokeWidth="0.4" />
      {/* penalty spot */}
      <circle cx="108" cy="40" r="0.4" fill="rgba(208,198,171,0.4)" />
      {/* goal */}
      <line x1="120" y1="36" x2="120" y2="44" stroke="#e9c400" strokeWidth="0.8" />

      {shots.map((s, i) => {
        if (!s.location || s.location.length < 2) return null
        const [x, y] = s.location
        const isGoal = (s.outcome || '').toLowerCase() === 'goal'
        const color = teamColors[s.team || ''] || '#d0c6ab'
        const r = Math.max(0.8, Math.min(4, (s.xg ?? 0.05) * 6))
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={isGoal ? color : 'transparent'}
            stroke={color}
            strokeWidth={isGoal ? 0.6 : 0.5}
            fillOpacity={isGoal ? 0.9 : 0}
            opacity={0.85}
          >
            <title>
              {`${s.player ?? ''} (${s.team ?? ''}) — xG ${(s.xg ?? 0).toFixed(2)}${
                s.minute != null ? `, ${s.minute}'` : ''
              } — ${s.outcome ?? ''}`}
            </title>
          </circle>
        )
      })}
    </svg>
  )
}

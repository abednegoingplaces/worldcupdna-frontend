'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/layout/SiteShell'
import { TeamCrest } from '@/components/ui'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { matchKickoff } from '@/lib/format'
import type { Match, Prediction } from '@/types'

interface CardState {
  home: string
  away: string
  saving: boolean
  saved: boolean
  error: string | null
}

const blankCard: CardState = { home: '', away: '', saving: false, saved: false, error: null }

export default function PredictionsPage() {
  const { isAuthenticated, loading: authLoading, refresh } = useAuth()

  const [matches, setMatches] = useState<Match[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cards, setCards] = useState<Record<string, CardState>>({})

  const predByMatch = useMemo(() => {
    const map: Record<string, Prediction> = {}
    for (const p of predictions) map[p.match_id] = p
    return map
  }, [predictions])

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const upcoming = await api.upcoming(20)
      setMatches(upcoming.matches)

      const seeded: Record<string, CardState> = {}
      if (isAuthenticated) {
        const mine = await api.myPredictions()
        setPredictions(mine.predictions)
        for (const p of mine.predictions) {
          seeded[p.match_id] = {
            ...blankCard,
            home: String(p.predicted_home),
            away: String(p.predicted_away),
          }
        }
      } else {
        setPredictions([])
      }
      setCards(seeded)
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : 'Could not load matches.')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!authLoading) load()
  }, [authLoading, load])

  function patchCard(id: string, patch: Partial<CardState>) {
    setCards((prev) => ({ ...prev, [id]: { ...(prev[id] ?? blankCard), ...patch } }))
  }

  async function submit(m: Match) {
    const c = cards[m.id] ?? blankCard
    const home = parseInt(c.home, 10)
    const away = parseInt(c.away, 10)
    if (Number.isNaN(home) || Number.isNaN(away) || home < 0 || away < 0) {
      patchCard(m.id, { error: 'Enter both scores.' })
      return
    }
    patchCard(m.id, { saving: true, error: null, saved: false })
    try {
      const existing = predByMatch[m.id]
      const saved = existing
        ? await api.updatePrediction(existing.id, home, away)
        : await api.predict(m.id, home, away)
      setPredictions((prev) => [...prev.filter((p) => p.match_id !== m.id), saved])
      patchCard(m.id, { saving: false, saved: true })
      setTimeout(() => patchCard(m.id, { saved: false }), 2000)
    } catch (err) {
      patchCard(m.id, {
        saving: false,
        error: err instanceof ApiError ? err.message : 'Could not save.',
      })
    }
  }

  if (!authLoading && !isAuthenticated) {
    return (
      <SiteShell>
        <Header />
        <div className="px-gutter max-w-container-max mx-auto py-xl">
          <div className="glass-card rounded-2xl p-xl text-center max-w-lg mx-auto space-y-md">
            <span className="material-symbols-outlined text-primary-container text-[48px]">lock</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Sign in to predict</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Predict scores for real World Cup fixtures, earn points and climb the global leaderboard.
            </p>
            <Link
              href="/auth?next=/predictions"
              className="inline-block bg-primary-container text-on-primary-fixed px-lg py-md rounded-lg font-headline-md font-bold glow-gold active:scale-95 transition-all"
            >
              Sign in / Join
            </Link>
          </div>
        </div>
      </SiteShell>
    )
  }

  return (
    <SiteShell>
      <Header />
      <div className="px-gutter max-w-container-max mx-auto py-lg space-y-lg">
        {loadError && (
          <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/30">
            <span className="material-symbols-outlined">error</span>
            <span className="font-body-md">{loadError}</span>
            <button onClick={load} className="ml-auto filter-chip">Retry</button>
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : matches.length === 0 ? (
          <EmptyState
            icon="event_busy"
            title="No upcoming fixtures"
            body="Once the schedule is live, upcoming matches will appear here to predict."
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
            {matches.map((m) => {
              const c = cards[m.id] ?? blankCard
              const pred = predByMatch[m.id]
              return (
                <div key={m.id} className="glass-card rounded-2xl p-md md:p-lg space-y-md">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider">
                      {m.group_name || m.stage || 'World Cup 2026'}
                    </span>
                    <span className="font-label-caps text-[11px] text-on-surface-variant">
                      {matchKickoff(m.match_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-sm">
                    <TeamSide name={m.home_team} crest={m.home_team_crest} />
                    <div className="flex items-center gap-sm shrink-0">
                      <ScoreInput
                        value={c.home}
                        onChange={(v) => patchCard(m.id, { home: v, saved: false, error: null })}
                      />
                      <span className="text-on-surface-variant font-bold">:</span>
                      <ScoreInput
                        value={c.away}
                        onChange={(v) => patchCard(m.id, { away: v, saved: false, error: null })}
                      />
                    </div>
                    <TeamSide name={m.away_team} crest={m.away_team_crest} alignRight />
                  </div>

                  {c.error && (
                    <p className="text-on-error-container font-body-md text-body-md text-center">{c.error}</p>
                  )}

                  <button
                    onClick={() => submit(m)}
                    disabled={c.saving}
                    className={`w-full py-3 rounded-lg font-montserrat font-bold uppercase tracking-wider text-sm transition-all active:scale-[0.98] disabled:opacity-60 ${
                      c.saved ? 'bg-secondary-fixed text-on-secondary' : 'btn-primary glow-gold'
                    }`}
                  >
                    {c.saving ? 'Saving…' : c.saved ? 'Saved!' : pred ? 'Update Prediction' : 'Predict'}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {isAuthenticated && predictions.length > 0 && (
          <section className="space-y-md">
            <h2 className="font-display-md text-headline-lg text-primary-container font-black uppercase tracking-tight">
              My Predictions
            </h2>
            <div className="glass-card rounded-2xl divide-y divide-outline-variant/20 overflow-hidden">
              {predictions.map((p) => {
                const m = matches.find((x) => x.id === p.match_id)
                return (
                  <div key={p.id} className="flex items-center justify-between px-md py-sm">
                    <span className="font-body-md text-body-md text-on-surface truncate">
                      {m ? `${m.home_team} vs ${m.away_team}` : 'Match'}
                    </span>
                    <div className="flex items-center gap-md shrink-0">
                      <span className="font-stats-number text-stats-number text-on-background tabular-nums">
                        {p.predicted_home}–{p.predicted_away}
                      </span>
                      {p.scored ? (
                        <span className="badge-live">+{p.points} pts</span>
                      ) : (
                        <span className="badge-scheduled">Pending</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => refresh()} className="filter-chip">Refresh points</button>
          </section>
        )}
      </div>
    </SiteShell>
  )
}

function Header() {
  return (
    <div className="px-gutter max-w-container-max mx-auto pt-lg">
      <h1 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-tight">
        Match Predictions
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
        Exact score = <span className="text-secondary-fixed font-bold">3 pts</span> · correct outcome ={' '}
        <span className="text-secondary-fixed font-bold">1 pt</span>. Locked at kickoff.
      </p>
    </div>
  )
}

function TeamSide({
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
      <TeamCrest name={name} crest={crest} size={40} />
      <span className="font-headline-md text-body-md font-bold text-on-background truncate">{name}</span>
    </div>
  )
}

function ScoreInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={2}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
      className="w-12 h-12 text-center bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-background font-stats-number text-stats-number focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 transition-all"
      placeholder="0"
    />
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-lg h-44 animate-pulse" />
      ))}
    </div>
  )
}

function EmptyState({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="glass-card rounded-2xl p-xl text-center max-w-lg mx-auto space-y-sm">
      <span className="material-symbols-outlined text-on-surface-variant text-[48px]">{icon}</span>
      <h2 className="font-headline-lg text-headline-lg text-on-background">{title}</h2>
      <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
    </div>
  )
}

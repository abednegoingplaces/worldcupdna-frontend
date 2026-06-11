'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/layout/SiteShell'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { nationColor, nationGradient } from '@/lib/nationColors'
import type { Leaderboard, LeaderboardRow } from '@/types'

export default function LeaderboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<Leaderboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await api.leaderboard(100))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not load the leaderboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) load()
  }, [authLoading, load])

  const rows = data?.rows ?? []
  const podium = rows.slice(0, 3)
  const rest = rows.slice(3)
  const me = data?.me ?? null
  const meInTop = me ? rows.some((r) => r.user_id === me.user_id && r.rank <= 100) : false

  return (
    <SiteShell>
      <div className="px-gutter max-w-container-max mx-auto pt-lg">
        <h1 className="font-display-md text-display-md text-primary-container font-black uppercase tracking-tight">
          Global Leaderboard
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">
          {data ? `${data.total.toLocaleString()} fans competing worldwide.` : 'Live fan rankings.'}
        </p>
      </div>

      <div className="px-gutter max-w-container-max mx-auto py-lg space-y-lg">
        {error && (
          <div className="glass-card rounded-xl p-md flex items-center gap-sm text-on-error-container border border-error-container/30">
            <span className="material-symbols-outlined">error</span>
            <span className="font-body-md">{error}</span>
            <button onClick={load} className="ml-auto filter-chip">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="space-y-md">
            <div className="grid grid-cols-3 gap-md">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl h-44 animate-pulse" />
              ))}
            </div>
            <div className="glass-card rounded-2xl h-80 animate-pulse" />
          </div>
        ) : rows.length === 0 ? (
          <div className="glass-card rounded-2xl p-xl text-center max-w-lg mx-auto space-y-sm">
            <span className="material-symbols-outlined text-on-surface-variant text-[48px]">trophy</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">No rankings yet</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Be the first to score points.{' '}
              <Link href="/predictions" className="text-primary-container hover:underline">
                Make a prediction →
              </Link>
            </p>
          </div>
        ) : (
          <>
            {/* Podium */}
            {podium.length >= 1 && (
              <div className="grid grid-cols-3 gap-sm md:gap-md items-end">
                {podiumOrder(podium).map((row) =>
                  row ? (
                    <PodiumCard key={row.user_id} row={row} isMe={me?.user_id === row.user_id} />
                  ) : (
                    <div key={Math.random()} />
                  )
                )}
              </div>
            )}

            {/* Rest of the table */}
            {rest.length > 0 && (
              <div className="glass-card rounded-2xl divide-y divide-outline-variant/15 overflow-hidden">
                {rest.map((row) => (
                  <Row key={row.user_id} row={row} isMe={me?.user_id === row.user_id} />
                ))}
              </div>
            )}

            {/* Sticky "you" row when outside the top 100 */}
            {me && !meInTop && (
              <div className="sticky bottom-20 md:bottom-4 z-10">
                <div className="glass-card rounded-2xl border border-primary-container/40 shadow-[0_0_24px_rgba(233,196,0,0.18)]">
                  <Row row={me} isMe highlightYou />
                </div>
              </div>
            )}
          </>
        )}

        {!authLoading && !user && (
          <div className="text-center">
            <Link href="/auth?next=/leaderboard" className="filter-chip filter-chip-active">
              Sign in to see your rank
            </Link>
          </div>
        )}
      </div>
    </SiteShell>
  )
}

// 2nd · 1st · 3rd visual ordering
function podiumOrder(p: LeaderboardRow[]): (LeaderboardRow | undefined)[] {
  return [p[1], p[0], p[2]]
}

function PodiumCard({ row, isMe }: { row: LeaderboardRow; isMe: boolean }) {
  const first = row.rank === 1
  const team = row.favorite_team || ''
  return (
    <div
      className={`relative glass-card rounded-2xl p-md text-center flex flex-col items-center gap-sm ${
        first ? 'pb-lg pt-lg -translate-y-2' : ''
      } ${isMe ? 'border border-primary-container/50' : ''}`}
    >
      {first && (
        <span className="material-symbols-outlined text-primary-container text-[28px] absolute -top-3">
          trophy
        </span>
      )}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-black text-on-background uppercase border-2"
        style={{ background: nationGradient(team), borderColor: nationColor(team) }}
      >
        {row.username.slice(0, 2)}
      </div>
      <span
        className={`font-stats-number text-stats-number font-black ${
          first ? 'text-primary-container' : 'text-on-surface-variant'
        }`}
      >
        #{row.rank}
      </span>
      <span className="font-headline-md text-body-md font-bold text-on-background truncate max-w-full">
        {row.username}
      </span>
      <span className="font-stats-number text-stats-number text-secondary-fixed tabular-nums">
        {row.total_points.toLocaleString()}
      </span>
      {team && (
        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase truncate max-w-full">
          {team}
        </span>
      )}
    </div>
  )
}

function Row({
  row,
  isMe,
  highlightYou = false,
}: {
  row: LeaderboardRow
  isMe: boolean
  highlightYou?: boolean
}) {
  const team = row.favorite_team || ''
  return (
    <div
      className={`flex items-center gap-md px-md py-sm ${
        isMe && !highlightYou ? 'bg-primary-container/10' : ''
      }`}
    >
      <span className="w-8 text-center font-stats-number text-body-md font-black text-on-surface-variant tabular-nums">
        {row.rank}
      </span>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-on-background uppercase shrink-0"
        style={{ background: nationGradient(team) }}
      >
        {row.username.slice(0, 2)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-headline-md text-body-md font-bold text-on-background truncate">
          {row.username}
          {(isMe || highlightYou) && (
            <span className="ml-sm badge-scheduled align-middle">You</span>
          )}
        </p>
        {team && (
          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase truncate">{team}</p>
        )}
      </div>
      <span className="font-stats-number text-stats-number text-secondary-fixed tabular-nums shrink-0">
        {row.total_points.toLocaleString()}
      </span>
    </div>
  )
}

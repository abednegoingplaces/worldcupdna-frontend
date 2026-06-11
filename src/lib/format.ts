// ── Small formatting helpers shared across pages ────────────────────────

export function matchKickoff(iso?: string | null): string {
  if (!iso) return 'TBD'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'TBD'
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function matchTime(iso?: string | null): string {
  if (!iso) return 'TBD'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'TBD'
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export function matchDay(iso?: string | null): string {
  if (!iso) return 'TBD'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'TBD'
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export function isSameDay(iso: string | null | undefined, ref: Date): boolean {
  if (!iso) return false
  const d = new Date(iso)
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  )
}

/** Two-letter-ish initials fallback when a crest is missing. */
export function teamInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}

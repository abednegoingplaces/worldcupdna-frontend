'use client'

import { useState } from 'react'
import { teamInitials } from '@/lib/format'

interface Props {
  name: string
  crest?: string | null
  size?: number
  className?: string
}

/** Team crest with a graceful initials fallback when no image is available
 *  or the remote crest fails to load. */
export function TeamCrest({ name, crest, size = 40, className = '' }: Props) {
  const [failed, setFailed] = useState(false)
  const dimension = { width: size, height: size }

  if (crest && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={crest}
        alt={name}
        style={dimension}
        onError={() => setFailed(true)}
        className={`object-contain ${className}`}
      />
    )
  }

  return (
    <div
      style={dimension}
      className={`flex items-center justify-center rounded-full bg-surface-variant/40 border border-outline-variant/30 text-on-surface-variant font-bold ${className}`}
    >
      <span style={{ fontSize: size * 0.34 }}>{teamInitials(name)}</span>
    </div>
  )
}

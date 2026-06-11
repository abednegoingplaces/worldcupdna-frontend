'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SiteShell } from '@/components/layout/SiteShell'
import { api, ApiError } from '@/lib/api'
import type { Venue } from '@/types'

const FILTER_CHIPS = ['All', 'Verified', 'Community'] as const
type FilterChip = (typeof FILTER_CHIPS)[number]

function directionsUrl(v: Venue): string {
  if (v.lat != null && v.lng != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`
  }
  const q = encodeURIComponent(`${v.name} ${v.address ?? ''} ${v.city ?? ''}`.trim())
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeChip, setActiveChip] = useState<FilterChip>('All')
  const [activeVenue, setActiveVenue] = useState<string | null>(null)
  const [showSubmit, setShowSubmit] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.venues()
      setVenues(data.venues)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load venues.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    let list = venues
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.address?.toLowerCase().includes(q) ||
          v.area?.toLowerCase().includes(q) ||
          v.city?.toLowerCase().includes(q)
      )
    }
    if (activeChip === 'Verified') list = list.filter((v) => v.verified)
    if (activeChip === 'Community') list = list.filter((v) => !v.verified)
    return list
  }, [venues, search, activeChip])

  return (
    <SiteShell>
      <section className="bg-surface-container px-gutter py-md border-b border-outline-variant/20">
        <div className="max-w-container-max mx-auto space-y-md">
          <div>
            <h1 className="font-display-md text-display-md font-black uppercase tracking-tight text-primary-container">
              Watch Parties
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Find fan zones and sports bars showing the World Cup near you.
            </p>
          </div>
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary-fixed transition-colors">
              search
            </span>
            <input
              className="input-ds w-full pl-12 pr-4 py-3 font-inter text-base"
              placeholder="Search by city, neighborhood, or venue name"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-sm">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`filter-chip ${activeChip === chip ? 'filter-chip-active' : ''}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row min-h-0">
        <aside className="w-full md:w-[42%] overflow-y-auto p-gutter md:border-r border-outline-variant/20">
          <div className="flex items-center justify-between mb-md">
            <h2 className="font-display-md text-headline-md font-black uppercase tracking-wider text-primary-container flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                stadium
              </span>
              {loading ? 'Loading…' : `${filtered.length} venues`}
            </h2>
            <button onClick={() => setShowSubmit(true)} className="filter-chip filter-chip-active">
              + Add
            </button>
          </div>

          {error && (
            <div className="glass-card p-lg text-center text-on-error-container font-body-md mb-md">
              {error}
              <button onClick={load} className="ml-sm filter-chip">Retry</button>
            </div>
          )}
          {loading && (
            <div className="space-y-md">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card h-28 animate-pulse" />
              ))}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="glass-card p-lg text-center text-on-surface-variant font-body-md">
              No venues match your search.
            </div>
          )}

          <div className="space-y-md">
            {filtered.map((venue) => (
              <div
                key={venue.id}
                onClick={() => setActiveVenue(venue.id)}
                className={`glass-card p-md cursor-pointer transition-all hover:bg-white/[0.04] border ${
                  activeVenue === venue.id
                    ? 'border-primary-container shadow-[0_0_15px_rgba(233,196,0,0.25)]'
                    : 'border-outline-variant/30'
                }`}
              >
                <div className="flex justify-between items-start mb-xs gap-sm">
                  <h3 className="font-display-md text-sm font-black text-on-surface">{venue.name}</h3>
                  {venue.verified ? (
                    <span className="flex items-center gap-1 bg-primary-container/15 text-primary-container px-2.5 py-1 rounded-full text-[10px] font-label-caps border border-primary-container/30 shrink-0 font-bold">
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      Verified
                    </span>
                  ) : (
                    <span className="font-label-caps text-[10px] text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30 shrink-0">
                      Community
                    </span>
                  )}
                </div>
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-sm uppercase tracking-widest font-bold">
                  {[venue.area, venue.city].filter(Boolean).join(' · ') || venue.address}
                </p>
                {venue.description && (
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-md leading-relaxed">
                    {venue.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <a
                    href={directionsUrl(venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-primary-container font-montserrat text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    Get Directions
                    <span className="material-symbols-outlined text-sm">directions</span>
                  </a>
                  {venue.distance_km != null && (
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      {venue.distance_km.toFixed(1)} km
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Map-style panel */}
        <div className="hidden md:block w-[58%] min-h-[500px] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 30% 40%, #2a2a2a 0%, #131313 60%, #0e0e0e 100%)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#e5e2e1 1px, transparent 1px), linear-gradient(90deg, #e5e2e1 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {filtered.map((venue, i) => {
            const positions = [
              { top: '25%', left: '30%' },
              { top: '50%', left: '55%' },
              { top: '65%', left: '25%' },
              { top: '35%', left: '70%' },
              { top: '75%', left: '60%' },
            ]
            const pos = positions[i % positions.length]
            return (
              <div
                key={venue.id}
                className={`absolute group cursor-pointer transition-all duration-300 ${
                  activeVenue === venue.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setActiveVenue(venue.id)}
              >
                <div
                  className={`p-2 rounded-full ring-2 ring-white/10 ${
                    venue.verified
                      ? 'bg-primary-container shadow-[0_0_15px_rgba(233,196,0,0.5)]'
                      : 'bg-surface-container border border-outline-variant/30'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      venue.verified ? 'text-black' : 'text-on-surface'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {venue.verified ? 'stadium' : 'sports_bar'}
                  </span>
                </div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap glass-card px-3 py-1.5 text-[10px] font-label-caps border border-outline-variant/30 shadow-lg">
                  {venue.name}
                </div>
              </div>
            )
          })}
          <div className="absolute top-md left-md glass-card px-md py-sm flex items-center gap-2 border border-outline-variant/30 shadow-lg">
            <span className="w-2.5 h-2.5 bg-secondary-fixed rounded-full pulse-live" />
            <span className="font-label-caps text-[10px] tracking-widest uppercase font-bold text-on-surface">
              Nairobi &amp; beyond
            </span>
          </div>
        </div>
      </section>

      <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-lg px-gutter">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="text-center md:text-left">
            <h4 className="font-display-md text-headline-md font-black uppercase text-primary-container mb-xs">
              Hosting a Watch Party?
            </h4>
            <p className="text-on-surface-variant text-sm font-body-md">
              Get your venue listed and reach thousands of fans.
            </p>
          </div>
          <button
            onClick={() => setShowSubmit(true)}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-montserrat text-sm uppercase tracking-wider glow-gold active:scale-[0.98] transition-all"
          >
            Add Your Venue
            <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
          </button>
        </div>
      </footer>

      {showSubmit && <SubmitVenueModal onClose={() => setShowSubmit(false)} />}
    </SiteShell>
  )
}

function SubmitVenueModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: 'Nairobi',
    county: '',
    country: 'Kenya',
    description: '',
    contact: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Name, address and city are required.')
      return
    }
    setSubmitting(true)
    try {
      await api.submitVenue({
        name: form.name.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        county: form.county.trim() || undefined,
        country: form.country.trim() || 'Kenya',
        description: form.description.trim() || undefined,
        contact: form.contact.trim() || undefined,
      })
      setDone(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not submit venue.')
    } finally {
      setSubmitting(false)
    }
  }

  const field =
    'w-full bg-surface-container-lowest/80 border border-outline-variant/30 rounded-lg py-3 px-4 text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all font-body-md'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-gutter bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface-container border border-outline-variant/30 rounded-2xl p-lg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-md right-md text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {done ? (
          <div className="text-center py-lg space-y-md">
            <span className="material-symbols-outlined text-secondary-fixed text-[48px]">check_circle</span>
            <h3 className="font-headline-lg text-headline-lg text-on-background">Submitted for review</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Thanks! We&apos;ll verify your venue and add it to the map shortly.
            </p>
            <button onClick={onClose} className="btn-primary px-lg py-md rounded-lg font-bold uppercase text-sm">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-md">
            <h3 className="font-display-md text-headline-lg font-black text-primary-container uppercase">
              List your venue
            </h3>
            {error && (
              <div className="flex items-start gap-sm bg-error-container/15 border border-error-container/30 text-on-error-container rounded-lg px-md py-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <p className="font-body-md text-body-md">{error}</p>
              </div>
            )}
            <input className={field} placeholder="Venue name *" value={form.name} onChange={(e) => set('name', e.target.value)} />
            <input className={field} placeholder="Street address *" value={form.address} onChange={(e) => set('address', e.target.value)} />
            <div className="grid grid-cols-2 gap-md">
              <input className={field} placeholder="City *" value={form.city} onChange={(e) => set('city', e.target.value)} />
              <input className={field} placeholder="County" value={form.county} onChange={(e) => set('county', e.target.value)} />
            </div>
            <input className={field} placeholder="Country" value={form.country} onChange={(e) => set('country', e.target.value)} />
            <input className={field} placeholder="Contact (phone / email)" value={form.contact} onChange={(e) => set('contact', e.target.value)} />
            <textarea
              className={`${field} min-h-[80px] resize-y`}
              placeholder="What's the vibe? Screens, food, capacity…"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-primary py-3 rounded-lg font-montserrat font-bold uppercase tracking-wider text-sm glow-gold active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit for review'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

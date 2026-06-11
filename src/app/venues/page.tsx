'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { Venue } from '@/types'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/matches', label: 'Matches' },
  { href: '/predictions', label: 'Predictions' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/venues', label: 'Watch Parties' },
]

const FILTER_CHIPS = ['All', 'Verified', 'Community', 'Outdoor', 'Indoor'] as const
type FilterChip = (typeof FILTER_CHIPS)[number]

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeChip, setActiveChip] = useState<FilterChip>('All')
  const [activeVenue, setActiveVenue] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://worldcupdna-backend.onrender.com/api/v1/venues/')
      .then((res) => res.json())
      .then((data) => {
        setVenues(Array.isArray(data) ? data : data.results ?? [])
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load venues. Please try again.')
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    let list = venues
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.address?.toLowerCase().includes(q) ||
          v.area?.toLowerCase().includes(q)
      )
    }
    if (activeChip === 'Verified') list = list.filter((v) => v.verified)
    if (activeChip === 'Community') list = list.filter((v) => !v.verified)
    return list
  }, [venues, search, activeChip])

  return (
    <div className="bg-background text-on-background font-inter min-h-screen flex flex-col pb-20 md:pb-0">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <div className="flex justify-between items-center px-gutter py-md max-w-container-max mx-auto">
          <Link href="/" className="font-display-md text-display-md font-black tracking-tighter text-primary-container">
            WorldCupDNA
          </Link>
          <nav className="hidden md:flex items-center space-x-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-headline-md transition-colors ${
                  link.href === '/venues'
                    ? 'text-primary-container border-b-2 border-primary-container pb-1 font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/auth"
            className="bg-primary-container text-on-primary-fixed px-md py-sm font-label-caps text-label-caps rounded-lg uppercase tracking-widest font-bold hover:bg-primary-fixed transition-all duration-300 active:scale-95 glow-gold text-center"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="pt-[88px] flex flex-col flex-1 min-h-screen">
        <section className="bg-surface-container px-gutter py-md border-b border-outline-variant/20">
          <div className="max-w-[1280px] mx-auto space-y-md">
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

        <section className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          <aside className="w-full md:w-[42%] overflow-y-auto p-gutter border-r border-outline-variant/20 max-h-[60vh] md:max-h-none">
            <h2 className="font-display-md text-headline-md font-black uppercase tracking-wider text-primary-container mb-md flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                stadium
              </span>
              Watch Parties
            </h2>

            {loading && <div className="glass-card p-lg text-center text-on-surface-variant font-body-md">Loading venues…</div>}
            {error && <div className="glass-card p-lg text-center text-red-400 font-body-md">{error}</div>}
            {!loading && !error && filtered.length === 0 && (
              <div className="glass-card p-lg text-center text-on-surface-variant font-body-md">No venues match your search.</div>
            )}

            <div className="space-y-md">
              {filtered.map((venue) => (
                <div
                  key={venue.id}
                  onClick={() => setActiveVenue(venue.id)}
                  className={`glass-card p-md cursor-pointer transition-all hover:bg-white/[0.04] border ${
                    activeVenue === venue.id ? 'border-primary-container shadow-[0_0_15px_rgba(233,196,0,0.25)]' : 'border-outline-variant/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-xs gap-sm">
                    <h3 className="font-display-md text-sm font-black text-on-surface">{venue.name}</h3>
                    {venue.verified ? (
                      <span className="flex items-center gap-1 bg-primary-container/15 text-primary-container px-2.5 py-1 rounded-full text-[10px] font-label-caps border border-primary-container/30 shrink-0 font-bold">
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
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
                    {venue.area || venue.address}
                  </p>
                  {venue.description && (
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-md leading-relaxed">{venue.description}</p>
                  )}
                  <button className="text-primary-container font-montserrat text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline">
                    Get Directions
                    <span className="material-symbols-outlined text-sm">directions</span>
                  </button>
                </div>
              ))}
            </div>
          </aside>

          <section className="w-full md:w-[58%] min-h-[300px] md:min-h-[500px] relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 30% 40%, #2a2a2a 0%, #131313 60%, #0e0e0e 100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#e5e2e1 1px, transparent 1px), linear-gradient(90deg, #e5e2e1 1px, transparent 1px)',
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
                  className={`absolute group cursor-pointer transition-all duration-300 ${activeVenue === venue.id ? 'scale-125 z-10' : 'hover:scale-110'}`}
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
                      className={`material-symbols-outlined text-lg ${venue.verified ? 'text-black' : 'text-on-surface'}`}
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
              <span className="font-label-caps text-[10px] tracking-widest uppercase font-bold text-on-surface">Live Coverage</span>
            </div>

            <div className="absolute bottom-md right-md flex flex-col gap-sm">
              {['add', 'remove', 'my_location'].map((icon) => (
                <button key={icon} className="w-10 h-10 glass-card flex items-center justify-center hover:bg-[rgba(233,196,0,0.15)] transition-colors border border-outline-variant/30 shadow-lg text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </button>
              ))}
            </div>
          </section>
        </section>

        <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-lg px-gutter">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
            <div className="text-center md:text-left">
              <h4 className="font-display-md text-headline-md font-black uppercase text-primary-container mb-xs">Hosting a Watch Party?</h4>
              <p className="text-on-surface-variant text-sm font-body-md">Get your venue listed and reach thousands of fans.</p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 px-6 py-3 font-montserrat text-sm uppercase tracking-wider glow-gold active:scale-[0.98] transition-all">
              Add Your Venue
              <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 flex items-center justify-around z-50">
        {[
          { href: '/', icon: 'home', label: 'Home', active: false },
          { href: '/matches', icon: 'sports_soccer', label: 'Matches', active: false },
          { href: '/predictions', icon: 'analytics', label: 'Predict', active: false },
          { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks', active: false },
          { href: '/venues', icon: 'location_on', label: 'Venues', active: true },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-xs transition-colors ${item.active ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

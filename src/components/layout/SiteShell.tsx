'use client'

// Shared chrome: top nav (auth-aware) + mobile bottom nav. Wrap page content
// so every route gets consistent navigation and spacing.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

const NAV = [
  { href: '/matches', label: 'Matches', icon: 'sports_soccer' },
  { href: '/predictions', label: 'Predictions', icon: 'analytics' },
  { href: '/leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
  { href: '/stats', label: 'Deep Stats', icon: 'query_stats' },
  { href: '/venues', label: 'Watch Parties', icon: 'location_on' },
]

const MOBILE = [
  { href: '/', icon: 'home', label: 'Home' },
  { href: '/matches', icon: 'sports_soccer', label: 'Matches' },
  { href: '/predictions', icon: 'analytics', label: 'Predict' },
  { href: '/leaderboard', icon: 'leaderboard', label: 'Ranks' },
  { href: '/venues', icon: 'location_on', label: 'Venues' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-2xl border-b border-outline-variant/15 shadow-[0_1px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-gutter py-sm max-w-container-max mx-auto h-[72px]">
        <Link
          href="/"
          className="font-display-md text-[20px] md:text-[24px] font-black tracking-tighter text-primary-container shrink-0"
        >
          WorldCupDNA
        </Link>

        <nav className="hidden md:flex items-center gap-md">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-headline-md text-[14px] transition-all px-sm py-xs rounded-lg ${
                  active
                    ? 'text-primary-container bg-primary-container/8 font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-sm shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-sm">
              <Link
                href="/profile"
                className="hidden sm:flex items-center gap-sm bg-surface-container-high/50 hover:bg-surface-container-high/70 transition-colors px-md py-xs rounded-full border border-outline-variant/20"
              >
                <span className="w-7 h-7 rounded-full bg-primary-container/15 border border-primary-container/30 flex items-center justify-center text-primary-container font-bold text-xs uppercase">
                  {user?.username?.slice(0, 2) ?? '??'}
                </span>
                <span className="font-label-caps text-[11px] text-on-surface uppercase tracking-wider">
                  {user?.total_points ?? 0} pts
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-xs text-on-surface-variant hover:text-error-container hover:bg-surface-variant/20 rounded-full transition-all cursor-pointer"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-primary-container text-on-primary-fixed px-md py-sm font-label-caps text-[12px] rounded-lg uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(233,196,0,0.3)] transition-all duration-300 active:scale-95 text-center"
            >
              Join the Game
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-2xl border-t border-outline-variant/15 flex items-center justify-around z-50 safe-area-inset-bottom">
      {MOBILE.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-[2px] transition-colors py-1 px-3 rounded-lg ${
              active ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="font-label-caps text-[9px] uppercase tracking-widest font-bold">
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

/** Page wrapper: header offset + mobile-nav padding baked in. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-background text-on-background">
      <SiteHeader />
      <main className="flex-grow pt-[72px]">{children}</main>
      <MobileNav />
    </div>
  )
}

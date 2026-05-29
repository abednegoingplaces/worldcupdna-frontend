import Link from 'next/link'

const STATS = [
  { value: '48', label: 'Teams' },
  { value: '104', label: 'Matches' },
  { value: '16', label: 'Host Cities' },
  { value: '5B+', label: 'Global Fans' },
]

const FEATURES = [
  {
    icon: '🧬',
    title: 'Fan DNA Profile',
    desc: 'Answer 3 questions. Get a unique tactical identity badge you can share anywhere.',
    color: 'from-emerald-500/20 to-transparent',
    link: '/profile/build'
  },
  {
    icon: '🎯',
    title: 'Match Predictions',
    desc: 'Predict every score. Earn points for correct outcomes. Bonus points for exact scores.',
    color: 'from-blue-500/20 to-transparent',
    link: '/matches'
  },
  {
    icon: '📊',
    title: 'Live Match Hub',
    desc: 'Real-time standings, group tables, knockout bracket — all in one place.',
    color: 'from-purple-500/20 to-transparent',
    link: '/matches'
  },
  {
    icon: '📍',
    title: 'Watch Party Finder',
    desc: 'The best spots in Nairobi streaming every game. Verified fan zones.',
    color: 'from-amber-500/20 to-transparent',
    link: '/venues'
  },
]

const NATIONS = [
  { flag: '🇦🇷', name: 'Argentina' },
  { flag: '🇧🇷', name: 'Brazil' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇵🇹', name: 'Portugal' },
  { flag: '🇪🇸', name: 'Spain' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England' },
  { flag: '🇲🇦', name: 'Morocco' },
  { flag: '🇸🇳', name: 'Senegal' },
  { flag: '🇳🇬', name: 'Nigeria' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇲🇽', name: 'Mexico' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇰🇷', name: 'South Korea' },
  { flag: '🇳🇱', name: 'Netherlands' },
  { flag: '🇭🇷', name: 'Croatia' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050a0e] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(5,10,14,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-lg tracking-tight">WorldCupDNA</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/matches" className="text-sm text-zinc-400 hover:text-white transition-colors">Matches</Link>
          <Link href="/leaderboard" className="text-sm text-zinc-400 hover:text-white transition-colors">Leaderboard</Link>
          <Link href="/venues" className="text-sm text-zinc-400 hover:text-white transition-colors">Watch Parties</Link>
          <Link href="/profile/build" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Build Profile
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">

        {/* Background glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />

        {/* Trophy SVG + badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-8xl mb-4 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.5))' }}>
            🏆
          </div>
          <div className="text-white font-black text-2xl tracking-widest mb-3" style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>FIFA WORLD CUP 2026</div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
            ⚽ June 11 – July 19, 2026 · USA · Canada · Mexico
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-center font-bold leading-tight mb-6 max-w-3xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          Discover Your
          <span className="block" style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}> Football DNA</span>
        </h1>
        <p className="text-center text-zinc-400 mb-10 max-w-lg text-lg">
          Build your fan profile, predict every match, climb the global leaderboard, and find your tribe in Nairobi.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <Link href="/profile/build"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ boxShadow: '0 0 40px rgba(16,185,129,0.3)' }}>
            Build my DNA profile 🧬
          </Link>
          <Link href="/matches"
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            View matches →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-16 flex-wrap justify-center mb-20">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold" style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{s.value}</div>
              <div className="text-zinc-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Nations Banner */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2">The Stars of 2026</h2>
          <p className="text-center text-zinc-500 mb-10">48 nations. One trophy. The biggest World Cup ever.</p>

          <div className="relative rounded-3xl overflow-hidden py-16 px-8"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 40%, #1e3a5f 70%, #0f172a 100%)' }}>

            {/* Glow blobs inside banner */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: '#10b981', transform: 'translate(-30%, -30%)' }} />
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: '#3b82f6', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: '#f59e0b', transform: 'translate(-50%, 40%)' }} />

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }} />

            {/* Side color strips */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ background: 'linear-gradient(to bottom, #3b82f6, #10b981, #f59e0b, #ef4444, #8b5cf6)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-1.5"
              style={{ background: 'linear-gradient(to bottom, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6)' }} />

            {/* Corner watermarks */}
            <div className="absolute top-4 left-6 text-white/10 font-black text-7xl select-none pointer-events-none">2026</div>
            <div className="absolute bottom-4 right-6 text-white/10 font-black text-7xl select-none pointer-events-none">WC</div>

            {/* Center content */}
            <div className="relative flex flex-col items-center text-center">
              <div className="text-6xl mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.6))' }}>🏆</div>
              <div className="text-white text-3xl font-black tracking-tight mb-1"
                style={{ textShadow: '0 0 40px rgba(16,185,129,0.6)' }}>
                USA · CANADA · MEXICO
              </div>
              <div className="font-bold text-lg mb-8" style={{ color: '#fbbf24' }}>
                June 11 – July 19, 2026
              </div>

              {/* Nation flags grid */}
              <div className="grid grid-cols-8 gap-4 mb-8 max-w-2xl">
                {NATIONS.map((n) => (
                  <div key={n.name} className="flex flex-col items-center gap-1 group cursor-default">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-200"
                      style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
                      {n.flag}
                    </span>
                    <span className="text-white/40 text-xs hidden md:block">{n.name}</span>
                  </div>
                ))}
              </div>

              <Link href="/profile/build"
                className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
                style={{ background: 'rgba(16,185,129,0.9)', boxShadow: '0 0 40px rgba(16,185,129,0.5)' }}>
                Pick your team & build your DNA 🧬
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold mb-2">Everything in one platform</h2>
          <p className="text-center text-zinc-500 mb-10">Built for the biggest World Cup ever.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <Link href={f.link} key={f.title}
                className="group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] block"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} text-2xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-4 text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #064e3b, #065f46, #047857)' }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 80% 50%, #34d399 0%, transparent 50%)' }} />
          <div className="relative px-8 py-16 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-3">The tournament starts June 11</h2>
            <p className="mb-8 text-lg" style={{ color: '#6ee7b7' }}>
              Build your profile now and be ready for kickoff.
            </p>
            <Link href="/profile/build"
              className="inline-block bg-white text-emerald-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors">
              Build my DNA profile →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-zinc-600 text-sm"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        WorldCupDNA · Built for FIFA World Cup 2026 fans · Nairobi 🇰🇪
      </footer>

    </main>
  )
}
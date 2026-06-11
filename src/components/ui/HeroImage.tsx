interface HeroImageProps {
  src: 'hero-stadium' | 'stadium-bg' | 'pitch-aerial' | 'stadium-night' | 'auth-bg'
  overlay?: 'dark' | 'darker' | 'side-fade' | 'bottom-fade' | 'none'
  className?: string
  children?: React.ReactNode
}

const overlays = {
  dark:          'bg-black/50',
  darker:        'bg-black/70',
  'side-fade':   'bg-gradient-to-r from-background via-background/80 to-transparent',
  'bottom-fade': 'bg-gradient-to-t from-background via-transparent to-transparent',
  none:          '',
}

export function HeroImage({ src, overlay = 'dark', className = '', children }: HeroImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={`/images/heroes/${src}.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlays[overlay]}`} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

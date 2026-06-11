interface PlayerAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm:  'w-8 h-8 text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-16 h-16 text-lg',
  xl:  'w-24 h-24 text-2xl',
}

const gradients = [
  'from-yellow-500 to-amber-700',
  'from-emerald-500 to-green-700',
  'from-blue-500 to-indigo-700',
  'from-red-500 to-rose-700',
  'from-purple-500 to-violet-700',
  'from-orange-500 to-amber-700',
]

function getGradient(name: string): string {
  return gradients[name.charCodeAt(0) % gradients.length]
}

function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export function PlayerAvatar({ name, size = 'md', className = '' }: PlayerAvatarProps) {
  return (
    <div
      className={`bg-gradient-to-br ${getGradient(name)} ${sizes[size]} rounded-full flex items-center justify-center font-black text-white flex-shrink-0 ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}

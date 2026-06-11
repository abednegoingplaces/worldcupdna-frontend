interface FlagProps {
  code: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  xs: 'w-5 h-3',
  sm: 'w-6 h-4',
  md: 'w-8 h-5',
  lg: 'w-12 h-8',
}

export function Flag({ code, size = 'md', className = '' }: FlagProps) {
  return (
    <img
      src={`/images/flags/${code.toLowerCase()}.svg`}
      alt={code.toUpperCase()}
      className={`${sizes[size]} object-cover rounded-sm ${className}`}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}

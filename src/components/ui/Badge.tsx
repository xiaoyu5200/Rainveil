import type { ReactNode } from 'react'

const tones = {
  default: 'bg-sky text-mist',
  signal: 'bg-signal/10 text-signal',
  citrus: 'bg-citrus/10 text-citrus',
  meadow: 'bg-meadow/10 text-meadow',
} as const

export function Badge({ children, tone = 'default', className }: {
  children: ReactNode
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className ?? ''}`}>
      {children}
    </span>
  )
}

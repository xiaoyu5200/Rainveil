import type { ReactNode } from 'react'

const shadowClass = {
  whisper: 'shadow-whisper',
  float: 'shadow-float',
  none: '',
} as const

export function Card({
  title,
  children,
  className,
  shadow = 'whisper',
}: {
  title?: string
  children: ReactNode
  className?: string
  shadow?: keyof typeof shadowClass
}) {
  return (
    <div className={`rounded-check border border-edge bg-cloud p-6 ${shadowClass[shadow]} ${className ?? ''}`}>
      {title ? <h3 className="mb-3 text-lg font-semibold text-ink">{title}</h3> : null}
      {children}
    </div>
  )
}

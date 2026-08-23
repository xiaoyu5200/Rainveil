import type { ReactNode } from 'react'

export function Section({
  title,
  subtitle,
  accent,
  children,
  className,
  divider = false,
}: {
  title: string
  subtitle?: string
  accent?: string
  children?: ReactNode
  className?: string
  divider?: boolean
}) {
  return (
    <section className={divider ? `border-t border-edge ${className ?? ''}` : className}>
      <header className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
          {accent ? (
            <em className="font-serif-accent font-normal italic text-signal">{accent}</em>
          ) : null}
        </h2>
        {subtitle ? <p className="mt-3 text-mist">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

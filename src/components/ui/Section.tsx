import type { ReactNode } from 'react'

export function Section({
  kicker,
  title,
  subtitle,
  accent,
  children,
  className,
  divider = false,
  as = 'h2',
}: {
  kicker?: string
  title: ReactNode
  subtitle?: string
  accent?: string
  children?: ReactNode
  className?: string
  divider?: boolean
  as?: 'h1' | 'h2' | 'h3'
}) {
  const Heading = as
  return (
    <section className={divider ? `border-t border-edge ${className ?? ''}` : className}>
      <header className="mb-8 max-w-2xl">
        {kicker ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-soft">{kicker}</p>
        ) : null}
        <Heading className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
          {accent ? (
            <em className="font-serif-accent font-normal italic text-signal">{accent}</em>
          ) : null}
        </Heading>
        {subtitle ? <p className="mt-3 text-mist">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

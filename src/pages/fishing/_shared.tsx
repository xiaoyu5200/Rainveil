import type { ReactNode } from 'react'
import { fishTier, type Fish } from '../../content/fishing'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Icon } from '../../components/ui/Icon'

export function Pixel({ src, alt, className = 'h-12 w-12' }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} flex-none object-contain [image-rendering:pixelated]`}
      loading="lazy"
    />
  )
}

export function FishTile({ fish }: { fish: Fish }) {
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink">{fish.name}</h3>
        <Badge tone="meadow">{fish.biome}</Badge>
      </div>
      <p className="text-sm text-mist">{fish.desc}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {fishTier.map((tier, i) => (
          <div
            key={tier.key}
            className="flex flex-col items-center gap-1.5 rounded-check border border-edge/70 bg-sky/50 p-3"
          >
            <div className="flex h-12 w-12 items-center justify-center">
              <Pixel
                src={`/fishing/fish/${fish.texture}${tier.key !== 'normal' ? `_${tier.key}_star` : ''}.png`}
                alt={`${fish.name} ${tier.label}`}
              />
            </div>
            <Badge tone={tier.tone}>{tier.label}</Badge>
            <div className="text-center text-xs leading-tight text-mist">
              <p>{fish.size[i]} cm</p>
              <p className="text-ink">{fish.price[i]} 币</p>
            </div>
          </div>
        ))}
      </div>

      {fish.note ? <p className="mt-3 text-xs text-soft">备注：{fish.note}</p> : null}
    </article>
  )
}

export function EquipCard({
  name,
  desc,
  effects,
  img,
  badge,
}: {
  name: string
  desc: string
  effects: string[]
  img?: string
  badge?: string
}) {
  return (
    <Card as="article">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {img ? (
            <span className="grid h-10 w-10 place-items-center rounded-check bg-sky/60">
              <Pixel src={img} alt={name} className="h-8 w-8" />
            </span>
          ) : null}
          <h3 className="text-lg font-semibold text-ink">{name}</h3>
        </div>
        {badge ? <Badge>{badge}</Badge> : null}
      </div>
      <p className="text-sm text-mist">{desc}</p>
      <ul className="mt-4 space-y-2">
        {effects.map((effect) => (
          <li key={effect} className="flex items-start gap-2 text-sm text-mist">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-meadow" />
            <span>{effect}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-ink">{title}</h2>
      {children}
    </div>
  )
}

export function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <dt className="text-soft">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  )
}

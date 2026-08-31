import type { ReactNode } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Icon } from '../../components/ui/Icon'
import type { Crop, Dish, Knife, Tool } from '../../content/farming'

/** 像素风贴图，16x16 放大显示 */
export function Pixel({
  src,
  alt,
  className = 'h-12 w-12',
  bare = false,
}: {
  src: string
  alt: string
  className?: string
  bare?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${className} flex-none object-contain [image-rendering:pixelated] ${bare ? '' : 'rounded-check border border-edge/70 bg-sky/60 p-1'}`}
    />
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

/** 营养/效果行 */
export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5 text-sm">
      <dt className="text-soft">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  )
}

/** 作物卡片 */
export function CropCard({ crop }: { crop: Crop }) {
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper">
      <div className="mb-3 flex items-center gap-3">
        <Pixel src={`/farming/item/${crop.texture}`} alt={crop.name} className="h-12 w-12" />
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-ink">{crop.name}</h3>
          {crop.nutrition ? <p className="text-xs text-soft">食用：{crop.nutrition}</p> : null}
        </div>
      </div>
      <p className="text-sm text-mist">{crop.desc}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {crop.seed ? (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-sky px-2.5 py-1 text-xs text-mist">
            <Pixel src={`/farming/item/${crop.seed.texture}`} alt={crop.seed.name} className="h-5 w-5" bare />
            {crop.seed.name}
          </span>
        ) : null}
        {crop.note ? <Badge tone="signal">{crop.note}</Badge> : null}
      </div>
    </article>
  )
}

/** 厨具卡片 */
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper">
      <div className="mb-3 flex items-center gap-3">
        <Pixel src={`/farming/${tool.texture}`} alt={tool.name} className="h-12 w-12" />
        <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
      </div>
      <p className="text-sm text-mist">{tool.desc}</p>
      <ul className="mt-4 space-y-2">
        {tool.effects.map((e) => (
          <li key={e} className="flex items-start gap-2 text-sm text-mist">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-meadow" />
            <span>{e}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-check border border-edge/70 bg-sky/40 p-3">
        <p className="mb-1.5 text-xs font-semibold text-ink">合成</p>
        <div className="flex flex-wrap gap-1.5">
          {tool.recipe.map((r) => (
            <span key={r} className="rounded-pill bg-cloud px-2.5 py-1 text-xs text-mist">
              {r}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

/** 刀具卡片 */
export function KnifeCard({ knife }: { knife: Knife }) {
  return (
    <article className="flex flex-col items-center rounded-check border border-edge bg-cloud p-5 text-center shadow-whisper">
      <Pixel src={`/farming/${knife.texture}`} alt={knife.name} className="h-14 w-14" />
      <h3 className="mt-3 text-base font-semibold text-ink">{knife.name}</h3>
      <dl className="mt-3 w-full space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-soft">攻击</dt>
          <dd className="text-ink">{knife.damage}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-soft">耐久</dt>
          <dd className="text-ink">{knife.durability}</dd>
        </div>
      </dl>
    </article>
  )
}

/** 菜肴卡片 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="flex items-center gap-3 rounded-check border border-edge bg-cloud p-3.5 shadow-whisper">
      <Pixel src={`/farming/${dish.texture}`} alt={dish.name} className="h-12 w-12" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-medium text-ink">{dish.name}</h4>
          {dish.effect ? <Badge tone="meadow">{dish.effect}</Badge> : null}
        </div>
        <p className="mt-0.5 text-xs text-soft">
          饥饿 {dish.nutrition} · 饱和 {dish.saturation}
        </p>
      </div>
    </article>
  )
}

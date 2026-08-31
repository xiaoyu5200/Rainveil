import type { CraftingRecipe } from '../../content/farmingRecipes'
import { ITEMS, type ItemInfo } from '../../content/farmingRecipes'
import { Badge } from '../../components/ui/Badge'
import { Icon } from '../../components/ui/Icon'

type Catalog = Record<string, ItemInfo>

function SlotCell({ id, size = 'h-12 w-12', catalog }: { id: string | null; size?: string; catalog: Catalog }) {
  if (!id) {
    return <div className={`${size} flex-none rounded-check border border-dashed border-slate-400/60 bg-slate-200/70`} />
  }
  const info = catalog[id]
  if (!info) {
    return <div className={`${size} flex-none rounded-check border border-slate-400/50 bg-slate-300 p-1`} />
  }
  return (
    <div className={`group relative ${size} flex-none rounded-check border border-slate-400/50 bg-slate-300 p-0.5`}>
      <img
        src={info.texture}
        alt={info.name}
        loading="lazy"
        className="h-full w-full object-contain [image-rendering:pixelated]"
      />
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2 py-0.5 text-[11px] font-medium text-cloud opacity-0 shadow-float transition-opacity group-hover:opacity-100">
        {info.name}
      </span>
    </div>
  )
}

function InputGrid({ recipe, compact, catalog }: { recipe: CraftingRecipe; compact?: boolean; catalog: Catalog }) {
  const size = compact ? 'h-9 w-9' : 'h-12 w-12'
  if (recipe.type === 'crafting') {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }, (_, i) => (
          <SlotCell key={i} id={recipe.grid[i] ?? null} size={size} catalog={catalog} />
        ))}
      </div>
    )
  }
  if (recipe.type === 'smithing') {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {recipe.grid.slice(0, 3).map((s, i) => (
          <SlotCell key={i} id={s ?? null} size={size} catalog={catalog} />
        ))}
      </div>
    )
  }
  // smelting / smoking / campfire: single top input
  return <SlotCell id={recipe.grid[0] ?? null} size={size} catalog={catalog} />
}

function ResultSlot({ recipe, compact, catalog }: { recipe: CraftingRecipe; compact?: boolean; catalog: Catalog }) {
  const info = catalog[recipe.result]
  const name = info?.name ?? recipe.name
  const box = compact ? 'h-12 w-12' : 'h-16 w-16'
  return (
    <div className={`group relative ${box} flex-none rounded-check border-2 border-slate-400/60 bg-slate-200 p-1 shadow-whisper`}>
      <img
        src={info?.texture}
        alt={name}
        loading="lazy"
        className="h-full w-full object-contain [image-rendering:pixelated]"
      />
      {recipe.count > 1 ? (
        <span className="absolute -right-1.5 -top-1.5 rounded-pill bg-ink px-1.5 py-0.5 text-[11px] font-semibold text-cloud shadow-whisper">
          {recipe.count}
        </span>
      ) : null}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2 py-0.5 text-[11px] font-medium text-cloud opacity-0 shadow-float transition-opacity group-hover:opacity-100">
        {name}
      </span>
    </div>
  )
}

/** 配方格子视图：原料格 → 箭头 → 结果（可独立嵌入卡片使用） */
export function RecipeGrid({ recipe, compact, catalog = ITEMS }: { recipe: CraftingRecipe; compact?: boolean; catalog?: Catalog }) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <InputGrid recipe={recipe} compact={compact} catalog={catalog} />
      <div className="flex flex-col items-center gap-0.5 text-soft">
        <Icon name="arrow-right" className="h-4 w-4" />
        <span className="text-[11px]">产出</span>
      </div>
      <ResultSlot recipe={recipe} compact={compact} catalog={catalog} />
    </div>
  )
}

export function RecipeCard({ recipe, catalog = ITEMS }: { recipe: CraftingRecipe; catalog?: Catalog }) {
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper transition-shadow hover:shadow-float">
      <header className="mb-4 flex items-center gap-2">
        <h3 className="font-semibold text-ink">{recipe.name}</h3>
        <Badge tone="signal" className="ml-auto">
          {recipe.station}
        </Badge>
      </header>

      <RecipeGrid recipe={recipe} catalog={catalog} />

      <p className="mt-4 text-center text-xs text-soft">
        {recipe.shapeless ? '无序合成，原料可任意摆放' : '按上方布局摆放原料即可合成'}
      </p>
    </article>
  )
}

import type { CookingRecipe } from '../../content/packTypes'
import { ITEMS, type ItemInfo } from '../../content/farmingRecipes'
import { Badge } from '../../components/ui/Badge'
import { Icon } from '../../components/ui/Icon'

type Catalog = Record<string, ItemInfo>

function IngCell({ id, catalog }: { id: string; catalog: Catalog }) {
  const info = catalog[id]
  if (!info) {
    return (
      <div className="group relative flex h-10 w-10 flex-none items-center justify-center rounded-check border border-slate-400/50 bg-slate-300/60 p-0.5 text-[10px] text-mist">
        {id.split(':').pop()?.slice(0, 4)}
      </div>
    )
  }
  return (
    <div className="group relative h-10 w-10 flex-none rounded-check border border-slate-400/50 bg-slate-300 p-0.5">
      <img src={info.texture} alt={info.name} loading="lazy" className="h-full w-full object-contain [image-rendering:pixelated]" />
      <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2 py-0.5 text-[11px] font-medium text-cloud opacity-0 shadow-float transition-opacity group-hover:opacity-100">
        {info.name}
      </span>
    </div>
  )
}

/** 厨锅烹饪配方：2x3 原料格 → 箭头 → 厨锅 · 结果 */
export function CookingPotCard({ recipe, catalog = ITEMS }: { recipe: CookingRecipe; catalog?: Catalog }) {
  const result = catalog[recipe.result]
  const ing = recipe.ingredients.slice(0, 6)
  const potLabel = recipe.container ? catalog[recipe.container]?.name ?? '碗' : '厨锅'
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper transition-shadow hover:shadow-float">
      <header className="mb-4 flex items-center gap-2">
        <h3 className="font-semibold text-ink">{result?.name ?? recipe.name}</h3>
        <Badge tone="citrus" className="ml-auto">
          厨锅烹饪
        </Badge>
      </header>

      <div className="flex items-center justify-center gap-3">
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }, (_, i) => {
            const id = ing[i]
            return id ? <IngCell key={i} id={id} catalog={catalog} /> : <div key={i} className="h-10 w-10 flex-none rounded-check border border-dashed border-slate-400/50 bg-slate-200/70" />
          })}
        </div>

        <div className="flex flex-col items-center gap-0.5 text-soft">
          <Icon name="arrow-right" className="h-4 w-4" />
          <span className="text-[11px]">烹饪</span>
        </div>

        <div className="group relative h-14 w-14 flex-none rounded-check border-2 border-slate-400/60 bg-slate-200 p-1 shadow-whisper">
          {result ? (
            <img src={result.texture} alt={result.name} loading="lazy" className="h-full w-full object-contain [image-rendering:pixelated]" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] text-mist">结果</span>
          )}
          <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-pill bg-ink px-2 py-0.5 text-[11px] font-medium text-cloud opacity-0 shadow-float transition-opacity group-hover:opacity-100">
            {result?.name ?? recipe.name}
          </span>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-soft">
        放入厨锅（下方需热源）烹饪 {recipe.cookingtime > 0 ? `约 ${Math.round(recipe.cookingtime / 20)} 秒` : ''}，需容器：{potLabel}
      </p>
    </article>
  )
}

import type { CraftingRecipe } from '../../content/farmingRecipes'
import { ITEMS } from '../../content/farmingRecipes'
import { Badge } from '../../components/ui/Badge'
import { Icon } from '../../components/ui/Icon'

function SlotCell({ id, size = 'h-12 w-12' }: { id: string | null; size?: string }) {
  if (!id) {
    return <div className={`${size} flex-none rounded-check border border-dashed border-edge bg-sky/30`} />
  }
  const info = ITEMS[id]
  if (!info) {
    return <div className={`${size} flex-none rounded-check border border-edge bg-sky/60 p-1`} />
  }
  return (
    <div className={`group relative ${size} flex-none rounded-check border border-edge bg-sky/60 p-1`}>
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

function InputGrid({ recipe }: { recipe: CraftingRecipe }) {
  if (recipe.type === 'crafting') {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }, (_, i) => (
          <SlotCell key={i} id={recipe.grid[i] ?? null} />
        ))}
      </div>
    )
  }
  if (recipe.type === 'smithing') {
    return (
      <div className="grid grid-cols-3 gap-1.5">
        {recipe.grid.slice(0, 3).map((s, i) => (
          <SlotCell key={i} id={s ?? null} />
        ))}
      </div>
    )
  }
  // smelting / smoking / campfire: single top input
  return <SlotCell id={recipe.grid[0] ?? null} />
}

function ResultSlot({ recipe }: { recipe: CraftingRecipe }) {
  const info = ITEMS[recipe.result]
  const name = info?.name ?? recipe.name
  return (
    <div className="group relative h-16 w-16 flex-none rounded-check border-2 border-ink/15 bg-cloud p-1 shadow-whisper">
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

export function RecipeCard({ recipe }: { recipe: CraftingRecipe }) {
  return (
    <article className="flex flex-col rounded-check border border-edge bg-cloud p-5 shadow-whisper transition-shadow hover:shadow-float">
      <header className="mb-4 flex items-center gap-2">
        <h3 className="font-semibold text-ink">{recipe.name}</h3>
        <Badge tone="signal" className="ml-auto">
          {recipe.station}
        </Badge>
      </header>

      <div className="flex items-center justify-center gap-3">
        <InputGrid recipe={recipe} />
        <div className="flex flex-col items-center gap-1 text-soft">
          <Icon name="arrow-right" className="h-5 w-5" />
          <span className="text-[11px]">产出</span>
        </div>
        <ResultSlot recipe={recipe} />
      </div>

      <p className="mt-4 text-center text-xs text-soft">
        {recipe.shapeless ? '无序合成，原料可任意摆放' : '按上方布局摆放原料即可合成'}
      </p>
    </article>
  )
}

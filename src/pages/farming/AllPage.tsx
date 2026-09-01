import { useMemo, useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { ALL_ITEMS } from '../../content/allItems'
import { RECIPES } from '../../content/farmingRecipes'
import { allPacks, FARMING_COOKING } from '../../content/packs'
import { COOKING_BY_PACK } from '../../content/cooking'
import { coalesceRecipes } from '../../content/coalesce'
import { RecipeCard } from './RecipeCard'
import { CookingPotCard } from './CookingPotCard'

function matches(q: string, name: string, id: string) {
  if (!q) return true
  const s = q.toLowerCase()
  return name.toLowerCase().includes(s) || id.toLowerCase().includes(s)
}

export function AllPage() {
  const [q, setQ] = useState('')

  const items = useMemo(() => Object.entries(ALL_ITEMS), [])
  const shownItems = items.filter(([id, it]) => matches(q, it.name, id))

  const recipes = useMemo(
    () => coalesceRecipes([...RECIPES, ...allPacks.flatMap((p) => p.recipes)]),
    [],
  )
  const shownRecipes = recipes.filter((r) => matches(q, r.name, r.result))

  const cooking = useMemo(
    () => [...FARMING_COOKING, ...Object.values(COOKING_BY_PACK).flat()],
    [],
  )
  const shownCooking = cooking.filter((c) => matches(q, c.name, c.result))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-check border border-edge bg-cloud p-5 shadow-whisper sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-sm text-mist">
            全量图鉴：搜索可筛选所有物品、合成配方与厨锅烹饪配方。
          </p>
        </div>
        <label className="relative flex-none sm:w-72">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索物品 / 配方名称"
            className="w-full rounded-pill border border-edge bg-sky/60 py-2 pl-9 pr-4 text-sm text-ink placeholder:text-soft focus:border-signal"
          />
        </label>
      </div>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-ink">全部物品</h2>
          <span className="text-sm text-soft">{shownItems.length} 个</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shownItems.slice(0, 200).map(([id, it]) => (
            <article key={id} className="flex items-center gap-3 rounded-check border border-edge bg-cloud p-3 shadow-whisper">
              <img
                src={it.texture}
                alt={it.name}
                loading="lazy"
                className="h-10 w-10 flex-none rounded-check border border-edge/70 bg-sky/60 object-contain p-0.5 [image-rendering:pixelated]"
              />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-medium text-ink">{it.name}</h3>
                <p className="truncate text-[11px] text-soft">{id}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {shownRecipes.length > 0 ? (
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-ink">合成配方</h2>
            <span className="text-sm text-soft">{shownRecipes.length} 条</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shownRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} catalog={ALL_ITEMS} />
            ))}
          </div>
        </section>
      ) : null}

      {shownCooking.length > 0 ? (
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold text-ink">厨锅烹饪</h2>
            <span className="text-sm text-soft">{shownCooking.length} 条</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shownCooking.map((c, i) => (
              <CookingPotCard key={c.result + i} recipe={c} catalog={ALL_ITEMS} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

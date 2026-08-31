import { useMemo } from 'react'
import type { ContentPack, PackItem } from '../../content/packTypes'
import { ALL_ITEMS } from '../../content/allItems'
import { coalesceRecipes } from '../../content/coalesce'
import { RecipeCard } from './RecipeCard'
import { CookingPotCard } from './CookingPotCard'

const GROUP_LABEL: Record<string, string> = {
  crop: '作物',
  ingredient: '食材',
  food: '食物',
  block: '方块与家具',
  item: '物品',
}

function ItemCard({ item }: { item: PackItem }) {
  return (
    <article className="flex items-center gap-3 rounded-check border border-edge bg-cloud p-3.5 shadow-whisper">
      <img
        src={item.texture}
        alt={item.name}
        loading="lazy"
        className="h-12 w-12 flex-none rounded-check border border-edge/70 bg-sky/60 object-contain p-1 [image-rendering:pixelated]"
      />
      <div className="min-w-0">
        <h4 className="truncate font-medium text-ink">{item.name}</h4>
        <p className="text-xs text-soft">{item.id.split(':').pop()}</p>
      </div>
    </article>
  )
}

/** 内容包正文：物品分组 + 合成表 + 厨锅烹饪 */
export function PackBody({ pack }: { pack: ContentPack }) {
  const groups = useMemo(() => {
    const order = ['crop', 'ingredient', 'food', 'block', 'item']
    const by = new Map<string, PackItem[]>()
    for (const it of pack.items) {
      const g = it.group || 'item'
      if (!by.has(g)) by.set(g, [])
      by.get(g)!.push(it)
    }
    return order.filter((g) => by.has(g)).map((g) => ({ key: g, items: by.get(g)! }))
  }, [pack])

  return (
    <div className="flex flex-col gap-8">
      {pack.blurb ? (
        <div className="rounded-check border border-edge bg-cloud p-5 shadow-whisper">
          <p className="text-sm text-mist">{pack.blurb}</p>
        </div>
      ) : null}

      {groups.map((g) => (
        <section key={g.key}>
          <h2 className="mb-4 text-xl font-semibold text-ink">{GROUP_LABEL[g.key] ?? g.key}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        </section>
      ))}

      {pack.recipes.length > 0 ? (
        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink">合成表</h2>
          <p className="mb-4 -mt-2 text-sm text-mist">该内容包的主要工作台/熔炉/营火/锻造台配方。</p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {coalesceRecipes(pack.recipes).map((r) => (
              <RecipeCard key={r.id} recipe={r} catalog={ALL_ITEMS} />
            ))}
          </div>
        </section>
      ) : null}

      {pack.cooking && pack.cooking.length > 0 ? (
        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink">厨锅烹饪</h2>
          <p className="mb-4 -mt-2 text-sm text-mist">将原料放入厨锅（下方需热源）即可烹饪出这些家常菜。</p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {pack.cooking.map((c, idx) => (
              <CookingPotCard key={c.result + idx} recipe={c} catalog={ALL_ITEMS} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

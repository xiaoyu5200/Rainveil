import { useState } from 'react'
import { foodCategories, tools, knives } from '../../content/farming'
import { RECIPES } from '../../content/farmingRecipes'
import { FARMING_COOKING } from '../../content/packs'
import { Badge } from '../../components/ui/Badge'
import { Block, DishCard } from './_shared'
import { RecipeCard } from './RecipeCard'
import { CookingPotCard } from './CookingPotCard'

type MethodFilter = '全部' | '厨锅烹饪' | '工作台合成'
const FILTERS: MethodFilter[] = ['全部', '厨锅烹饪', '工作台合成']

function isCrafted(id: string) {
  return RECIPES.some((r) => r.id === `farmersdelight:${id}`)
}

/** 已在厨具/刀具/菜肴/堆肥卡片上展示的配方（其结果 id） */
const SHOWN_ELSEWHERE = new Set<string>([
  ...tools.map((t) => `farmersdelight:${t.id}`),
  ...knives.map((k) => `farmersdelight:${k.id}`),
  ...foodCategories.flatMap((c) => c.dishes.map((d) => `farmersdelight:${d.id}`)),
  'farmersdelight:organic_compost',
])

/** 剩余的基础加工与材料配方 */
const MATERIAL_RECIPES = RECIPES.filter((r) => !SHOWN_ELSEWHERE.has(r.result))

export function FarmingFoodsPage() {
  const [filter, setFilter] = useState<MethodFilter>('全部')

  const matches = (dish: { id: string }) =>
    filter === '全部' || (filter === '工作台合成' ? isCrafted(dish.id) : !isCrafted(dish.id))

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-check border border-edge bg-cloud p-5 shadow-whisper">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="signal">滋养效果</Badge>
          <Badge tone="citrus">厨锅烹饪</Badge>
          <Badge tone="meadow">工作台合成</Badge>
        </div>
        <p className="text-sm text-mist">
          汤饭、拼盘与盛宴需要用厨锅（下方放置热源）烹饪；汉堡、三明治、沙拉等则在工作台直接合成。部分菜肴还附带「滋养」等效果，持续期间不会消耗饥饿值。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-pill bg-cloud p-2 shadow-whisper">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              filter === f ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {foodCategories.map((cat) => {
        const dishes = cat.dishes.filter(matches)
        if (dishes.length === 0) return null
        return (
          <Block key={cat.key} title={cat.label}>
            <p className="mb-4 -mt-2 text-sm text-mist">{cat.desc}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </Block>
        )
      })}

      <Block title="厨锅烹饪配方">
        <p className="mb-4 -mt-2 text-sm text-mist">
          这些家常菜需要放入厨锅（下方放置热源）烹饪；配方为原料格 + 容器 + 烹饪时间。
        </p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {FARMING_COOKING.map((c, idx) => (
            <CookingPotCard key={c.result + idx} recipe={c} />
          ))}
        </div>
      </Block>

      <Block title="加工食材与材料">
        <p className="mb-4 -mt-2 text-sm text-mist">
          部分基础食材与材料可直接在工作台或熔炉/营火加工，是后续菜肴的原料。
        </p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {MATERIAL_RECIPES.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </Block>
    </div>
  )
}

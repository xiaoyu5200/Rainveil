import { useMemo, useState } from 'react'
import { RECIPES } from '../../content/farmingRecipes'
import { RecipeCard } from './RecipeCard'

const STATION_ORDER = ['工作台', '熔炉', '烟熏炉', '营火', '锻造台']

export function FarmingCraftingPage() {
  const stations = useMemo(() => {
    const present = Array.from(new Set(RECIPES.map((r) => r.station)))
    return ['全部', ...STATION_ORDER.filter((s) => present.includes(s))]
  }, [])
  const [active, setActive] = useState('全部')

  const shown = useMemo(
    () => (active === '全部' ? RECIPES : RECIPES.filter((r) => r.station === active)),
    [active],
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-check border border-edge bg-cloud p-5 shadow-whisper">
        <p className="text-sm text-mist">
          农夫乐事的核心合成表：从厨具、刀具到各类加工食材与主食，均可在工作台、熔炉、营火或锻造台完成。悬停任一格子可查看物品名称与数量。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-pill bg-cloud p-2 shadow-whisper">
        {stations.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              active === s ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  )
}

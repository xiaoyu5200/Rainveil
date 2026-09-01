import type { CraftingRecipe } from './farmingRecipes'

/** 把「结果+原料」相同的配方合并成一张，台子合并标注（熔炉 / 烟熏炉 / 营火）。 */
export function coalesceRecipes(recipes: CraftingRecipe[]): CraftingRecipe[] {
  const byKey = new Map<string, CraftingRecipe>()
  for (const r of recipes) {
    const key = r.result + '|' + JSON.stringify(r.grid)
    const existing = byKey.get(key)
    if (!existing) {
      byKey.set(key, { ...r })
    } else {
      const stations = existing.station.split(' / ').filter(Boolean)
      if (!stations.includes(r.station)) stations.push(r.station)
      existing.station = stations.join(' / ')
    }
  }
  return Array.from(byKey.values())
}

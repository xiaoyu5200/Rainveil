import { ITEMS, type ItemInfo } from './farmingRecipes'
import { crops, wildCrops, soil, tools, knives, foodCategories } from './farming'
import { allPacks } from './packs'

/**
 * 统一物品目录：农夫乐事全部物品 + 各内容包物品 + 原版物品。
 * 所有配方格子 / 厨锅烹饪组件默认用这个目录解析图标。
 */
export const ALL_ITEMS: Record<string, ItemInfo> = { ...ITEMS }

export function _addAllItems() {
  for (const c of crops) ALL_ITEMS[`farmersdelight:${c.id}`] = { name: c.name, texture: `/farming/item/${c.texture}` }
  for (const w of wildCrops) ALL_ITEMS[`farmersdelight:${w.id}`] = { name: w.name, texture: `/farming/${w.texture}` }
  for (const t of tools) ALL_ITEMS[`farmersdelight:${t.id}`] = { name: t.name, texture: `/farming/${t.texture}` }
  for (const k of knives) ALL_ITEMS[`farmersdelight:${k.id}`] = { name: k.name, texture: `/farming/${k.texture}` }
  for (const c of foodCategories) for (const d of c.dishes) ALL_ITEMS[`farmersdelight:${d.id}`] = { name: d.name, texture: `/farming/${d.texture}` }
  ALL_ITEMS['farmersdelight:organic_compost'] = { name: soil.compost.name, texture: `/farming/${soil.compost.texture}` }
  ALL_ITEMS['farmersdelight:rich_soil'] = { name: soil.richSoil.name, texture: `/farming/${soil.richSoil.texture}` }
  ALL_ITEMS['farmersdelight:rich_soil_farmland'] = { name: soil.richFarmland.name, texture: `/farming/${soil.richFarmland.texture}` }
  for (const p of allPacks) for (const it of p.items) ALL_ITEMS[it.id] = { name: it.name, texture: it.texture }
}
_addAllItems()

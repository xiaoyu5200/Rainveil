import type { CraftingRecipe } from './farmingRecipes'

export interface PackItem {
  /** 物品 id（含命名空间，如 corn_delight:corn） */
  id: string
  /** 中文名 */
  name: string
  /** 贴图路径，如 /corn/item/corn.png */
  texture: string
  /** 分组：crop / ingredient / food / feast / block / item */
  group: string
  /** 简短说明（可选） */
  desc?: string
}

export interface ContentPack {
  /** 路由 slug，如 corn */
  key: string
  /** CE 命名空间，如 corn_delight */
  namespace: string
  /** 展示名，如 玉米乐事 */
  name: string
  /** 一句话简介 */
  blurb: string
  /** 分区（页面标题+说明） */
  sections: { key: string; label: string; desc: string; group: string[] }[]
  items: PackItem[]
  recipes: CraftingRecipe[]
}

import type { ContentPack, PackItem } from '../packTypes'
import type { CraftingRecipe } from '../farmingRecipes'

const items: PackItem[] = [{"id": "chicken_changezi:chicken_changezi_block", "name": "成吉思鸡", "texture": "/chicken/item/chicken_changezi_block.png", "group": "item"}, {"id": "chicken_changezi:chicken_changezi", "name": "盘装成吉思鸡", "texture": "/chicken/item/chicken_changezi.png", "group": "item"}]
const recipes: CraftingRecipe[] = []
const sections: { key: string; label: string; desc: string; group: string[] }[] = [{"key": "item", "label": "物品", "desc": "", "group": ["item"]}]

export const pack: ContentPack = {
  key: "chicken",
  namespace: "chicken_changezi",
  name: "鸡块换子",
  blurb: "轻量小食与鸡肉小点，适合随时解馋。",
  sections,
  items,
  recipes,
}

// 农夫乐事（Farmer's Delight）玩法真实数据，来源于服务器 CE 内容包 v0.10.7。
// 贴图已复制到 public/farming/item/ 与 public/farming/block/，按文件名引用。

// ===================== 作物 =====================
export interface Crop {
  id: string
  name: string
  desc: string
  /** 物品贴图（相对 /farming/item/） */
  texture: string
  /** 直接食用：饥饿 / 饱和 */
  nutrition?: string
  /** 种子信息 */
  seed?: { name: string; texture: string }
  note?: string
}

export const crops: Crop[] = [
  {
    id: 'cabbage',
    name: '卷心菜',
    desc: '海滩沿岸最常见的绿叶蔬菜，切片后可入菜或做成卷心菜卷。',
    texture: 'cabbage.png',
    nutrition: '2 / 1.6',
    seed: { name: '卷心菜种子', texture: 'cabbage_seeds.png' },
  },
  {
    id: 'tomato',
    name: '番茄',
    desc: '干旱地区灌木上结出的果实，可做番茄酱、沙拉与三明治的百搭食材。',
    texture: 'tomato.png',
    nutrition: '1 / 0.6',
    seed: { name: '番茄种子', texture: 'tomato_seeds.png' },
    note: '用绳挂在藤蔓上可长更高，收获更多',
  },
  {
    id: 'onion',
    name: '洋葱',
    desc: '温带平原常见的辛辣作物，炖菜与拼盘的提味担当。',
    texture: 'onion.png',
    nutrition: '2 / 0.4',
    note: '无需种子，直接种植洋葱即可',
  },
  {
    id: 'rice',
    name: '稻米',
    desc: '只能在浅水洼里生长的谷物，去壳后得到稻米穗，可煮成米饭。',
    texture: 'rice.png',
    seed: { name: '稻米穗', texture: 'rice_panicle.png' },
    note: '需种在水里（水洼），否则无法存活',
  },
]

// ===================== 野生作物 =====================
export interface WildCrop {
  id: string
  name: string
  biome: string
  desc: string
  texture: string
  drops: string[]
}

export const wildCrops: WildCrop[] = [
  {
    id: 'wild_cabbages', name: '野生卷心菜', biome: '海滩沿岸',
    desc: '常在海滩沿岸生长，破坏后掉落卷心菜。',
    texture: 'block/wild_cabbages.png',
    drops: ['卷心菜', '卷心菜种子'],
  },
  {
    id: 'wild_tomatoes', name: '番茄灌木', biome: '干旱地区',
    desc: '常出现在热带草原与沙漠，掉落番茄。',
    texture: 'block/wild_tomatoes.png',
    drops: ['番茄', '番茄种子'],
  },
  {
    id: 'wild_onions', name: '野生洋葱', biome: '温带地区',
    desc: '平原与森林中可见，掉落洋葱。',
    texture: 'block/wild_onions.png',
    drops: ['洋葱'],
  },
  {
    id: 'wild_carrots', name: '野生胡萝卜', biome: '温带地区',
    desc: '平原与森林中可见，掉落胡萝卜。',
    texture: 'block/wild_carrots.png',
    drops: ['胡萝卜'],
  },
  {
    id: 'wild_potatoes', name: '野生马铃薯', biome: '寒冷地区',
    desc: '山地与针叶林中可见，掉落马铃薯。',
    texture: 'block/wild_potatoes.png',
    drops: ['马铃薯'],
  },
  {
    id: 'wild_beetroots', name: '海甜菜', biome: '海滩沿岸',
    desc: '海滩沿岸的野生甜菜根，掉落甜菜根与种子。',
    texture: 'block/wild_beetroots.png',
    drops: ['甜菜根', '甜菜根种子'],
  },
  {
    id: 'wild_rice', name: '野生稻米', biome: '湿地池塘',
    desc: '沼泽与丛林的浅水池塘里可见，掉落稻米。',
    texture: 'block/wild_rice_top.png',
    drops: ['稻米'],
  },
]

// ===================== 土壤与堆肥 =====================
export const soil = {
  compost: {
    name: '有机堆肥',
    texture: 'block/organic_compost_stage3.png',
    desc: '由泥土、腐肉、草秆与骨粉合成的堆肥，放置后会随时间分解，最终变成沃土。',
    recipe: ['泥土 x1', '腐肉 x2', '草秆 x2', '骨粉 x4'],
    note: '有日光、水或蘑菇催化时分解更快',
  },
  richSoil: {
    name: '沃土',
    texture: 'block/rich_soil.png',
    desc: '有机堆肥分解后的产物，种在上面的作物生长速度更快。',
  },
  richFarmland: {
    name: '沃土耕地',
    texture: 'block/rich_soil_farmland.png',
    desc: '用锄头开垦沃土得到，兼具耕地与沃土的双重加速。',
  },
  colonies: [
    {
      name: '棕色蘑菇菌落',
      texture: 'block/brown_mushroom_colony_stage3.png',
      desc: '在暗处的沃土上种植蘑菇，菌落会缓慢生长，成熟后可用剪刀收获。',
    },
    {
      name: '红色蘑菇菌落',
      texture: 'block/red_mushroom_colony_stage3.png',
      desc: '红色蘑菇在暗处沃土上长成的菌落，同样可收获。',
    },
  ],
}

// ===================== 厨具 =====================
export interface Tool {
  id: string
  name: string
  desc: string
  effects: string[]
  recipe: string[]
  texture: string
}

export const tools: Tool[] = [
  {
    id: 'cooking_pot',
    name: '厨锅',
    desc: '农夫乐事的核心厨具，把食材与汤底丢进去，配合下方热源即可炖出营养丰富的汤饭。',
    effects: ['制作汤饭、炖菜、拼盘', '需下方有热源（炉灶 / 营火等）', '炖煮过程中可见蒸汽'],
    recipe: ['砖 x2', '木铲 x1', '铁锭 x3', '水桶 x1'],
    texture: 'item/cooking_pot.png',
  },
  {
    id: 'cutting_board',
    name: '砧板',
    desc: '把食材放上去，用刀或工具切分，得到切片、肉丁、面团等加工食材。',
    effects: ['切分食材为加工食材', '平放于地面使用', '配合刀或对应工具'],
    recipe: ['木棍 x2', '任意木板 x4'],
    texture: 'block/cutting_board.png',
  },
  {
    id: 'skillet',
    name: '煎锅',
    desc: '潜行放置为方块，手持食材靠近热源即可煎制；也能拿在手上直接煎。',
    effects: ['煎制肉类与鸡蛋', '潜行可放置为方块', '煎制时滋滋作响'],
    recipe: ['铁锭 x4', '砖 x1'],
    texture: 'block/skillet_top.png',
  },
  {
    id: 'stove',
    name: '炉灶',
    desc: '整合了营火的稳定热源，放在厨锅或煎锅下方即可持续加热。',
    effects: ['为厨锅 / 煎锅供热', '比营火更稳定美观', '燃烧时噼啪作响'],
    recipe: ['铁锭 x3', '砖 x3', '营火 x1'],
    texture: 'block/stove_front.png',
  },
]

// ===================== 刀具 =====================
export interface Knife {
  id: string
  name: string
  material: string
  damage: string
  durability: number
  texture: string
}

export const knives: Knife[] = [
  { id: 'flint_knife', name: '燧石刀', material: '燧石', damage: '2.5', durability: 131, texture: 'item/flint_knife.png' },
  { id: 'copper_knife', name: '铜刀', material: '铜锭', damage: '2.5', durability: 190, texture: 'item/copper_knife.png' },
  { id: 'iron_knife', name: '铁刀', material: '铁锭', damage: '3.5', durability: 250, texture: 'item/iron_knife.png' },
  { id: 'diamond_knife', name: '钻石刀', material: '钻石', damage: '4.5', durability: 1561, texture: 'item/diamond_knife.png' },
  { id: 'netherite_knife', name: '下界合金刀', material: '下界合金锭', damage: '5.5', durability: 2031, texture: 'item/netherite_knife.png' },
  { id: 'golden_knife', name: '金刀', material: '金锭', damage: '1.5', durability: 32, texture: 'item/golden_knife.png' },
]

// ===================== 食谱 =====================
export interface Dish {
  id: string
  name: string
  nutrition: number
  saturation: number
  /** 额外效果，例如「滋养 3:00」或「再生」 */
  effect?: string
  texture: string
}

export interface FoodCategory {
  key: string
  label: string
  desc: string
  dishes: Dish[]
}

export const foodCategories: FoodCategory[] = [
  {
    key: 'soup',
    label: '汤饭炖菜',
    desc: '用厨锅炖煮，碗装食用，通常附带「滋养」效果——一段时间内不再消耗饥饿值。',
    dishes: [
      { id: 'cooked_rice', name: '米饭', nutrition: 6, saturation: 4.8, effect: '滋养 0:30', texture: 'item/cooked_rice.png' },
      { id: 'bone_broth', name: '大骨汤', nutrition: 8, saturation: 11.2, effect: '滋养 1:00', texture: 'item/bone_broth.png' },
      { id: 'onion_soup', name: '洋葱汤', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/onion_soup.png' },
      { id: 'beef_stew', name: '牛肉炖', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/beef_stew.png' },
      { id: 'chicken_soup', name: '鸡肉汤', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/chicken_soup.png' },
      { id: 'vegetable_soup', name: '蔬菜汤', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/vegetable_soup.png' },
      { id: 'fish_stew', name: '鱼肉炖', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/fish_stew.png' },
      { id: 'fried_rice', name: '炒饭', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/fried_rice.png' },
      { id: 'pumpkin_soup', name: '南瓜汤', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/pumpkin_soup.png' },
      { id: 'baked_cod_stew', name: '烘焙鳕鱼炖', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/baked_cod_stew.png' },
      { id: 'noodle_soup', name: '面条汤', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/noodle_soup.png' },
    ],
  },
  {
    key: 'plate',
    label: '碗装拼盘',
    desc: '主食 + 配菜的丰盛拼盘，饱食度高，同样附带「滋养」效果。',
    dishes: [
      { id: 'bacon_and_eggs', name: '培根蛋', nutrition: 10, saturation: 12, effect: '滋养 1:00', texture: 'item/bacon_and_eggs.png' },
      { id: 'ratatouille', name: '蔬菜杂烩', nutrition: 10, saturation: 12, effect: '滋养 1:00', texture: 'item/ratatouille.png' },
      { id: 'pasta_with_meatballs', name: '肉丸意面', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/pasta_with_meatballs.png' },
      { id: 'pasta_with_mutton_chop', name: '羊排意面', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/pasta_with_mutton_chop.png' },
      { id: 'mushroom_rice', name: '蘑菇饭', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/mushroom_rice.png' },
      { id: 'steak_and_potatoes', name: '牛排配马铃薯', nutrition: 12, saturation: 19.2, effect: '滋养 3:00', texture: 'item/steak_and_potatoes.png' },
      { id: 'grilled_salmon', name: '香烤鲑鱼', nutrition: 14, saturation: 21, effect: '滋养 3:00', texture: 'item/grilled_salmon.png' },
      { id: 'roasted_mutton_chops', name: '烤羊排', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/roasted_mutton_chops.png' },
      { id: 'vegetable_noodles', name: '蔬菜面', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/vegetable_noodles.png' },
      { id: 'squid_ink_pasta', name: '鱿鱼墨面', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/squid_ink_pasta.png' },
    ],
  },
  {
    key: 'handheld',
    label: '手持食物',
    desc: '无需碗盘、拿在手里就能吃的主食，方便随身携带。',
    dishes: [
      { id: 'cabbage_rolls', name: '卷心菜卷', nutrition: 5, saturation: 5, texture: 'item/cabbage_rolls.png' },
      { id: 'cod_roll', name: '鳕鱼寿司', nutrition: 7, saturation: 8.4, texture: 'item/cod_roll.png' },
      { id: 'salmon_roll', name: '鲑鱼寿司', nutrition: 7, saturation: 8.4, texture: 'item/salmon_roll.png' },
      { id: 'barbecue_stick', name: '烧烤串', nutrition: 8, saturation: 14.4, texture: 'item/barbecue_stick.png' },
      { id: 'egg_sandwich', name: '夹蛋三明治', nutrition: 8, saturation: 12.8, texture: 'item/egg_sandwich.png' },
      { id: 'dumplings', name: '饺子', nutrition: 8, saturation: 12.8, texture: 'item/dumplings.png' },
      { id: 'chicken_sandwich', name: '鸡肉三明治', nutrition: 10, saturation: 16, texture: 'item/chicken_sandwich.png' },
      { id: 'bacon_sandwich', name: '培根三明治', nutrition: 10, saturation: 16, texture: 'item/bacon_sandwich.png' },
      { id: 'mutton_wrap', name: '羊肉卷饼', nutrition: 10, saturation: 16, texture: 'item/mutton_wrap.png' },
      { id: 'stuffed_potato', name: '填馅马铃薯', nutrition: 10, saturation: 14, texture: 'item/stuffed_potato.png' },
      { id: 'hamburger', name: '汉堡包', nutrition: 11, saturation: 17.6, texture: 'item/hamburger.png' },
      { id: 'kelp_roll', name: '海带寿司卷', nutrition: 12, saturation: 12, texture: 'item/kelp_roll.png' },
      { id: 'kelp_roll_slice', name: '海带寿司', nutrition: 6, saturation: 6, texture: 'item/kelp_roll_slice.png' },
    ],
  },
  {
    key: 'salad',
    label: '沙拉',
    desc: '清爽的碗装沙拉，通常附带再生等原版效果。',
    dishes: [
      { id: 'mixed_salad', name: '混合沙拉', nutrition: 6, saturation: 7.2, effect: '再生 0:05', texture: 'item/mixed_salad.png' },
      { id: 'fruit_salad', name: '水果沙拉', nutrition: 6, saturation: 7.2, effect: '再生 0:05', texture: 'item/fruit_salad.png' },
      { id: 'nether_salad', name: '下界沙拉', nutrition: 5, saturation: 4, effect: '30% 恶心', texture: 'item/nether_salad.png' },
    ],
  },
  {
    key: 'dessert',
    label: '甜点与派',
    desc: '甜口小食与派切片，多数附带短暂的加速效果。',
    dishes: [
      { id: 'cake_slice', name: '蛋糕切片', nutrition: 2, saturation: 0.4, effect: '加速 0:20', texture: 'item/cake_slice.png' },
      { id: 'sweet_berry_cookie', name: '甜浆果曲奇', nutrition: 2, saturation: 0.4, texture: 'item/sweet_berry_cookie.png' },
      { id: 'honey_cookie', name: '蜂蜜曲奇', nutrition: 2, saturation: 0.4, texture: 'item/honey_cookie.png' },
      { id: 'apple_pie_slice', name: '苹果派切片', nutrition: 3, saturation: 1.8, effect: '加速 0:30', texture: 'item/apple_pie_slice.png' },
      { id: 'chocolate_pie_slice', name: '巧克力派切片', nutrition: 3, saturation: 1.8, effect: '加速 0:30', texture: 'item/chocolate_pie_slice.png' },
      { id: 'pumpkin_pie_slice', name: '南瓜派切片', nutrition: 3, saturation: 1.8, effect: '加速 0:30', texture: 'item/pumpkin_pie_slice.png' },
      { id: 'sweet_berry_cheesecake_slice', name: '甜浆果芝士派切片', nutrition: 3, saturation: 1.8, effect: '加速 0:30', texture: 'item/sweet_berry_cheesecake_slice.png' },
      { id: 'melon_popsicle', name: '西瓜冰棍', nutrition: 3, saturation: 1.2, effect: '可随时食用', texture: 'item/melon_popsicle.png' },
      { id: 'glow_berry_custard', name: '发光浆果蛋奶沙司', nutrition: 7, saturation: 8.4, effect: '发光 0:05', texture: 'item/glow_berry_custard.png' },
    ],
  },
  {
    key: 'drink',
    label: '饮品',
    desc: '瓶装饮品，喝完返还玻璃瓶，附带净身 / 回血等实用效果。',
    dishes: [
      { id: 'apple_cider', name: '苹果酒', nutrition: 0, saturation: 0, effect: '伤害吸收 1:00（+4）', texture: 'item/apple_cider.png' },
      { id: 'milk_bottle', name: '奶瓶', nutrition: 0, saturation: 0, effect: '清除 1 个效果', texture: 'item/milk_bottle.png' },
      { id: 'hot_cocoa', name: '热可可', nutrition: 0, saturation: 0, effect: '清除 1 个有害效果', texture: 'item/hot_cocoa.png' },
      { id: 'melon_juice', name: '西瓜汁', nutrition: 0, saturation: 0, effect: '瞬间回血 2', texture: 'item/melon_juice.png' },
    ],
  },
  {
    key: 'feast',
    label: '盛宴',
    desc: '可放置成方块、供多人分享的大菜，每份都附带长时间的「滋养」。',
    dishes: [
      { id: 'roast_chicken', name: '盘装烤鸡', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/roast_chicken.png' },
      { id: 'stuffed_pumpkin', name: '碗装填馅南瓜', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/stuffed_pumpkin.png' },
      { id: 'honey_glazed_ham', name: '盘装蜜汁火腿', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/honey_glazed_ham.png' },
      { id: 'shepherds_pie', name: '盘装牧羊人派', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/shepherds_pie.png' },
      { id: 'gleaming_salad', name: '碗装闪亮沙拉', nutrition: 14, saturation: 21, effect: '滋养 5:00', texture: 'item/gleaming_salad.png' },
    ],
  },
]

// ===================== 合成表 =====================

export type { CraftingRecipe } from './farmingRecipes'
export { RECIPES as craftingRecipes } from './farmingRecipes'

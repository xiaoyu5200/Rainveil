// 钓鱼玩法真实数据与贴图，来源于服务器 CustomFishing 插件。
// 贴图（CraftEngine）已复制到 public/fishing/,按 <texture>.png(普通) / _silver_star / _golden_star 三档命名。

export interface Fish {
  id: string
  name: string
  biome: string
  desc: string
  /** 贴图基准名(不含后缀),三档见文件注释 */
  texture: string
  /** [普通, 银星, 金星] 尺寸范围(cm) */
  size: string[]
  /** [普通, 银星, 金星] 基础价格 */
  price: number[]
  /** [普通, 银星, 金星] 价格加成系数 */
  bonus: number[]
  note?: string
}

export interface Rod {
  id: string
  name: string
  desc: string
  effects: string[]
  durability: number
}

export interface Bait {
  id: string
  name: string
  desc: string
  effects: string[]
}

export interface Hook {
  id: string
  name: string
  desc: string
  effects: string[]
  durability: number
}

export interface Totem {
  id: string
  name: string
  desc: string
  effects: string[]
  activate: string
  duration: string
  radius: string
  cost: string
  structure: { label: string; blocks: string }[]
  /** 3D 模型路径（GLB），用于在页面上展示图腾外观 */
  model?: string
}

export const fishTier = [
  { key: 'normal', label: '普通', tone: 'default' as const },
  { key: 'silver', label: '银星', tone: 'signal' as const },
  { key: 'golden', label: '金星', tone: 'citrus' as const },
]

export const fish: Fish[] = [
  {
    id: 'tuna', name: '金枪鱼', biome: '海洋', texture: 'tuna_fish',
    desc: '金枪鱼是一种健康的食物，也是海钓的热门目标。',
    size: ['15~50', '30~100', '80~190'], price: [30, 50, 80], bonus: [0.6, 0.6, 0.7],
    note: '金星尺寸可到 190cm',
  },
  {
    id: 'pike', name: '狗鱼', biome: '海洋', texture: 'pike_fish',
    desc: '喜欢栖息在咸水和淡水的交汇处，能在海水、半咸水和内陆淡水湖中生存。',
    size: ['5~15', '10~25', '15~30'], price: [30, 40, 50], bonus: [1.5, 1.5, 1.5],
  },
  {
    id: 'sardine', name: '沙丁鱼', biome: '海洋', texture: 'sardine_fish',
    desc: '富含 DHA，有助于改善记忆力，因此也被称为「健脑食物」。',
    size: ['1~5', '4~8', '7~14'], price: [10, 13, 15], bonus: [3.4, 3.4, 3.4],
  },
  {
    id: 'octopus', name: '章鱼', biome: '海洋', texture: 'octopus_fish',
    desc: '对各种器皿疯狂痴迷，人们经常使用罐子来捕捉它。',
    size: ['1~4', '4~12', '12~100'], price: [50, 50, 10], bonus: [2.2, 2.2, 1.5],
    note: '金星可达 100cm，但价格反而更低',
  },
  {
    id: 'sunfish', name: '翻车鱼', biome: '海洋', texture: 'sunfish_fish',
    desc: '只有一个巨大的头。',
    size: ['5~18', '17~28', '26~50'], price: [10, 18, 26], bonus: [1.5, 1.5, 1.5],
  },
  {
    id: 'red_snapper', name: '红鲷鱼', biome: '海洋', texture: 'red_spnapper_fish',
    desc: '通常有一个十到二十条鱼的大家庭，由一条雄鱼作为「大家长」。',
    size: ['1~4', '3~12', '9~18'], price: [10, 10, 10], bonus: [2.3, 2.3, 2.3],
    note: '银星一次可钓 7~9 条',
  },
  {
    id: 'blue_jellyfish', name: '蓝色水母', biome: '暖海', texture: 'blue_jellyfish',
    desc: '看起来像一把蓝色的伞。',
    size: ['1~3', '3~5', '5~10'], price: [20, 25, 30], bonus: [6.4, 7.2, 8],
  },
  {
    id: 'pink_jellyfish', name: '粉色水母', biome: '暖海', texture: 'pink_jellyfish',
    desc: '看起来甜甜的。',
    size: ['1~3', '3~5', '5~10'], price: [20, 25, 30], bonus: [6.4, 7.2, 8],
  },
  {
    id: 'gold_fish', name: '金鱼', biome: '河流', texture: 'gold_fish',
    desc: '世界上最著名的观赏鱼之一，起源于中国，已有 1700 多年历史。',
    size: ['2~3', '3~4', '4~7'], price: [70, 80, 100], bonus: [2.6, 3, 3.4],
    note: '体积小但单价高',
  },
  {
    id: 'perch', name: '鲈鱼', biome: '河流', texture: 'perch_fish',
    desc: '生活在各种栖息地，常在黄昏和清晨觅食。',
    size: ['5~12', '10~19', '20~39'], price: [10, 10, 10], bonus: [3, 3, 3],
  },
  {
    id: 'mullet', name: '鲻鱼', biome: '河流', texture: 'mullet_fish',
    desc: '用于中药治疗脾胃虚弱。',
    size: ['1~3', '4~9', '10~20'], price: [20, 30, 50], bonus: [1.5, 1.5, 1.5],
  },
  {
    id: 'carp', name: '鲤鱼', biome: '河流', texture: 'carp_fish',
    desc: '最常见的食用鱼之一。',
    size: ['7~19', '15~28', '27~48'], price: [10, 11, 12], bonus: [2, 2.1, 2.2],
  },
  {
    id: 'cat_fish', name: '鲶鱼', biome: '河流', texture: 'cat_fish',
    desc: '凶猛的肉食性鱼类，有着锋利的颌齿和短小的肠胃。',
    size: ['3~12', '10~28', '40~70'], price: [27, 14, 16], bonus: [1.8, 2.2, 2.2],
    note: '金星尺寸大但价格偏低',
  },
  {
    id: 'woodskip', name: '木跃鱼', biome: '沼泽', texture: 'woodskip_fish',
    desc: '一种非常敏感的鱼，只能生活在森林深处的池塘中。',
    size: ['3~7', '7~18', '16~29'], price: [10, 17, 25], bonus: [2.3, 2.5, 2.8],
  },
  {
    id: 'sturgeon', name: '鲟鱼', biome: '洞穴', texture: 'sturgeon_fish',
    desc: '一种古老的底栖鱼类，数量日益减少，雌鱼可活到 150 年。',
    size: ['1~5', '5~15', '15~30'], price: [200, 250, 300], bonus: [10, 10, 10],
    note: '最昂贵的鱼',
  },
  {
    id: 'salmon_void', name: '虚空鲑鱼', biome: '熔岩', texture: 'salmon_void_fish',
    desc: '来自地狱的鱼。它正在看着你……',
    size: ['8~10', '10~14', '12~18'], price: [20, 50, 100], bonus: [2.4, 2.6, 3],
    note: '需骨鱼竿在熔岩中钓',
  },
]

export const rods: Rod[] = [
  { id: 'beginner_rod', name: '初学者鱼竿', desc: '专为钓鱼新手设计，是新手垂钓者的最佳伙伴。', effects: ['增加等待时间', '降低钓鱼难度'], durability: 64 },
  { id: 'silver_rod', name: '银鱼竿', desc: '精心打造、光泽闪耀，是追求银星品质鱼类垂钓者的梦想。', effects: ['提高获得银星鱼类的几率'], durability: 96 },
  { id: 'golden_rod', name: '金鱼竿', desc: '在阳光下闪闪发光、散发着奢华气息，是高端钓鱼装备的典范。', effects: ['提高获得金星鱼类的几率'], durability: 80 },
  { id: 'star_rod', name: '星辰鱼竿', desc: '由星尘雕刻而成，沐浴在宇宙能量中，是宇宙奇迹的见证。', effects: ['+15 秒游戏时间'], durability: 128 },
  { id: 'bone_rod', name: '骨鱼竿', desc: '由古老骸骨锻造，注入了黑暗魔法。让勇敢者在炽热的岩浆中钓鱼。', effects: ['可在岩浆中钓鱼', '吸引骷髅'], durability: 32 },
  { id: 'magical_rod', name: '魔法鱼竿', desc: '独特的鱼竿，使用附魔书作为鱼饵，需要玩家拥有经验等级。', effects: ['从钓鱼中获得附魔书', '等待时间非常长'], durability: 16 },
  { id: 'master_rod', name: '大师鱼竿', desc: '只有最熟练的垂钓者才能驾驭，代表了钓鱼工艺的巅峰。', effects: ['减少等待时间', '增加钓鱼难度', '更高几率获得高品质鱼类'], durability: 128 },
]

export const baits: Bait[] = [
  { id: 'BOOK', name: '书', desc: '魔法鱼竿专用的鱼饵。', effects: ['供魔法鱼竿使用'] },
  { id: 'simple_bait', name: '简易鱼饵', desc: '由天然成分制成，能平静而稳定地吸引鱼类。', effects: ['降低钓鱼难度'] },
  { id: 'magnetic_bait', name: '磁力鱼饵', desc: '璀璨的光芒与独特能量脉冲让鱼类无法抗拒。', effects: ['减少等待时间', '更多钓鱼时间'] },
  { id: 'wild_bait', name: '野性鱼饵', desc: '为无畏的垂钓者打造，散发出对大型水生生物不可抗拒的香气。', effects: ['增加钓鱼难度', '增加捕获鱼类的尺寸'] },
]

export const hooks: Hook[] = [
  { id: 'delicate_hook', name: '精致鱼钩', desc: '抛光至完美、设计精巧，在水中闪闪发光，吸引高品质鱼类靠近。', effects: ['提高获得高品质鱼的几率（银星 / 金星）'], durability: 16 },
]

export const totems: Totem[] = [
  {
    id: 'double_loot_totem',
    name: '双倍战利品图腾',
    desc: '组装特定方块结构，在半径 8 格内让附近垂钓获得双倍战利品。',
    effects: ['双倍战利品（多重掉落 100%）'],
    activate: '主手持鹦鹉螺壳',
    duration: '300 秒',
    radius: '8 格',
    cost: '激活消耗 1 个鹦鹉螺壳',
    model: '/fishing/models/double_loot_totem.glb',
    structure: [
      { label: '第 1 层（地面）', blocks: '中间放铁砧，两侧可为空气 / 草方块 / 雪' },
      { label: '第 2 层', blocks: '铁砧正上方放一根竖直原木或柱子' },
      { label: '第 3 层', blocks: '核心方块：哭诉的黑曜石' },
      { label: '第 4 层（顶部）', blocks: '中间放朝南的侦测器，两侧各放一个上半台阶楼梯（一东一西）' },
    ],
  },
  {
    id: 'golden_star_totem',
    name: '金星图腾',
    desc: '以金块与避雷针搭建图腾，在半径 10 格内显著提高金星鱼类几率。',
    effects: ['金星鱼类几率 +15'],
    activate: '主手持金锭',
    duration: '120 秒',
    radius: '10 格',
    cost: '激活消耗 1 个金锭',
    model: '/fishing/models/golden_star_totem.glb',
    structure: [
      { label: '第 1 层（地面）', blocks: '用金块摆成十字：中心 1 块，四周各 1 块，共 5 块' },
      { label: '第 2 层', blocks: '中心放 1 块金块' },
      { label: '第 3 层', blocks: '中心放避雷针' },
      { label: '第 4 层（顶部）', blocks: '核心方块：中心放阳光传感器' },
    ],
  },
]

export const market = {
  priceFormula: '基础价 + 加成系数 × 尺寸(cm)',
  dailyLimit: 10000,
  currency: '金币',
  sellMode: '可在「鱼市」一键出售背包与钓鱼袋中的所有鱼',
  vanillaPrices: [
    { name: '鳕鱼', price: 10 },
    { name: '河豚', price: 10 },
    { name: '鲑鱼', price: 10 },
    { name: '热带鱼', price: 10 },
    { name: '纸（CMData:999）', price: 5 },
  ],
}

export const loot = {
  enchantBook: {
    intro: '钓鱼时有几率钓出附魔书，每本随机携带 1~3 个附魔（概率 60% / 30% / 10%），附魔等级 1~4 随机。',
    pools: [
      {
        label: '剑类',
        items: [
          ['锋利', '1~4'],
          ['亡灵杀手', '1~4'],
          ['节肢杀手', '1~4'],
          ['火焰附加', '1~2'],
          ['击退', '1~2'],
          ['抢夺', '1~3'],
        ],
      },
      {
        label: '弓弩',
        items: [
          ['力量', '1~4'],
          ['冲击', '1~2'],
          ['火矢', '1'],
          ['无限', '1'],
          ['多重射击', '1'],
          ['快速装填', '1'],
        ],
      },
      {
        label: '工具',
        items: [
          ['效率', '1~4'],
          ['时运', '1~3'],
          ['精准采集', '1'],
          ['耐久', '1~3'],
        ],
      },
      {
        label: '护甲',
        items: [
          ['保护', '1~3'],
          ['摔落保护', '1~3'],
          ['爆炸保护', '1~3'],
          ['火焰保护', '1~3'],
          ['弹射物保护', '1~3'],
          ['荆棘', '1~2'],
        ],
      },
      {
        label: '鞋类',
        items: [
          ['深海探索者', '1~3'],
          ['冰霜行者', '1'],
          ['灵魂疾行', '1~2'],
        ],
      },
      {
        label: '水下与特殊',
        items: [
          ['忠诚', '1~2'],
          ['引雷', '1'],
          ['海之眷顾', '1~3'],
          ['饵钓', '1~3'],
          ['经验修补', '1'],
        ],
      },
      {
        label: '诅咒',
        items: [
          ['绑定诅咒', '1'],
          ['消失诅咒', '1'],
        ],
      },
    ],
  },
  rainbowFish: { name: '彩虹鱼', texture: 'rainbow_fish', desc: '特殊钓鱼玩法可遇见的幻彩鱼，基础价 100。' },
  radioactive: { name: '放射性鱼类', texture: 'radioactive_fish', desc: '钓上来的“垃圾”——是时候保护环境了。' },
}

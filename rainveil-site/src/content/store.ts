import type { Plan } from './types'

export const plans: Plan[] = [
  {
    id: 'adventurer',
    name: '冒险者礼包',
    price: '30',
    per: '永久',
    perks: ['专属前缀称号', '家庭传送点 +1', '每日额外任务经验'],
  },
  {
    id: 'veteran',
    name: '资深玩家礼包',
    price: '68',
    per: '永久',
    perks: ['动态称号', '专属称号染色', '领地上限 +2', '专属飞行体验（生存世界）'],
  },
  {
    id: 'elite',
    name: '精英会员',
    price: '128',
    per: '永久',
    perks: ['进服全服欢迎公告', '宠物仓库扩容', '领地上限 +5', '每日专属礼包'],
  },
  {
    id: 'patron',
    name: '荣誉赞助',
    price: '298',
    per: '永久',
    perks: ['定制专属称号与头像框', '领地上限 +10', '高峰期优先排队', '加入赞助者专属群'],
  },
]

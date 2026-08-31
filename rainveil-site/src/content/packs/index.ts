import type { ContentPack } from '../packTypes'
import { COOKING_BY_PACK } from '../cooking'
import { pack as corn } from './corn'
import { pack as rustic } from './rustic'
import { pack as veggies } from './veggies'
import { pack as ends } from './ends'
import { pack as chicken } from './chicken'
import { pack as dumplings } from './dumplings'

const basePacks: ContentPack[] = [corn, rustic, veggies, ends, chicken, dumplings]

function withCooking(p: ContentPack): ContentPack {
  return { ...p, cooking: COOKING_BY_PACK[p.key] ?? [] }
}

export const allPacks: ContentPack[] = basePacks.map(withCooking)

export function getPack(key: string): ContentPack | undefined {
  return allPacks.find((p) => p.key === key)
}

/** farmersdelight 的厨锅配方（对农夫乐事主板块使用） */
export const FARMING_COOKING = COOKING_BY_PACK.farming ?? []

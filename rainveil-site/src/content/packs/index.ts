import type { ContentPack } from '../packTypes'
import { pack as corn } from './corn'
import { pack as rustic } from './rustic'
import { pack as veggies } from './veggies'
import { pack as ends } from './ends'
import { pack as chicken } from './chicken'
import { pack as dumplings } from './dumplings'

/**
 * 已接入官网的内容包。storage / crate 因使用 ${wood}/${type} 配置工厂
 * 无法自动解析具体物品，后续单独补充。
 */
export const allPacks: ContentPack[] = [corn, rustic, veggies, ends, chicken, dumplings]

export function getPack(key: string): ContentPack | undefined {
  return allPacks.find((p) => p.key === key)
}

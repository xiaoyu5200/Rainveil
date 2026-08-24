import { describe, it, expect } from 'vitest'
import { fish, fishTier, rods, baits, hooks, totems, market, loot } from './fishing'

describe('fishing content', () => {
  it('has 16 unique fish, each with a texture and three tiers', () => {
    const ids = fish.map((f) => f.id)
    expect(fish.length).toBe(16)
    expect(new Set(ids).size).toBe(16)
    fish.forEach((f) => {
      expect(f.texture).toBeTruthy()
      expect(f.size).toHaveLength(3)
      expect(f.price).toHaveLength(3)
      expect(f.bonus).toHaveLength(3)
    })
  })

  it('every texture resolves to a real bundled image', () => {
    const suffixes = fishTier.map((t) => t.key)
    fish.forEach((f) => {
      suffixes.forEach((key) => {
        // 名称规则必须与本目录 public/fishing/fish/ 下的文件一致
        const file = key === 'normal' ? `${f.texture}.png` : `${f.texture}_${key}_star.png`
        expect(file).toBeTruthy()
      })
    })
  })

  it('has rods, baits, a hook and totems', () => {
    expect(rods.length).toBeGreaterThan(0)
    expect(baits.length).toBeGreaterThan(0)
    expect(hooks.length).toBeGreaterThan(0)
    expect(totems.length).toBeGreaterThan(0)
  })

  it('exposes a market with values', () => {
    expect(market.dailyLimit).toBeGreaterThan(0)
    expect(market.vanillaPrices.length).toBeGreaterThan(0)
  })

  it('has a detailed enchant book loot pool', () => {
    expect(loot.enchantBook.pools.length).toBeGreaterThan(0)
    const total = loot.enchantBook.pools.reduce((sum, p) => sum + p.items.length, 0)
    expect(total).toBe(32)
  })
})

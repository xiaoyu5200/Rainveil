import { createElement } from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { crops, wildCrops, tools, knives, foodCategories, craftingRecipes, soil } from './farming'
import { RECIPES } from './farmingRecipes'
import { RecipeGrid } from '../pages/farming/RecipeCard'

describe('farming content', () => {
  it('has 4 crops, each with a texture and a seed (except onion)', () => {
    expect(crops).toHaveLength(4)
    const ids = crops.map((c) => c.id)
    expect(new Set(ids).size).toBe(4)
    crops.forEach((c) => {
      expect(c.texture).toBeTruthy()
    })
  })

  it('has 7 wild crops with drops', () => {
    expect(wildCrops).toHaveLength(7)
    wildCrops.forEach((w) => {
      expect(w.texture).toBeTruthy()
      expect(w.drops.length).toBeGreaterThan(0)
    })
  })

  it('has 4 tools and 6 knives', () => {
    expect(tools).toHaveLength(4)
    expect(knives).toHaveLength(6)
  })

  it('exposes a comprehensive food list across categories', () => {
    const total = foodCategories.reduce((sum, c) => sum + c.dishes.length, 0)
    expect(total).toBeGreaterThan(50)
    const ids = foodCategories.flatMap((c) => c.dishes.map((d) => d.id))
    expect(new Set(ids).size).toBe(total)
  })

  it('exposes craftable recipes with grid items', () => {
    expect(craftingRecipes.length).toBeGreaterThan(20)
    craftingRecipes.forEach((r) => {
      expect(r.result).toBeTruthy()
      expect(r.grid.some((g) => g !== null)).toBe(true)
      expect(r.station).toBeTruthy()
    })
  })

  it('shows knife recipes as a two-slot row', () => {
    const recipe = RECIPES.find((r) => r.id === 'farmersdelight:flint_knife')
    expect(recipe).toBeTruthy()

    const { container } = render(createElement(RecipeGrid, { recipe: recipe!, compact: true }))
    const slotCells = container.querySelectorAll('[data-slot]')

    expect(container.querySelector('[data-crafting-layout="two-slot"]')).not.toBeNull()
    expect(slotCells).toHaveLength(2)
  })

  it('has soil/compost info', () => {
    expect(soil.compost.name).toBeTruthy()
    expect(soil.richSoil.name).toBeTruthy()
  })
})

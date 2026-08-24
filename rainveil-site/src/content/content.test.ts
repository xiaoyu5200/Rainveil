import { describe, it, expect } from 'vitest'
import { site } from './site'
import { plans } from './store'
import { ruleGroups } from './rules'
import { announcements } from './announcements'

describe('content', () => {
  it('exposes server basics', () => {
    expect(site.name).toContain('Rainveil')
    expect(site.ip).toBe('mc.xiaoyu.wiki')
    expect(site.version).toBe('Java 1.21.11')
  })
  it('has at least one plan, rule group, announcement', () => {
    expect(plans.length).toBeGreaterThan(0)
    expect(ruleGroups.length).toBeGreaterThan(0)
    expect(announcements.length).toBeGreaterThan(0)
  })
})

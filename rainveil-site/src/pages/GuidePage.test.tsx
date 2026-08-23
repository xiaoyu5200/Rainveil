import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ruleGroups } from '../content/rules'
import { faqs } from '../content/faq'
import { site } from '../content/site'
import { GuidePage } from './GuidePage'

describe('GuidePage', () => {
  it('renders every rule group title', () => {
    render(<GuidePage />)
    ruleGroups.forEach((g) => expect(screen.getByText(g.title)).toBeInTheDocument())
  })

  it('renders every FAQ question', () => {
    render(<GuidePage />)
    faqs.forEach((f) => expect(screen.getByText(f.q)).toBeInTheDocument())
  })

  it('shows server version and address in the join steps', () => {
    render(<GuidePage />)
    expect(screen.getAllByText(site.version).length).toBeGreaterThan(0)
    expect(screen.getAllByText(site.ip).length).toBeGreaterThan(0)
  })
})

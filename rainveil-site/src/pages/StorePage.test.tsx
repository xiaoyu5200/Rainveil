import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { plans } from '../content/store'
import { site } from '../content/site'
import { StorePage } from './StorePage'

describe('StorePage', () => {
  it('renders all plan names', () => {
    render(<StorePage />)
    plans.forEach((p) => {
      // 档位名同时出现在卡片标题与权益对照表表头，故用 getAllByText
      expect(screen.getAllByText(p.name).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders community contact channels', () => {
    render(<StorePage />)
    site.community.forEach((c) => {
      expect(screen.getByText(c.label)).toBeInTheDocument()
      expect(screen.getByText(c.value)).toBeInTheDocument()
    })
  })
})

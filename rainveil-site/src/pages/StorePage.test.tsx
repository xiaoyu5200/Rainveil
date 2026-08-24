import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { site } from '../content/site'
import { StorePage } from './StorePage'

describe('StorePage', () => {
  it('shows the store is not yet open', () => {
    render(<StorePage />)
    expect(screen.getByText('未开放')).toBeInTheDocument()
  })

  it('renders community contact channels', () => {
    render(<StorePage />)
    site.community.forEach((c) => {
      expect(screen.getByText(c.label)).toBeInTheDocument()
      expect(screen.getByText(c.value)).toBeInTheDocument()
    })
  })
})

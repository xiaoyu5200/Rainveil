import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('shows tagline and server ip', () => {
    render(<HomePage />)
    expect(screen.getByText(/Rainveil/)).toBeInTheDocument()
    expect(screen.getAllByText('mc.xiaoyu.wiki').length).toBeGreaterThanOrEqual(1)
  })
})

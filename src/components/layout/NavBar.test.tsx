import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  it('renders nav links', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('玩法')).toBeInTheDocument()
  })
})

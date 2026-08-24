import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import { modes } from '../content/modes'
import { ModesPage } from './ModesPage'

describe('ModesPage', () => {
  it('renders all mode titles', () => {
    render(
      <MemoryRouter>
        <ModesPage />
      </MemoryRouter>,
    )
    modes.forEach((m) => expect(screen.getByText(m.title)).toBeInTheDocument())
  })

  it('links to the fishing guide', () => {
    render(
      <MemoryRouter>
        <ModesPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('钓鱼玩法')).toBeInTheDocument()
  })
})

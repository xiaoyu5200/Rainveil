import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { modes } from '../content/modes'
import { ModesPage } from './ModesPage'

describe('ModesPage', () => {
  it('renders all mode titles', () => {
    render(<ModesPage />)
    modes.forEach((m) => expect(screen.getByText(m.title)).toBeInTheDocument())
  })
})

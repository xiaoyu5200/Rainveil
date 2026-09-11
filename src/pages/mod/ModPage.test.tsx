import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mod } from '../../content/mod'
import { ModPage } from './ModPage'

describe('ModPage', () => {
  it('renders the mod name and tagline', () => {
    render(<ModPage />)
    expect(screen.getByText(mod.name)).toBeInTheDocument()
    expect(screen.getByText(mod.tagline)).toBeInTheDocument()
  })

  it('shows the latest release file name and file size', () => {
    render(<ModPage />)
    expect(screen.getByText(mod.latest.fileName)).toBeInTheDocument()
    expect(screen.getAllByText(mod.latest.fileSize).length).toBeGreaterThan(0)
  })

  it('lists every changelog version', () => {
    render(<ModPage />)
    mod.changelog.forEach((entry) => {
      expect(screen.getAllByText(`v${entry.version}`).length).toBeGreaterThan(0)
    })
  })

  it('renders every install step', () => {
    render(<ModPage />)
    mod.install.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument()
    })
  })

  it('renders every faq question', () => {
    render(<ModPage />)
    mod.faq.forEach((item) => {
      expect(screen.getByText(item.q)).toBeInTheDocument()
    })
  })

  it('links to the latest download url', () => {
    render(<ModPage />)
    const targets = screen.getAllByRole('link').map((link) => link.getAttribute('href'))
    expect(targets).toContain(mod.latest.url)
  })
})

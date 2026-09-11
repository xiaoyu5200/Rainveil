import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { HomePage } from './HomePage'

function renderHome() {
  const router = createMemoryRouter(
    [
      { path: '/', element: <HomePage /> },
      { path: '/modes', element: <div>玩法详解</div> },
    ],
    { initialEntries: ['/'] },
  )
  render(<RouterProvider router={router} />)
}

describe('HomePage', () => {
  it('shows tagline and server ip', () => {
    renderHome()
    expect(screen.getAllByText(/Rainveil/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('mc.xiaoyu.wiki').length).toBeGreaterThanOrEqual(1)
  })
})

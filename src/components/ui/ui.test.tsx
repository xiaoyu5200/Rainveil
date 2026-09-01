import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Badge } from './Badge'
import { PillButton } from './PillButton'
import { StatTile } from './StatTile'
import { CopyIp } from './CopyIp'

describe('ui components', () => {
  it('Badge renders text', () => {
    render(<Badge>Java 1.21.11</Badge>)
    expect(screen.getByText('Java 1.21.11')).toBeInTheDocument()
  })
  it('PillButton renders children', () => {
    render(<PillButton>开始游玩</PillButton>)
    expect(screen.getByRole('button', { name: '开始游玩' })).toBeInTheDocument()
  })
  it('StatTile shows label and value', () => {
    render(<StatTile label="版本" value="1.21.11" />)
    expect(screen.getByText('版本')).toBeInTheDocument()
    expect(screen.getByText('1.21.11')).toBeInTheDocument()
  })
  it('CopyIp copies ip to clipboard', async () => {
    const write = vi.fn()
    Object.assign(navigator, { clipboard: { writeText: write } })
    render(<CopyIp ip="mc.xiaoyu.wiki" />)
    await userEvent.click(screen.getByText('mc.xiaoyu.wiki'))
    expect(write).toHaveBeenCalledWith('mc.xiaoyu.wiki')
  })
})

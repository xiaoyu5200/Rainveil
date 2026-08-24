import { useId, useState } from 'react'
import { NavLink } from 'react-router'
import { Icon } from '../ui/Icon'

const links = [
  { to: '/', label: '首页' },
  { to: '/modes', label: '玩法' },
  { to: '/guide', label: '开始游玩' },
  { to: '/store', label: '商店' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
  }`

export function NavBar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  return (
    <nav aria-label="主导航">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-ink font-semibold tracking-tight">Rainveil</NavLink>

          <div className="hidden items-center gap-1 rounded-pill bg-cloud px-2 py-1.5 shadow-whisper md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-pill bg-cloud px-4 py-2 text-sm font-medium text-ink shadow-whisper focus-visible:shadow-[var(--ring-focus)] md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name="menu" className="h-4 w-4" />
            菜单
          </button>
        </div>

        {open ? (
          <div
            id={menuId}
            className="mt-3 flex flex-col gap-1 rounded-check bg-cloud p-2 shadow-whisper md:hidden"
          >
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </div>
        ) : null}
      </div>
    </nav>
  )
}

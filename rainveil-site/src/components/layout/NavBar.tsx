import { NavLink } from 'react-router'
const links = [
  { to: '/', label: '首页' },
  { to: '/modes', label: '玩法' },
  { to: '/guide', label: '开始游玩' },
  { to: '/store', label: '商店' },
]
export function NavBar() {
  return (
    <nav aria-label="主导航">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-ink font-semibold tracking-tight">Rainveil · 雨幕</NavLink>
        <div className="flex items-center gap-1 rounded-pill bg-cloud px-2 py-1.5 shadow-whisper">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

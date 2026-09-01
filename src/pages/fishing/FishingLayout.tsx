import { NavLink, Outlet } from 'react-router'
import { Container } from '../../components/ui/Container'
import { Icon } from '../../components/ui/Icon'

const sections = [
  { to: '/modes/fishing/fish', label: '鱼类图谱' },
  { to: '/modes/fishing/equipment', label: '装备' },
  { to: '/modes/fishing/totems', label: '图腾' },
  { to: '/modes/fishing/market', label: '鱼市与经济' },
  { to: '/modes/fishing/loot', label: '战利品与相遇' },
]

function HeaderBlock() {
  return (
    <div className="mb-8">
      <nav className="mb-4 flex items-center gap-2 text-sm text-mist">
        <NavLink to="/modes" className="inline-flex items-center gap-1 hover:text-ink">
          <Icon name="arrow-left" className="h-4 w-4" />
          玩法
        </NavLink>
        <span className="text-soft">/</span>
        <span className="font-medium text-ink">钓鱼玩法</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">钓鱼玩法</h1>
      <p className="mt-2 max-w-2xl text-mist">
        基于 CustomFishing 的完整钓鱼体系：16 种鱼、五档鱼竿、鱼饵鱼钩与图腾，以及围绕鱼市展开的经济循环。
      </p>
    </div>
  )
}

function SectionNav() {
  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-pill bg-cloud p-2 shadow-whisper">
      {sections.map((s) => (
        <NavLink
          key={s.to}
          to={s.to}
          className={({ isActive }) =>
            `rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              isActive ? 'bg-ink text-cloud' : 'text-mist hover:text-ink'
            }`
          }
        >
          {s.label}
        </NavLink>
      ))}
    </div>
  )
}

export function FishingLayout() {
  return (
    <Container className="py-12">
      <HeaderBlock />
      <SectionNav />
      <Outlet />
    </Container>
  )
}

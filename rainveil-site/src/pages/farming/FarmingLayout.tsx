import { NavLink, Outlet } from 'react-router'
import { Container } from '../../components/ui/Container'
import { Icon } from '../../components/ui/Icon'

const sections = [
  { to: '/modes/farming/crops', label: '作物与土壤' },
  { to: '/modes/farming/equipment', label: '厨具与刀具' },
  { to: '/modes/farming/foods', label: '食谱图鉴' },
  { to: '/modes/farming/crafting', label: '合成表' },
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
        <span className="font-medium text-ink">农夫乐事</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">农夫乐事</h1>
      <p className="mt-2 max-w-2xl text-mist">
        一套围绕「种植 — 加工 — 烹饪」的完整农场生活体系：四种作物、六把厨刀、四种厨具，以及数十道附带滋养效果的家常菜。
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

export function FarmingLayout() {
  return (
    <Container className="py-12">
      <HeaderBlock />
      <SectionNav />
      <Outlet />
    </Container>
  )
}

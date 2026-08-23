import { Link } from 'react-router'

export function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-edge bg-cloud/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-8 px-6">
        <Link to="/" className="font-serif-accent text-2xl font-semibold text-ink">
          Rainveil
        </Link>
        <nav className="flex items-center gap-6 text-sm text-mist">
          <Link to="/modes" className="transition-colors hover:text-ink">
            玩法模式
          </Link>
          <Link to="/guide" className="transition-colors hover:text-ink">
            新人指南
          </Link>
          <Link to="/store" className="transition-colors hover:text-ink">
            赞助商店
          </Link>
        </nav>
      </div>
    </header>
  )
}

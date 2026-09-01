import { Link } from 'react-router'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <div className="py-16 text-center">
        <h1 className="font-serif-accent italic text-6xl text-ink">404</h1>
        <p className="mt-4 text-lg text-mist">这片区块尚未生成</p>
        <p className="mt-1 text-sm text-mist">你要找的页面已被 Rainveil 吞没，不妨回到入口处重新探索。</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-6 py-3 text-sm font-medium text-cloud transition-colors hover:bg-ink/90"
          >
            回到首页
          </Link>
        </div>
      </div>
    </Container>
  )
}

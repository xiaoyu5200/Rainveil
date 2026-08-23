import { Outlet } from 'react-router'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-ink">
      <NavBar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

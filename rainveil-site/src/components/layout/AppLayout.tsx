import { Outlet } from 'react-router'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}

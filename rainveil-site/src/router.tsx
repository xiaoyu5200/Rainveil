import { createBrowserRouter } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { ModesPage } from './pages/ModesPage'
import { StorePage } from './pages/StorePage'
import { NotFoundPage } from './pages/NotFoundPage'

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/modes', element: <ModesPage /> },
      { path: '/store', element: <StorePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)

import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { ModesPage } from './pages/ModesPage'
import { FishingLayout } from './pages/fishing/FishingLayout'
import { FishingFishPage } from './pages/fishing/FishingFishPage'
import { FishingEquipmentPage } from './pages/fishing/FishingEquipmentPage'
import { FishingTotemsPage } from './pages/fishing/FishingTotemsPage'
import { FishingMarketPage } from './pages/fishing/FishingMarketPage'
import { FishingLootPage } from './pages/fishing/FishingLootPage'
import { FarmingLayout } from './pages/farming/FarmingLayout'
import { FarmingCropsPage } from './pages/farming/FarmingCropsPage'
import { FarmingEquipmentPage } from './pages/farming/FarmingEquipmentPage'
import { FarmingFoodsPage } from './pages/farming/FarmingFoodsPage'
import { StorePage } from './pages/StorePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PackPage } from './pages/packs/PackPage'

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/modes', element: <ModesPage /> },
      {
        path: '/modes/fishing',
        element: <FishingLayout />,
        children: [
          { index: true, element: <Navigate to="/modes/fishing/fish" replace /> },
          { path: 'fish', element: <FishingFishPage /> },
          { path: 'equipment', element: <FishingEquipmentPage /> },
          { path: 'totems', element: <FishingTotemsPage /> },
          { path: 'market', element: <FishingMarketPage /> },
          { path: 'loot', element: <FishingLootPage /> },
        ],
      },
      {
        path: '/modes/farming',
        element: <FarmingLayout />,
        children: [
          { index: true, element: <Navigate to="/modes/farming/crops" replace /> },
          { path: 'crops', element: <FarmingCropsPage /> },
          { path: 'equipment', element: <FarmingEquipmentPage /> },
          { path: 'foods', element: <FarmingFoodsPage /> },
        ],
      },
      { path: '/store', element: <StorePage /> },
      { path: '/modes/:packKey', element: <PackPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)

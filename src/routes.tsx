import type { ReactNode } from 'react';
import Home from './pages/Home';
import AtelierPage from './pages/AtelierPage';
import WorkshopPage from './pages/WorkshopPage';
import StorybookPage from './pages/StorybookPage';
import SanctuaryPage from './pages/SanctuaryPage';
import GuestbookPage from './pages/GuestbookPage';
import MaintenancePage from './pages/MaintenancePage';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    public: true,
  },
  {
    name: 'World Atelier',
    path: '/atelier',
    element: <AtelierPage />,
    public: true,
  },
  {
    name: 'Invention Workshop',
    path: '/workshop',
    element: <WorkshopPage />,
    public: true,
  },
  {
    name: 'Interactive Storybook',
    path: '/storybook',
    element: <StorybookPage />,
    public: true,
  },
  {
    name: '3D Pip Sanctuary',
    path: '/sanctuary',
    element: <SanctuaryPage />,
    public: true,
  },
  {
    name: 'Live Guestbook',
    path: '/guestbook',
    element: <GuestbookPage />,
    public: true,
  },
  {
    name: 'Admin Panel',
    path: '/admin',
    element: <MaintenancePage />,
    public: false,
  },
  {
    name: 'Admin Maintenance',
    path: '/admin/maintenance',
    element: <MaintenancePage />,
    public: false,
  },
];

import type { RouteObject } from 'react-router'
import { AppShell } from './components/app-shell'
import { TopNav } from './components/top-nav'

export const routes: RouteObject[] = [
  {
    Component: AppShell,
    HydrateFallback: TopNav,
    children: [
      { index: true, lazy: () => import('./routes/courses-page') },
      { path: 'courses/new', lazy: () => import('./routes/create-course-page') },
      { path: 'courses/:id/edit', lazy: () => import('./routes/edit-course-page') },
    ],
  },
]

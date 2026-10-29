import { Outlet } from 'react-router'
import { TopNav } from './top-nav'

export function AppShell() {
  return (
    <>
      <TopNav />
      <main>
        <Outlet />
      </main>
    </>
  )
}

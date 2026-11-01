import { Outlet } from 'react-router'
import { DemoControls } from './demo-controls'
import { TopNav } from './top-nav'

export function AppShell() {
  return (
    <>
      <TopNav />
      <main>
        <Outlet />
      </main>
      <DemoControls />
    </>
  )
}

import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { TopNav } from './top-nav'

function setOnline(online: boolean) {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(online)
}

afterEach(() => vi.restoreAllMocks())

it('shows the offline badge when the page loads offline', () => {
  setOnline(false)

  render(<TopNav />)

  expect(screen.getByRole('status')).toHaveTextContent('Offline')
})

it('announces the offline badge when the connection drops, and removes it when it returns', () => {
  render(<TopNav />)
  expect(screen.getByRole('status')).toBeEmptyDOMElement()

  setOnline(false)
  act(() => window.dispatchEvent(new Event('offline')))

  expect(screen.getByRole('status')).toHaveTextContent('Offline')

  setOnline(true)
  act(() => window.dispatchEvent(new Event('online')))

  expect(screen.getByRole('status')).toBeEmptyDOMElement()
})

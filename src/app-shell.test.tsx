import { screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renderApp } from './test/render-app'

it('renders the lazy list route inside the app shell', async () => {
  renderApp()

  expect(await screen.findByRole('heading', { level: 1, name: 'Courses' })).toBeInTheDocument()
  expect(screen.getByText('Facility portal')).toBeInTheDocument()
})

it('shows a not-found page with a link back to the list for an unknown URL', async () => {
  renderApp('/does-not-exist')

  expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  expect(screen.getByText('Facility portal')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Back to courses' })).toHaveAttribute('href', '/')
})

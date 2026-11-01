import { screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { renderApp } from './test/render-app'

it('renders the lazy list route inside the app shell', async () => {
  renderApp()

  expect(await screen.findByRole('heading', { level: 1, name: 'Courses' })).toBeInTheDocument()
  expect(screen.getByText('Facility portal')).toBeInTheDocument()
})

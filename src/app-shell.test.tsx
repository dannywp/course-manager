import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { expect, it } from 'vitest'
import { routes } from './router'

it('renders the lazy list route inside the app shell', async () => {
  render(<RouterProvider router={createMemoryRouter(routes)} />)

  expect(await screen.findByRole('heading', { level: 1, name: 'Courses' })).toBeInTheDocument()
  expect(screen.getByText('Facility portal')).toBeInTheDocument()
})

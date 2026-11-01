import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { routes } from '../router'

export function renderApp() {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createMemoryRouter(routes)} />
    </QueryClientProvider>,
  )
  return { queryClient }
}

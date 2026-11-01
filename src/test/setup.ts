import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('../services/courses-service', async () => {
  const { createLocalCoursesService } = await import('../services/local-courses-service')
  return { coursesService: createLocalCoursesService({ latency: () => 0 }) }
})

afterEach(cleanup)

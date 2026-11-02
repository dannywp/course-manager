import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

vi.mock('../services/courses-service', async () => {
  const { createLocalCoursesService } = await import('../services/local-courses-service')
  const { createMemoryImageStore } = await import('./memory-image-store')
  return { coursesService: createLocalCoursesService({ latency: () => 0, images: createMemoryImageStore().store }) }
})

afterEach(cleanup)

// jsdom doesn't implement object URLs.
let objectUrlCount = 0
URL.createObjectURL = vi.fn(() => `blob:test/${++objectUrlCount}`)
URL.revokeObjectURL = vi.fn()

// jsdom doesn't implement modal dialogs. Restoring focus on close matches what browsers do.
let focusedBeforeModal: HTMLElement | null = null

HTMLDialogElement.prototype.showModal = function () {
  focusedBeforeModal = document.activeElement as HTMLElement
  this.open = true
}

HTMLDialogElement.prototype.close = function () {
  if (this.open) {
    this.open = false
    focusedBeforeModal?.focus()
  }
}

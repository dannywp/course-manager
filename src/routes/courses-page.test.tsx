import { act, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { CourseWithImage } from '../domain/course'
import { coursesService } from '../services/courses-service'
import { writeFailureSwitch } from '../services/failure-switches'
import { renderApp } from '../test/render-app'

const cardNames = async () => (await screen.findAllByRole('heading', { level: 2 })).map((name) => name.textContent)

function holdNextList() {
  let release: (courses: CourseWithImage[]) => void = () => {}
  vi.spyOn(coursesService, 'list').mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        release = resolve
      }),
  )
  return (courses: CourseWithImage[]) => release(courses)
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
})

it('renders courses in the order the service returns', async () => {
  const names = (await coursesService.list()).map((course) => course.name)

  renderApp()

  expect(await cardNames()).toEqual(names)
})

it('shows the skeleton until the list arrives', async () => {
  const courses = await coursesService.list()
  const releaseList = holdNextList()

  renderApp()
  const skeleton = await screen.findByRole('status', { name: 'Loading courses' })

  releaseList(courses)

  expect(await cardNames()).toHaveLength(6)
  expect(skeleton).not.toBeInTheDocument()
})

describe('when the list fails', () => {
  it('shows an error, and Retry loads the list once the failure is gone', async () => {
    writeFailureSwitch('list', true)
    renderApp()
    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load the courses")

    writeFailureSwitch('list', false)
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(await cardNames()).toHaveLength(6)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows the skeleton again while Retry is loading', async () => {
    writeFailureSwitch('list', true)
    renderApp()
    await screen.findByRole('alert')

    holdNextList()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(await screen.findByRole('status', { name: 'Loading courses' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps showing the list when only a background refetch fails', async () => {
    const { queryClient } = renderApp()
    await cardNames()

    writeFailureSwitch('list', true)
    await act(() => queryClient.refetchQueries({ queryKey: ['courses'] }))

    expect(await cardNames()).toHaveLength(6)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

it('shows the empty state with a create link when there are no courses', async () => {
  for (const course of await coursesService.list()) {
    await coursesService.remove(course.id)
  }

  renderApp()

  expect(await screen.findByText('No courses yet')).toBeInTheDocument()
  const links = screen.getAllByRole('link', { name: 'Create a course' })
  expect(links).toHaveLength(2)
  links.forEach((link) => expect(link).toHaveAttribute('href', '/courses/new'))
})

it('opens the form route from the create link', async () => {
  renderApp()

  fireEvent.click(await screen.findByRole('link', { name: 'Create a course' }))

  expect(await screen.findByRole('heading', { level: 1, name: 'Create course' })).toBeInTheDocument()
})

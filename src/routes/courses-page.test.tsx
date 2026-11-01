import { act, fireEvent, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { CourseWithImage } from '../domain/course'
import { coursesQueryKey } from '../hooks/use-courses-query'
import { coursesService } from '../services/courses-service'
import { writeFailureSwitch } from '../services/failure-switches'
import { renderApp } from '../test/render-app'

const cardNames = async () => (await screen.findAllByRole('heading', { level: 2 })).map((name) => name.textContent)

function holdNextList() {
  let release: (courses: CourseWithImage[]) => void = () => {}
  const held = new Promise<CourseWithImage[]>((resolve) => {
    release = resolve
  })
  vi.spyOn(coursesService, 'list').mockImplementationOnce(() => held)
  return release
}

function holdNextRemove() {
  const { remove } = coursesService
  let release = () => {}
  const gate = new Promise<void>((resolve) => {
    release = resolve
  })
  vi.spyOn(coursesService, 'remove').mockImplementationOnce(async (id) => {
    await gate
    return remove(id)
  })
  return release
}

async function openDeleteModal(name: string) {
  fireEvent.click(await screen.findByRole('button', { name: `Actions for ${name}` }))
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }))
  return screen.findByRole('dialog')
}

async function deleteCourse(name: string) {
  fireEvent.click(within(await openDeleteModal(name)).getByRole('button', { name: 'Delete' }))
}

const currentCardNames = () => screen.queryAllByRole('heading', { level: 2 }).map((name) => name.textContent)

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
    await act(() => queryClient.refetchQueries({ queryKey: coursesQueryKey }))

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

describe('deleting a course', () => {
  it('removes the card, then restores it in place and names the course when the delete fails', async () => {
    writeFailureSwitch('deletes', true)
    const releaseRemove = holdNextRemove()
    renderApp()
    const before = await cardNames()
    const target = before[1] as string
    const courses = await coursesService.list()

    await deleteCourse(target)

    await waitFor(() => expect(currentCardNames()).toEqual(before.filter((name) => name !== target)))
    const releaseRefetch = holdNextList()
    releaseRemove()

    await waitFor(() => expect(currentCardNames()).toEqual(before))
    expect(await screen.findByText(`Couldn't delete ${target}. It's back in the list.`)).toHaveAttribute(
      'aria-live',
      'assertive',
    )
    await waitFor(() => expect(coursesService.list).toHaveBeenCalledOnce())
    releaseRefetch(courses)
  })

  it('stays deleted after a successful delete', async () => {
    renderApp()
    const before = await cardNames()
    const target = before[1] as string

    await deleteCourse(target)

    await waitFor(async () => {
      expect((await coursesService.list()).map((course) => course.name)).not.toContain(target)
    })
    expect(currentCardNames()).toEqual(before.filter((name) => name !== target))
    expect(screen.queryByRole('button', { name: 'Dismiss error' })).not.toBeInTheDocument()
  })

  it('refetches the list once the delete has settled', async () => {
    renderApp()
    const [target] = await cardNames()
    const list = vi.spyOn(coursesService, 'list')

    await deleteCourse(target as string)

    await waitFor(() => expect(list).toHaveBeenCalledOnce())
  })

  it('ignores a refetch that started before the delete', async () => {
    const { queryClient } = renderApp()
    const before = await cardNames()
    const target = before[0] as string
    const staleCourses = await coursesService.list()
    const releaseList = holdNextList()
    void queryClient.refetchQueries({ queryKey: coursesQueryKey })
    const releaseRemove = holdNextRemove()

    await deleteCourse(target)
    await waitFor(() => expect(currentCardNames()).not.toContain(target))
    releaseList(staleCourses)
    await waitFor(() => expect(queryClient.getQueryState(coursesQueryKey)?.fetchStatus).toBe('idle'))

    const cachedNames = queryClient.getQueryData<CourseWithImage[]>(coursesQueryKey)?.map((course) => course.name)
    expect(cachedNames).not.toContain(target)
    releaseRemove()
    await waitFor(async () => {
      expect((await coursesService.list()).map((course) => course.name)).not.toContain(target)
    })
  })

  it('clears the failure notice on the next attempt', async () => {
    writeFailureSwitch('deletes', true)
    renderApp()
    const [target] = await cardNames()
    await deleteCourse(target as string)
    const notice = await screen.findByText(/^Couldn't delete/)

    holdNextRemove()
    await deleteCourse(target as string)

    await waitFor(() => expect(notice).toBeEmptyDOMElement())
    expect(screen.queryByRole('button', { name: 'Dismiss error' })).not.toBeInTheDocument()
  })

  it('clears the failure notice on dismiss and moves focus to the create link without scrolling', async () => {
    writeFailureSwitch('deletes', true)
    renderApp()
    const [target] = await cardNames()
    await deleteCourse(target as string)
    const notice = await screen.findByText(/^Couldn't delete/)
    const createLink = screen.getByRole('link', { name: 'Create a course' })
    const focus = vi.spyOn(createLink, 'focus')

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss error' }))

    await waitFor(() => expect(notice).toBeEmptyDOMElement())
    expect(screen.queryByRole('button', { name: 'Dismiss error' })).not.toBeInTheDocument()
    expect(createLink).toHaveFocus()
    expect(focus).toHaveBeenCalledExactlyOnceWith({ preventScroll: true })
  })

  it('keeps the course and returns focus to its trigger on cancel', async () => {
    renderApp()
    const before = await cardNames()
    const target = before[1] as string

    const modal = await openDeleteModal(target)
    fireEvent.click(within(modal).getByRole('button', { name: 'Cancel' }))

    await waitFor(() => expect(modal).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: `Actions for ${target}` })).toHaveFocus()
    expect(currentCardNames()).toEqual(before)
  })

  describe('moves focus after a delete', () => {
    it('to the next card', async () => {
      renderApp()
      const [, target, next] = await cardNames()

      await deleteCourse(target as string)

      expect(screen.getByRole('button', { name: `Actions for ${next}` })).toHaveFocus()
    })

    it('to the previous card when the last one is deleted', async () => {
      renderApp()
      const names = await cardNames()

      await deleteCourse(names[names.length - 1] as string)

      expect(screen.getByRole('button', { name: `Actions for ${names[names.length - 2]}` })).toHaveFocus()
    })

    it('to the create link when no card is left', async () => {
      const [survivor, ...others] = await coursesService.list()
      await Promise.all(others.map((course) => coursesService.remove(course.id)))
      renderApp()

      await deleteCourse(survivor.name)

      await screen.findByText('No courses yet')
      expect(screen.getAllByRole('link', { name: 'Create a course' })[0]).toHaveFocus()
    })
  })
})

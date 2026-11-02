import { act, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { coursesQueryKey } from '../hooks/use-courses-query'
import { coursesService } from '../services/courses-service'
import { writeFailureSwitch } from '../services/failure-switches'
import { createGate } from '../test/create-gate'
import { field, listHeading, preview, type } from '../test/form-queries'
import { renderApp } from '../test/render-app'

const save = () => fireEvent.click(screen.getByRole('button', { name: 'Save' }))
const formReady = () => screen.findByLabelText('Title*')
const cardNames = () => screen.getAllByRole('heading', { level: 2 }).map((name) => name.textContent)

async function findCourse(name: string) {
  const course = (await coursesService.list()).find((candidate) => candidate.name === name)
  if (!course) {
    throw new Error(`No seed course named ${name}`)
  }
  return course
}

async function openEdit(name: string) {
  const course = await findCourse(name)
  renderApp(`/courses/${course.id}/edit`)
  await formReady()
  return course
}

async function openEditFromList(name: string) {
  fireEvent.click(await screen.findByRole('button', { name: `Actions for ${name}` }))
  fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }))
  await formReady()
}

function holdNextGet() {
  const { get } = coursesService
  const gate = createGate()
  vi.spyOn(coursesService, 'get').mockImplementationOnce(async (id) => {
    await gate.passed
    return get(id)
  })
  return gate.open
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
})

describe('prefilling', () => {
  it('shows every stored value in the form', async () => {
    const { id, ...valderrama } = await findCourse('Valderrama')
    await coursesService.update(id, { ...valderrama, description: 'Cork oaks', featured: true })

    await openEdit('Valderrama')

    expect(field('Title*')).toHaveValue('Valderrama')
    expect(field('Difficulty*')).toHaveValue(String(valderrama.difficulty))
    expect(field('Course description')).toHaveValue('Cork oaks')
    expect(field('Par*')).toHaveValue(String(valderrama.par))
    expect(field('Featured course')).toBeChecked()
    expect(field('City/State*')).toHaveValue(valderrama.city)
    expect(field('Country*')).toHaveValue(valderrama.countryCode)
  })

  it('shows the stored course and its photo in the preview', async () => {
    const course = await openEdit('Valderrama')

    expect(preview().getByRole('heading', { level: 2 })).toHaveTextContent('Valderrama')
    expect(preview().getByText(`Par ${course.par}`)).toBeInTheDocument()
    expect(preview().getByRole('presentation')).toHaveAttribute('src', '/seed/valderrama.jpg')
  })

  it('reads the stored course again on every visit', async () => {
    renderApp()
    await openEditFromList('Valderrama')
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await listHeading()
    const { id, ...valderrama } = await findCourse('Valderrama')

    await coursesService.update(id, { ...valderrama, city: 'Changed elsewhere' })
    await openEditFromList('Valderrama')

    expect(field('City/State*')).toHaveValue('Changed elsewhere')
  })
})

describe('before the form shows', () => {
  it('shows the skeleton until the course arrives', async () => {
    const course = await findCourse('Valderrama')
    const releaseGet = holdNextGet()

    renderApp(`/courses/${course.id}/edit`)
    const skeleton = await screen.findByRole('status', { name: 'Loading course' })
    expect(screen.queryByLabelText('Title*')).not.toBeInTheDocument()

    releaseGet()

    await formReady()
    expect(skeleton).not.toBeInTheDocument()
  })

  it('shows not found with a link back for an unknown id', async () => {
    renderApp('/courses/bogus/edit')

    expect(await screen.findByText('Course not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to courses' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows an error, and Retry loads the form once the failure is gone', async () => {
    const course = await findCourse('Valderrama')
    writeFailureSwitch('list', true)
    renderApp(`/courses/${course.id}/edit`)
    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't load the course")

    writeFailureSwitch('list', false)
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    await formReady()
    expect(field('Title*')).toHaveValue('Valderrama')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows the skeleton again while Retry is loading', async () => {
    const course = await findCourse('Valderrama')
    writeFailureSwitch('list', true)
    renderApp(`/courses/${course.id}/edit`)
    await screen.findByRole('alert')

    holdNextGet()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    expect(await screen.findByRole('status', { name: 'Loading course' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

describe('saving', () => {
  it('sends only the input and keeps the stored image', async () => {
    const update = vi.spyOn(coursesService, 'update')
    const course = await openEdit('Valderrama')
    type('Title*', '  Real Club Valderrama ')

    save()

    await listHeading()
    expect(update).toHaveBeenCalledExactlyOnceWith(course.id, {
      name: 'Real Club Valderrama',
      city: course.city,
      countryCode: course.countryCode,
      par: course.par,
      difficulty: course.difficulty,
      featured: false,
      description: course.description,
      imageId: 'seed:valderrama',
    })
  })

  it('places a newly featured course last among the featured courses', async () => {
    renderApp()
    await openEditFromList('Valderrama')
    fireEvent.click(field('Featured course'))

    save()
    await listHeading()

    expect(cardNames().slice(0, 3)).toEqual(['Pebble Beach Golf Links', 'St Andrews Old Course', 'Valderrama'])
    const card = screen.getByRole('heading', { level: 2, name: 'Valderrama' }).closest('article') as HTMLElement
    expect(within(card).getByText('Featured')).toBeInTheDocument()
  })

  it('keeps the position of a course that stays featured', async () => {
    renderApp()
    await openEditFromList('Pebble Beach Golf Links')
    type('Title*', 'Pebble Beach')

    save()
    await listHeading()

    expect(cardNames().slice(0, 2)).toEqual(['Pebble Beach', 'St Andrews Old Course'])
  })

  it('shows the edit on arrival and when reopened', async () => {
    renderApp()
    await openEditFromList('Valderrama')
    type('Title*', 'Real Club Valderrama')
    type('Par*', '72')

    save()
    await listHeading()

    expect(cardNames()).toContain('Real Club Valderrama')
    expect(cardNames()).not.toContain('Valderrama')

    await openEditFromList('Real Club Valderrama')

    expect(field('Title*')).toHaveValue('Real Club Valderrama')
    expect(field('Par*')).toHaveValue('72')
  })

  it('keeps the edits when a background refresh of the course fails', async () => {
    const course = await findCourse('Valderrama')
    const { queryClient } = renderApp(`/courses/${course.id}/edit`)
    await formReady()
    type('Title*', 'Real Club Valderrama')

    writeFailureSwitch('list', true)
    await act(() => queryClient.refetchQueries({ queryKey: coursesQueryKey }))

    expect(field('Title*')).toHaveValue('Real Club Valderrama')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('counts as saved when only the refresh afterwards fails', async () => {
    const update = vi.spyOn(coursesService, 'update')
    await openEdit('Valderrama')
    type('Title*', 'Real Club Valderrama')
    writeFailureSwitch('list', true)

    save()

    await listHeading()
    expect(update).toHaveBeenCalledOnce()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('stays on the form with the edits kept when the save fails', async () => {
    writeFailureSwitch('saves', true)
    const course = await openEdit('Valderrama')
    type('Title*', 'Real Club Valderrama')

    save()

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't save the course. Your changes are still here.")
    expect(field('Title*')).toHaveValue('Real Club Valderrama')
    expect(await coursesService.get(course.id)).toMatchObject({ name: 'Valderrama' })
  })
})

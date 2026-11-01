import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { coursesService } from '../services/courses-service'
import { writeFailureSwitch } from '../services/failure-switches'
import { renderApp } from '../test/render-app'

const field = (label: string) => screen.getByLabelText(label)
const type = (label: string, value: string) => fireEvent.change(field(label), { target: { value } })
const saveButton = () => screen.getByRole('button', { name: 'Save' })
const preview = () => within(screen.getByRole('complementary', { name: 'Card preview' }))
const openForm = () => screen.findByRole('heading', { level: 1, name: 'Create course' })
const listHeading = () => screen.findByRole('heading', { level: 1, name: 'Courses' })

function fillValidCourse() {
  type('Title*', '  Adare Manor ')
  type('Difficulty*', '3')
  type('Par*', '72')
  type('City/State*', ' Adare ')
  type('Country*', 'IE')
}

async function renderForm() {
  renderApp('/courses/new')
  await openForm()
}

function createGate() {
  let open = () => {}
  const passed = new Promise<void>((resolve) => {
    open = resolve
  })
  return { open, passed }
}

function holdNextCreate() {
  const { create } = coursesService
  const gate = createGate()
  vi.spyOn(coursesService, 'create').mockImplementationOnce(async (input) => {
    await gate.passed
    return create(input)
  })
  return gate.open
}

function holdNextList() {
  const { list } = coursesService
  const gate = createGate()
  vi.spyOn(coursesService, 'list').mockImplementationOnce(async () => {
    await gate.passed
    return list()
  })
  return gate.open
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
})

describe('validation', () => {
  it('shows an error per required field, focuses the first and saves nothing', async () => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()

    fireEvent.click(saveButton())

    expect(await screen.findByText('Enter a title')).toBeInTheDocument()
    expect(screen.getByText('Choose a difficulty')).toBeInTheDocument()
    expect(screen.getByText('Enter a par from 54 to 80')).toBeInTheDocument()
    expect(screen.getByText('Enter a city or state')).toBeInTheDocument()
    expect(screen.getByText('Choose a country')).toBeInTheDocument()
    await waitFor(() => expect(field('Title*')).toHaveFocus())
    expect(create).not.toHaveBeenCalled()
  })

  it('links an error to its field', async () => {
    await renderForm()
    expect(field('Title*')).toHaveAttribute('aria-invalid', 'false')

    fireEvent.click(saveButton())

    await screen.findByText('Enter a title')
    expect(field('Title*')).toHaveAttribute('aria-invalid', 'true')
    expect(field('Title*')).toHaveAccessibleDescription('Enter a title')
  })

  it('starts the selects on no choice', async () => {
    await renderForm()

    expect(field('Difficulty*')).toHaveValue('')
    expect(field('Country*')).toHaveValue('')
  })

  it.each(['53', '81', '70.5', 'abc'])('rejects a par of %s', async (par) => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()
    fillValidCourse()
    type('Par*', par)

    fireEvent.click(saveButton())

    expect(await screen.findByText('Enter a par from 54 to 80')).toBeInTheDocument()
    await waitFor(() => expect(field('Par*')).toHaveFocus())
    expect(create).not.toHaveBeenCalled()
  })

  it('explains a description over the limit', async () => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()
    fillValidCourse()
    type('Course description', 'a'.repeat(1001))

    fireEvent.click(saveButton())

    expect(await screen.findByText('Keep the description to 1000 characters')).toBeInTheDocument()
    await waitFor(() => expect(field('Course description')).toHaveFocus())
    expect(create).not.toHaveBeenCalled()
  })

  it('shows the typical par as a hint until there is an error', async () => {
    await renderForm()
    expect(field('Par*')).toHaveAccessibleDescription('Typical: 68–74')

    fireEvent.click(saveButton())

    await screen.findByText('Enter a par from 54 to 80')
    expect(field('Par*')).toHaveAccessibleDescription('Enter a par from 54 to 80')
  })
})

describe('saving', () => {
  it('saves the trimmed input with numbers and no image', async () => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()
    fillValidCourse()
    type('Course description', ' Parkland ')
    fireEvent.click(field('Featured course'))

    fireEvent.click(saveButton())

    await listHeading()
    expect(create).toHaveBeenCalledExactlyOnceWith({
      name: 'Adare Manor',
      city: 'Adare',
      countryCode: 'IE',
      par: 72,
      difficulty: 3,
      featured: true,
      description: 'Parkland',
      imageId: null,
    })
  })

  it.each([
    ['last among the featured courses', true],
    ['first among the other courses', false],
  ])('shows the course on arrival, %s', async (_, featured) => {
    renderApp()
    await listHeading()
    await screen.findAllByRole('heading', { level: 2 })
    fireEvent.click(screen.getByRole('link', { name: 'Create a course' }))
    await openForm()
    fillValidCourse()
    if (featured) {
      fireEvent.click(field('Featured course'))
    }

    fireEvent.click(saveButton())
    await listHeading()

    const names = screen.getAllByRole('heading', { level: 2 }).map((name) => name.textContent)
    expect(names).toEqual((await coursesService.list()).map((course) => course.name))
    expect(names.indexOf('Adare Manor')).toBe(2)
    const card = screen.getByRole('heading', { level: 2, name: 'Adare Manor' }).closest('article') as HTMLElement
    expect(within(card).queryAllByText('Featured')).toHaveLength(featured ? 1 : 0)
  })

  it('stays on the form until the list has refreshed', async () => {
    renderApp()
    await listHeading()
    await screen.findAllByRole('heading', { level: 2 })
    fireEvent.click(screen.getByRole('link', { name: 'Create a course' }))
    await openForm()
    fillValidCourse()
    const releaseList = holdNextList()

    fireEvent.click(saveButton())

    await waitFor(() => expect(coursesService.list).toHaveBeenCalledOnce())
    expect(screen.getByRole('button', { name: 'Saving…' })).toBeDisabled()
    releaseList()
    await listHeading()
  })

  it('counts as saved when only the list refresh fails', async () => {
    const create = vi.spyOn(coursesService, 'create')
    renderApp()
    await screen.findAllByRole('heading', { level: 2 })
    fireEvent.click(screen.getByRole('link', { name: 'Create a course' }))
    await openForm()
    fillValidCourse()
    writeFailureSwitch('list', true)

    fireEvent.click(saveButton())

    await listHeading()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(create).toHaveBeenCalledOnce()
  })

  it('disables Save and shows Saving… while pending', async () => {
    const releaseCreate = holdNextCreate()
    await renderForm()
    fillValidCourse()

    fireEvent.click(saveButton())

    expect(await screen.findByRole('button', { name: 'Saving…' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    releaseCreate()
    await listHeading()
  })

  it('creates one course from a double click', async () => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()
    fillValidCourse()

    fireEvent.click(saveButton())
    fireEvent.click(screen.getByRole('button', { name: /^Sav/ }))
    await listHeading()

    expect(create).toHaveBeenCalledOnce()
  })

  it('returns to the list from Cancel without saving', async () => {
    const create = vi.spyOn(coursesService, 'create')
    await renderForm()
    fillValidCourse()

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    await listHeading()
    expect(create).not.toHaveBeenCalled()
  })
})

describe('when the save fails', () => {
  it('stays on the form with the values kept, and saves once the failure is gone', async () => {
    writeFailureSwitch('saves', true)
    await renderForm()
    fillValidCourse()
    fireEvent.click(field('Featured course'))

    fireEvent.click(saveButton())

    expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't save the course. Your changes are still here.")
    expect(field('Title*')).toHaveValue('  Adare Manor ')
    expect(field('Difficulty*')).toHaveValue('3')
    expect(field('Par*')).toHaveValue('72')
    expect(field('City/State*')).toHaveValue(' Adare ')
    expect(field('Country*')).toHaveValue('IE')
    expect(field('Featured course')).toBeChecked()
    expect(saveButton()).toBeEnabled()

    writeFailureSwitch('saves', false)
    fireEvent.click(saveButton())

    await listHeading()
    expect(await screen.findByRole('heading', { level: 2, name: 'Adare Manor' })).toBeInTheDocument()
  })

  it('removes the banner on the next attempt', async () => {
    writeFailureSwitch('saves', true)
    await renderForm()
    fillValidCourse()
    fireEvent.click(saveButton())
    await screen.findByRole('alert')

    const releaseCreate = holdNextCreate()
    fireEvent.click(saveButton())

    await screen.findByRole('button', { name: 'Saving…' })
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    releaseCreate()
    await screen.findByRole('alert')
  })
})

describe('live preview', () => {
  it('starts on the placeholders', async () => {
    await renderForm()

    expect(preview().getByRole('heading', { level: 2 })).toHaveTextContent('Course name')
    expect(preview().getByText('City, Country')).toBeInTheDocument()
    expect(preview().getByText('Par –')).toBeInTheDocument()
    expect(preview().getByText('Difficulty: –/5')).toBeInTheDocument()
    expect(preview().getByRole('presentation')).toHaveAttribute('src', '/placeholder.png')
  })

  it('follows each field as it changes', async () => {
    await renderForm()

    type('Title*', 'Adare Manor')
    expect(preview().getByRole('heading', { level: 2 })).toHaveTextContent('Adare Manor')

    type('City/State*', 'Adare')
    type('Country*', 'IE')
    expect(preview().getByText('Adare, IE')).toBeInTheDocument()

    type('Par*', '72')
    expect(preview().getByText('Par 72')).toBeInTheDocument()

    type('Difficulty*', '3')
    expect(preview().getByText('Difficulty: 3/5')).toBeInTheDocument()
  })

  it('shows the badge while Featured is checked', async () => {
    await renderForm()
    expect(preview().queryByText('Featured')).not.toBeInTheDocument()

    fireEvent.click(field('Featured course'))
    expect(preview().getByText('Featured')).toBeInTheDocument()

    fireEvent.click(field('Featured course'))
    expect(preview().queryByText('Featured')).not.toBeInTheDocument()
  })

  it('keeps the par placeholder for text that is not a whole number', async () => {
    await renderForm()

    type('Par*', 'abc')

    expect(preview().getByText('Par –')).toBeInTheDocument()
  })

  it('returns to the difficulty placeholder if the empty option is chosen again', async () => {
    await renderForm()
    type('Difficulty*', '3')

    type('Difficulty*', '')

    expect(preview().getByText('Difficulty: –/5')).toBeInTheDocument()
  })
})

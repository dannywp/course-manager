import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import { CourseMenu } from './course-menu'

const course = { id: 'pebble', name: 'Pebble Beach' }

function renderMenu(onDelete: (trigger: HTMLButtonElement) => void = vi.fn()) {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<CourseMenu course={course} onDelete={onDelete} />} />
        <Route path="/courses/:id/edit" element={<p>Edit page</p>} />
      </Routes>
    </MemoryRouter>,
  )
  return screen.getByRole('button', { name: 'Actions for Pebble Beach' })
}

function openMenu(onDelete?: (trigger: HTMLButtonElement) => void) {
  const trigger = renderMenu(onDelete)
  fireEvent.click(trigger)
  return { trigger, menu: screen.getByRole('menu', { name: 'Actions for Pebble Beach' }) }
}

const edit = () => screen.getByRole('menuitem', { name: 'Edit' })
const remove = () => screen.getByRole('menuitem', { name: 'Delete' })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('opening', () => {
  it('stays closed until asked', () => {
    const trigger = renderMenu()

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).not.toHaveAttribute('aria-controls')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on click, focuses the first item and points the trigger at the menu', () => {
    const { trigger, menu } = openMenu()

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-controls', menu.id)
    expect(edit()).toHaveFocus()
  })

  it('opens on ArrowDown without scrolling the page', () => {
    const notPrevented = fireEvent.keyDown(renderMenu(), { key: 'ArrowDown' })

    expect(edit()).toHaveFocus()
    expect(notPrevented).toBe(false)
  })

  it('closes when the trigger is clicked again', () => {
    const { trigger } = openMenu()

    fireEvent.pointerDown(trigger)
    fireEvent.click(trigger)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})

describe('keyboard', () => {
  it('moves down without scrolling the page and wraps to the first item', () => {
    openMenu()

    expect(fireEvent.keyDown(edit(), { key: 'ArrowDown' })).toBe(false)
    expect(remove()).toHaveFocus()

    fireEvent.keyDown(remove(), { key: 'ArrowDown' })
    expect(edit()).toHaveFocus()
  })

  it('moves up and wraps to the last item', () => {
    openMenu()

    fireEvent.keyDown(edit(), { key: 'ArrowUp' })
    expect(remove()).toHaveFocus()

    fireEvent.keyDown(remove(), { key: 'ArrowUp' })
    expect(edit()).toHaveFocus()
  })

  it('jumps with Home and End', () => {
    openMenu()

    fireEvent.keyDown(edit(), { key: 'End' })
    expect(remove()).toHaveFocus()

    fireEvent.keyDown(remove(), { key: 'Home' })
    expect(edit()).toHaveFocus()
  })

  it.each(['Escape', 'Tab'])('closes on %s and returns focus to the trigger', (key) => {
    const { trigger } = openMenu()

    const notPrevented = fireEvent.keyDown(edit(), { key })

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(notPrevented).toBe(false)
  })
})

describe('pressing outside', () => {
  it('closes the menu without moving focus to the trigger', () => {
    const { trigger } = openMenu()

    fireEvent.pointerDown(document.body)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).not.toHaveFocus()
  })

  it('ignores a press inside the menu', () => {
    openMenu()

    fireEvent.pointerDown(remove())

    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})

describe('Edit', () => {
  it('links to the edit route', () => {
    openMenu()

    expect(edit()).toHaveAttribute('href', '/courses/pebble/edit')
  })

  it('follows the link on Space', async () => {
    openMenu()

    fireEvent.keyDown(edit(), { key: ' ' })

    expect(await screen.findByText('Edit page')).toBeInTheDocument()
  })
})

describe('Delete', () => {
  it('closes the menu, focuses the trigger and hands it to the caller', () => {
    const onDelete = vi.fn()
    const { trigger } = openMenu(onDelete)

    fireEvent.click(remove())

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(onDelete).toHaveBeenCalledExactlyOnceWith(trigger)
  })
})

describe('alignment', () => {
  it('aligns to the trigger end when the menu would overflow the viewport', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(900, 0, 192, 90))
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000)

    const { menu } = openMenu()

    expect(menu).toHaveAttribute('data-align', 'end')
  })

  it('keeps the default alignment when the menu fits', () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(100, 0, 192, 90))
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000)

    const { menu } = openMenu()

    expect(menu).not.toHaveAttribute('data-align')
  })
})

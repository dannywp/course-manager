import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { DeleteCourseModal } from './delete-course-modal'

function renderModal() {
  const onCancel = vi.fn()
  const onConfirm = vi.fn()
  render(<DeleteCourseModal courseName="Pebble Beach" onCancel={onCancel} onConfirm={onConfirm} />)
  return { onCancel, onConfirm, dialog: screen.getByRole('dialog', { name: 'Delete course' }) }
}

const button = (name: string) => screen.getByRole('button', { name })

it('describes itself with the course name', () => {
  const { dialog } = renderModal()

  expect(dialog).toHaveAccessibleDescription(
    'Are you sure you want to delete Pebble Beach? You will lose all data attached to it.',
  )
})

it('starts with focus on Cancel', () => {
  renderModal()

  expect(button('Cancel')).toHaveFocus()
})

it('wraps Tab from the last button to the first', () => {
  renderModal()
  button('Delete').focus()

  const notPrevented = fireEvent.keyDown(button('Delete'), { key: 'Tab' })

  expect(button('Close')).toHaveFocus()
  expect(notPrevented).toBe(false)
})

it('wraps Shift+Tab from the first button to the last', () => {
  renderModal()
  button('Close').focus()

  const notPrevented = fireEvent.keyDown(button('Close'), { key: 'Tab', shiftKey: true })

  expect(button('Delete')).toHaveFocus()
  expect(notPrevented).toBe(false)
})

it('leaves Tab between inner buttons to the browser', () => {
  renderModal()

  const notPrevented = fireEvent.keyDown(button('Cancel'), { key: 'Tab' })

  expect(notPrevented).toBe(true)
})

it.each(['Close', 'Cancel'])('closes before calling onCancel from %s', (name) => {
  const { onCancel, onConfirm, dialog } = renderModal()
  onCancel.mockImplementation(() => expect(dialog).not.toHaveAttribute('open'))

  fireEvent.click(button(name))

  expect(onCancel).toHaveBeenCalledOnce()
  expect(onConfirm).not.toHaveBeenCalled()
})

it('closes before calling onCancel from the native Escape cancel event', () => {
  const { onCancel, dialog } = renderModal()
  onCancel.mockImplementation(() => expect(dialog).not.toHaveAttribute('open'))

  fireEvent(dialog, new Event('cancel', { cancelable: true }))

  expect(onCancel).toHaveBeenCalledOnce()
})

it('closes before calling onConfirm from Delete', () => {
  const { onCancel, onConfirm, dialog } = renderModal()
  onConfirm.mockImplementation(() => expect(dialog).not.toHaveAttribute('open'))

  fireEvent.click(button('Delete'))

  expect(onConfirm).toHaveBeenCalledOnce()
  expect(onCancel).not.toHaveBeenCalled()
})

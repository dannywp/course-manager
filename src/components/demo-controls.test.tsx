import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { readFailureSwitches } from '../services/failure-switches'
import { DemoControls } from './demo-controls'

beforeEach(() => localStorage.clear())

it('persists a failure switch across a reload', () => {
  const { unmount } = render(<DemoControls />)
  fireEvent.click(screen.getByLabelText('Fail deletes'))
  unmount()

  render(<DemoControls />)

  expect(screen.getByLabelText('Fail deletes')).toBeChecked()
  expect(screen.getByLabelText('Fail list')).not.toBeChecked()
  expect(readFailureSwitches()).toEqual({ list: false, saves: false, deletes: true })
})

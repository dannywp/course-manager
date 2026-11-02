import { fireEvent, screen, within } from '@testing-library/react'
import { vi } from 'vitest'

export const field = (label: string) => screen.getByLabelText(label)
export const type = (label: string, value: string) => fireEvent.change(field(label), { target: { value } })
export const preview = () => within(screen.getByRole('complementary', { name: 'Card preview' }))
export const listHeading = () => screen.findByRole('heading', { level: 1, name: 'Courses' })

export function chooseFile(button: HTMLElement, file: File) {
  const click = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {})
  fireEvent.click(button)
  const [picker] = click.mock.contexts as HTMLInputElement[]
  click.mockRestore()
  if (!picker) {
    throw new Error('The file picker did not open')
  }
  fireEvent.change(picker, { target: { files: [file] } })
}

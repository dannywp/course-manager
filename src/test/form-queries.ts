import { fireEvent, screen, within } from '@testing-library/react'

export const field = (label: string) => screen.getByLabelText(label)
export const type = (label: string, value: string) => fireEvent.change(field(label), { target: { value } })
export const preview = () => within(screen.getByRole('complementary', { name: 'Card preview' }))
export const listHeading = () => screen.findByRole('heading', { level: 1, name: 'Courses' })

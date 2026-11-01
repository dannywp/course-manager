import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CourseCard } from './course-card'

const course = {
  name: 'Pebble Beach Golf Links',
  city: 'Pebble Beach',
  countryCode: 'US',
  par: 72,
  difficulty: 4,
  featured: false,
  imageUrl: '/seed/pebble-beach.jpg',
} as const

const image = () => screen.getByRole('presentation')

it('maps the course to its location and meta lines', () => {
  render(<CourseCard course={course} />)

  expect(screen.getByText('Pebble Beach, US')).toBeInTheDocument()
  expect(screen.getByText('Par 72')).toBeInTheDocument()
  expect(screen.getByText('Difficulty: 4/5')).toBeInTheDocument()
})

it('keeps the full name and location in title for truncated text', () => {
  render(<CourseCard course={course} />)

  expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('title', course.name)
  expect(screen.getByText('Pebble Beach, US')).toHaveAttribute('title', 'Pebble Beach, US')
})

describe('featured badge', () => {
  it('shows on a featured course', () => {
    render(<CourseCard course={{ ...course, featured: true }} />)

    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('is absent on a course that is not featured', () => {
    render(<CourseCard course={course} />)

    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })
})

describe('image', () => {
  it('shows the photo when the course has one', () => {
    render(<CourseCard course={course} />)

    expect(image()).toHaveAttribute('src', course.imageUrl)
  })

  it('shows the placeholder when the course has no image', () => {
    render(<CourseCard course={{ ...course, imageUrl: null }} />)

    expect(image()).toHaveAttribute('src', '/placeholder.png')
  })

  it('shows the placeholder when the photo fails to load', () => {
    render(<CourseCard course={course} />)

    fireEvent.error(image())

    expect(image()).toHaveAttribute('src', '/placeholder.png')
  })

  it('tries a new image after an earlier one failed', () => {
    const { rerender } = render(<CourseCard course={course} />)
    fireEvent.error(image())

    rerender(<CourseCard course={{ ...course, imageUrl: '/seed/st-andrews.jpg' }} />)

    expect(image()).toHaveAttribute('src', '/seed/st-andrews.jpg')
  })
})

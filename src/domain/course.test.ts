import { expect, it } from 'vitest'
import { courseSchema, type Course } from './course'

const valid: Course = {
  id: 'pebble-beach',
  name: 'Pebble Beach Golf Links',
  city: 'Pebble Beach',
  countryCode: 'US',
  par: 72,
  difficulty: 4,
  featured: true,
  description: '',
  imageId: null,
  createdAt: 100,
  updatedAt: 200,
  featuredAt: 150,
}

it('accepts a valid course', () => {
  expect(courseSchema.safeParse(valid).success).toBe(true)
})

it.each<[string, unknown]>([
  ['a missing name', { ...valid, name: undefined }],
  ['a difficulty above 5', { ...valid, difficulty: 6 }],
  ['a fractional par', { ...valid, par: 70.5 }],
  ['a country outside the list', { ...valid, countryCode: 'XX' }],
  ['a string timestamp', { ...valid, createdAt: '2026-10-29' }],
  ['a featured course without featuredAt', { ...valid, featuredAt: null }],
  ['a non-featured course with featuredAt', { ...valid, featured: false }],
])('rejects %s', (_, shape) => {
  expect(courseSchema.safeParse(shape).success).toBe(false)
})

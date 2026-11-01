import { expect, it } from 'vitest'
import { courseInputSchema, courseSchema, type Course } from './course'

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

const input = {
  name: 'Adare Manor',
  city: 'Adare',
  countryCode: 'IE',
  par: 72,
  difficulty: 3,
  featured: false,
  description: '',
  imageId: null,
}

it('trims the text fields', () => {
  const parsed = courseInputSchema.parse({ ...input, name: '  Adare Manor ', city: ' Adare ', description: ' Parkland ' })

  expect(parsed).toMatchObject({ name: 'Adare Manor', city: 'Adare', description: 'Parkland' })
})

it.each<[string, number, boolean]>([
  ['below the minimum', 53, false],
  ['at the minimum', 54, true],
  ['at the maximum', 80, true],
  ['above the maximum', 81, false],
])('checks a par %s', (_, par, valid) => {
  expect(courseInputSchema.safeParse({ ...input, par }).success).toBe(valid)
})

it.each<[string, number, boolean]>([
  ['below the minimum', 0, false],
  ['at the minimum', 1, true],
  ['at the maximum', 5, true],
  ['above the maximum', 6, false],
])('checks a difficulty %s', (_, difficulty, valid) => {
  expect(courseInputSchema.safeParse({ ...input, difficulty }).success).toBe(valid)
})

it.each<[string, Record<string, unknown>, string]>([
  ['a blank name', { name: '   ' }, 'Enter a title'],
  ['a name over 80 characters', { name: 'a'.repeat(81) }, 'Keep the title to 80 characters'],
  ['a blank city', { city: '' }, 'Enter a city or state'],
  ['a city over 60 characters', { city: 'a'.repeat(61) }, 'Keep the city or state to 60 characters'],
  ['no country', { countryCode: '' }, 'Choose a country'],
  ['a blank par', { par: Number.NaN }, 'Enter a par from 54 to 80'],
  ['a fractional par', { par: 70.5 }, 'Enter a par from 54 to 80'],
  ['no difficulty', { difficulty: Number.NaN }, 'Choose a difficulty'],
  ['a description over 1000 characters', { description: 'a'.repeat(1001) }, 'Keep the description to 1000 characters'],
])('explains %s', (_, change, message) => {
  const result = courseInputSchema.safeParse({ ...input, ...change })

  expect(result.error?.issues[0].message).toBe(message)
})

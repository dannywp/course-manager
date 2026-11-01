import { describe, expect, it } from 'vitest'
import type { Course, CourseInput } from '../domain/course'
import { applySave, sortCourses } from './course-rules'

const input: CourseInput = {
  name: 'Pebble Beach Golf Links',
  city: 'Pebble Beach',
  countryCode: 'US',
  par: 72,
  difficulty: 4,
  featured: false,
  description: '',
  imageId: null,
}

function course(id: string, fields: Partial<Course> = {}): Course {
  return { ...input, id, createdAt: 0, updatedAt: 0, featuredAt: null, ...fields }
}

function featured(id: string, featuredAt: number, createdAt = 0): Course {
  return course(id, { featured: true, featuredAt, createdAt })
}

const ids = (courses: Course[]) => courses.map((c) => c.id)

describe('sortCourses', () => {
  it('orders featured courses by when they became featured, oldest first (brief example)', () => {
    const feat1 = featured('feat1', 500, 300)
    const feat2 = featured('feat2', 600, 100)
    const feat3 = featured('feat3', 700, 400)
    const feat4 = featured('feat4', 800, 200)

    expect(ids(sortCourses([feat4, feat2, feat3, feat1]))).toEqual(['feat1', 'feat2', 'feat3', 'feat4'])
  })

  it('puts featured courses first, then the rest newest first', () => {
    const oldest = course('oldest', { createdAt: 100 })
    const newest = course('newest', { createdAt: 300 })
    const middle = course('middle', { createdAt: 200 })
    const feat1 = featured('feat1', 500, 50)
    const feat2 = featured('feat2', 600, 900)

    expect(ids(sortCourses([oldest, feat2, newest, middle, feat1]))).toEqual([
      'feat1',
      'feat2',
      'newest',
      'middle',
      'oldest',
    ])
  })

  it('breaks a featuredAt tie by createdAt, newest first', () => {
    const older = featured('older', 500, 100)
    const newer = featured('newer', 500, 200)

    expect(ids(sortCourses([older, newer]))).toEqual(['newer', 'older'])
  })

  it('keeps the input order when createdAt ties', () => {
    const a = course('a', { createdAt: 100 })
    const b = course('b', { createdAt: 100 })

    expect(ids(sortCourses([a, b]))).toEqual(['a', 'b'])
    expect(ids(sortCourses([b, a]))).toEqual(['b', 'a'])
  })

  it('returns a new array and leaves the input untouched', () => {
    const list = [course('old', { createdAt: 1 }), course('new', { createdAt: 2 })]

    const sorted = sortCourses(list)

    expect(sorted).not.toBe(list)
    expect(ids(list)).toEqual(['old', 'new'])
  })
})

describe('applySave', () => {
  it('stamps createdAt and updatedAt on create, with no featuredAt', () => {
    expect(applySave(null, input, 1000)).toEqual({
      ...input,
      createdAt: 1000,
      updatedAt: 1000,
      featuredAt: null,
    })
  })

  it('sets featuredAt to the save time when created as featured', () => {
    expect(applySave(null, { ...input, featured: true }, 1000)).toMatchObject({
      featured: true,
      featuredAt: 1000,
    })
  })

  it('sets featuredAt to the save time when a course becomes featured', () => {
    const previous = course('a', { createdAt: 100, updatedAt: 100 })

    expect(applySave(previous, { ...input, featured: true }, 2000)).toMatchObject({
      featured: true,
      featuredAt: 2000,
    })
  })

  it('keeps the original featuredAt when a featured course stays featured', () => {
    const previous = featured('a', 500, 100)

    expect(applySave(previous, { ...input, featured: true, name: 'Renamed' }, 2000)).toMatchObject({
      name: 'Renamed',
      featured: true,
      featuredAt: 500,
    })
  })

  it('clears featuredAt when a course is unfeatured', () => {
    const previous = featured('a', 500, 100)

    expect(applySave(previous, { ...input, featured: false }, 2000)).toMatchObject({
      featured: false,
      featuredAt: null,
    })
  })

  it('keeps createdAt and moves updatedAt on update', () => {
    const previous = course('a', { createdAt: 100, updatedAt: 100 })

    expect(applySave(previous, input, 2000)).toMatchObject({ createdAt: 100, updatedAt: 2000 })
  })
})

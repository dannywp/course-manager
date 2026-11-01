import { z } from 'zod'
import { courseInputSchema, courseSchema, type Course } from '../domain/course'
import { applySave, sortCourses } from './course-rules'
import type { CoursesService } from './courses-service'
import { readFailureSwitches, type FailureSwitches } from './failure-switches'
import { seedCourses } from './seed-courses'

type Options = {
  latency?: () => number
  now?: () => number
}

const storageKey = 'course-manager:courses'
const storedCoursesSchema = z.array(courseSchema)

export function createLocalCoursesService({
  latency = () => 600 + Math.random() * 300,
  now = Date.now,
}: Options = {}): CoursesService {
  function read(): Course[] {
    const stored = localStorage.getItem(storageKey)
    if (stored === null) {
      const seeded = seedCourses(now())
      write(seeded)
      return seeded
    }
    return storedCoursesSchema.parse(JSON.parse(stored))
  }

  function write(courses: Course[]) {
    localStorage.setItem(storageKey, JSON.stringify(courses))
  }

  async function respond<T>(failure: keyof FailureSwitches, run: () => T): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, latency()))
    if (readFailureSwitches()[failure]) {
      throw new Error(`Simulated failure (fail ${failure})`)
    }
    return run()
  }

  return {
    list: () => respond('list', () => sortCourses(read())),

    get: (id) => respond('list', () => read().find((course) => course.id === id) ?? null),

    create: (input) =>
      respond('saves', () => {
        const course = { id: crypto.randomUUID(), ...applySave(null, courseInputSchema.parse(input), now()) }
        write([...read(), course])
        return course
      }),

    update: (id, input) =>
      respond('saves', () => {
        const courses = read()
        const previous = courses.find((course) => course.id === id)
        if (!previous) {
          throw new Error(`Course ${id} not found`)
        }
        const course = { id, ...applySave(previous, courseInputSchema.parse(input), now()) }
        write(courses.map((existing) => (existing.id === id ? course : existing)))
        return course
      }),

    remove: (id) =>
      respond('deletes', () => {
        write(read().filter((course) => course.id !== id))
      }),
  }
}

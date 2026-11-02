import { del, get, set } from 'idb-keyval'
import { z } from 'zod'
import { courseInputSchema, courseSchema, type Course, type CourseWithImage } from '../domain/course'
import { validateImageFile } from '../domain/image-file'
import { applySave, sortCourses } from './course-rules'
import type { CoursesService } from './courses-service'
import { readFailureSwitches, type FailureSwitches } from './failure-switches'
import { seedCourses } from './seed-courses'

export type ImageStore = {
  get(id: string): Promise<File | undefined>
  set(id: string, file: File): Promise<void>
  del(id: string): Promise<void>
}

type Options = {
  latency?: () => number
  now?: () => number
  images?: ImageStore
}

const storageKey = 'course-manager:courses'
const storedCoursesSchema = z.array(courseSchema)

export function createLocalCoursesService({
  latency = () => 600 + Math.random() * 300,
  now = Date.now,
  images = { get, set, del },
}: Options = {}): CoursesService {
  const objectUrls = new Map<string, string>()

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

  async function withImage(course: Course): Promise<CourseWithImage> {
    const { imageId } = course
    if (imageId === null) {
      return { ...course, imageUrl: null, imageName: null }
    }
    if (imageId.startsWith('seed:')) {
      const imageName = `${imageId.slice('seed:'.length)}.jpg`
      return { ...course, imageUrl: `/seed/${imageName}`, imageName }
    }
    const file = await images.get(imageId)
    if (!file) {
      return { ...course, imageUrl: null, imageName: null }
    }
    const imageUrl = objectUrls.get(imageId) ?? URL.createObjectURL(file)
    objectUrls.set(imageId, imageUrl)
    return { ...course, imageUrl, imageName: file.name }
  }

  async function saveWithImage(image: File | undefined, keptImageId: string | null, save: (imageId: string | null) => Course) {
    if (!image) {
      return save(keptImageId)
    }
    const error = validateImageFile(image)
    if (error) {
      throw new Error(error)
    }
    const imageId = crypto.randomUUID()
    await images.set(imageId, image)
    try {
      return save(imageId)
    } catch (saveError) {
      await images.del(imageId)
      throw saveError
    }
  }

  async function deleteImage(imageId: string | null) {
    if (imageId === null) {
      return
    }
    await images.del(imageId).catch((error: unknown) => console.error(`Couldn't delete image ${imageId}`, error))
    const url = objectUrls.get(imageId)
    if (url) {
      URL.revokeObjectURL(url)
      objectUrls.delete(imageId)
    }
  }

  async function respond<T>(failure: keyof FailureSwitches, run: () => T | Promise<T>): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, latency()))
    if (readFailureSwitches()[failure]) {
      throw new Error(`Simulated failure (fail ${failure})`)
    }
    return run()
  }

  return {
    list: () => respond('list', () => Promise.all(sortCourses(read()).map(withImage))),

    get: (id) =>
      respond('list', () => {
        const course = read().find((candidate) => candidate.id === id)
        return course ? withImage(course) : null
      }),

    create: (input, image) =>
      respond('saves', async () => {
        const parsed = courseInputSchema.parse(input)
        const course = await saveWithImage(image, parsed.imageId, (imageId) => {
          const created = { id: crypto.randomUUID(), ...applySave(null, { ...parsed, imageId }, now()) }
          write([...read(), created])
          return created
        })
        return withImage(course)
      }),

    update: (id, input, image) =>
      respond('saves', async () => {
        const previous = read().find((course) => course.id === id)
        if (!previous) {
          throw new Error(`Course ${id} not found`)
        }
        const parsed = courseInputSchema.parse(input)
        const course = await saveWithImage(image, previous.imageId, (imageId) => {
          const updated = { id, ...applySave(previous, { ...parsed, imageId }, now()) }
          write(read().map((existing) => (existing.id === id ? updated : existing)))
          return updated
        })
        if (course.imageId !== previous.imageId) {
          await deleteImage(previous.imageId)
        }
        return withImage(course)
      }),

    remove: (id) =>
      respond('deletes', async () => {
        const courses = read()
        write(courses.filter((course) => course.id !== id))
        await deleteImage(courses.find((course) => course.id === id)?.imageId ?? null)
      }),
  }
}

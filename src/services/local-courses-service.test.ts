import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { CourseInput } from '../domain/course'
import { createMemoryImageStore } from '../test/memory-image-store'
import type { CoursesService } from './courses-service'
import { writeFailureSwitch } from './failure-switches'
import { createLocalCoursesService } from './local-courses-service'

const input: CourseInput = {
  name: 'Kiawah Island Ocean Course',
  city: 'Kiawah Island',
  countryCode: 'US',
  par: 72,
  difficulty: 5,
  featured: false,
  description: '',
  imageId: null,
}

const clockStart = Date.parse('2026-10-29T12:00:00Z')

let imageStore = createMemoryImageStore()

function createService(now = () => clockStart) {
  return createLocalCoursesService({ latency: () => 0, now, images: imageStore.store })
}

function image(name = 'adare.jpg') {
  return new File(['photo'], name, { type: 'image/jpeg' })
}

beforeEach(() => {
  localStorage.clear()
  imageStore = createMemoryImageStore()
})
afterEach(() => {
  vi.restoreAllMocks()
})

describe('seed data', () => {
  it('seeds six courses on first run', async () => {
    expect(await createService().list()).toHaveLength(6)
  })

  it('does not reseed once every course has been deleted', async () => {
    const service = createService()
    for (const course of await service.list()) {
      await service.remove(course.id)
    }

    expect(await createService().list()).toEqual([])
  })
})

describe('list', () => {
  it('places a new featured course last among featured and a new course first among the rest', async () => {
    let now = clockStart
    const service = createService(() => now)
    const seeded = await service.list()
    const featuredCount = seeded.filter((course) => course.featured).length

    now += 1000
    const plain = await service.create(input)
    now += 1000
    const starred = await service.create({ ...input, name: 'Starred', featured: true })

    const ids = (await service.list()).map((course) => course.id)
    expect(ids[featuredCount]).toBe(starred.id)
    expect(ids[featuredCount + 1]).toBe(plain.id)
  })
})

describe('create and update', () => {
  it('stamps timestamps with the service clock', async () => {
    let now = 1000
    const service = createService(() => now)

    const created = await service.create(input)
    expect(created).toMatchObject({ createdAt: 1000, updatedAt: 1000, featuredAt: null })

    now = 2000
    const updated = await service.update(created.id, { ...input, featured: true })
    expect(updated).toMatchObject({ id: created.id, createdAt: 1000, updatedAt: 2000, featuredAt: 2000 })
  })

  it('keeps saved courses for a new service instance, as after a refresh', async () => {
    const created = await createService().create(input)

    expect(await createService().get(created.id)).toEqual(created)
  })

  it('stores an update on the course it targets and leaves the others alone', async () => {
    const service = createService()
    const [first, second] = await service.list()

    const updated = await service.update(first.id, { ...input, name: 'Renamed' })

    const stored = await createService().list()
    expect(stored).toHaveLength(6)
    expect(stored.find((course) => course.id === first.id)).toEqual(updated)
    expect(stored.find((course) => course.id === second.id)).toEqual(second)
  })

  it('rejects invalid input and stores nothing', async () => {
    const service = createService()
    const before = await service.list()

    await expect(service.create({ ...input, name: '  ' })).rejects.toThrow()
    await expect(service.update(before[0].id, { ...input, par: 200 })).rejects.toThrow()

    expect(await service.list()).toEqual(before)
  })

  it('rejects an update of an unknown course', async () => {
    await expect(createService().update('missing', input)).rejects.toThrow()
  })
})

describe('get', () => {
  it('returns null for an unknown id', async () => {
    expect(await createService().get('missing')).toBeNull()
  })
})

describe('images', () => {
  it('resolves a seed image to its static path and file name without storing it', async () => {
    const service = createService()
    const { id } = await service.create({ ...input, imageId: 'seed:pebble-beach' })

    expect((await service.list()).find((course) => course.id === id)).toMatchObject({
      imageUrl: '/seed/pebble-beach.jpg',
      imageName: 'pebble-beach.jpg',
    })
    expect(imageStore.files.size).toBe(0)
  })

  it('resolves a course without an image to null', async () => {
    const service = createService()
    const { id } = await service.create(input)

    expect((await service.list()).find((course) => course.id === id)).toMatchObject({ imageUrl: null, imageName: null })
  })

  it('stores an uploaded image under the course imageId and resolves it after a refresh', async () => {
    const created = await createService().create(input, image())

    expect([...imageStore.files.keys()]).toEqual([created.imageId])
    expect(created).toMatchObject({ imageUrl: expect.stringMatching(/^blob:/), imageName: 'adare.jpg' })

    const reloaded = await createService().get(created.id)
    expect(reloaded).toMatchObject({ imageId: created.imageId, imageUrl: expect.stringMatching(/^blob:/), imageName: 'adare.jpg' })
  })

  it('creates one object URL per image and reuses it', async () => {
    const service = createService()
    const created = await service.create(input, image())

    expect((await service.get(created.id))?.imageUrl).toBe(created.imageUrl)
    expect((await service.list()).find((course) => course.id === created.id)?.imageUrl).toBe(created.imageUrl)
  })

  it('resolves a course whose image is missing from storage to null', async () => {
    const created = await createService().create(input, image())
    imageStore.files.clear()

    expect(await createService().get(created.id)).toMatchObject({ imageId: created.imageId, imageUrl: null, imageName: null })
  })

  it('deletes and revokes the old image when an image is replaced', async () => {
    const service = createService()
    const created = await service.create(input, image())

    const updated = await service.update(created.id, created, image('new.jpg'))

    expect(updated.imageName).toBe('new.jpg')
    expect([...imageStore.files.keys()]).toEqual([updated.imageId])
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(created.imageUrl)
  })

  it('keeps the image when a course is updated without a new one', async () => {
    const service = createService()
    const created = await service.create(input, image())

    const updated = await service.update(created.id, { ...created, name: 'Renamed' })

    expect(updated).toMatchObject({ imageId: created.imageId, imageUrl: created.imageUrl })
    expect([...imageStore.files.keys()]).toEqual([created.imageId])
  })

  it('keeps the stored image when an update without a new one sends another imageId', async () => {
    const service = createService()
    const created = await service.create(input, image())

    const updated = await service.update(created.id, { ...created, imageId: 'stale' })

    expect(updated).toMatchObject({ imageId: created.imageId, imageUrl: created.imageUrl })
    expect([...imageStore.files.keys()]).toEqual([created.imageId])
  })

  it('removes the new image again when the course cannot be written', async () => {
    const service = createService()
    const [first] = await service.list()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError')
    })

    await expect(service.create(input, image())).rejects.toThrow('Quota exceeded')
    await expect(service.update(first.id, first, image())).rejects.toThrow('Quota exceeded')

    expect(imageStore.files.size).toBe(0)
  })

  it('still saves when the replaced image cannot be deleted, and logs it', async () => {
    const service = createService()
    const created = await service.create(input, image())
    vi.spyOn(imageStore.store, 'del').mockRejectedValueOnce(new Error('IndexedDB closed'))
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    const updated = await service.update(created.id, created, image('new.jpg'))

    expect(updated.imageName).toBe('new.jpg')
    expect((await service.get(created.id))?.imageName).toBe('new.jpg')
    expect(log).toHaveBeenCalledWith(`Couldn't delete image ${created.imageId}`, expect.any(Error))
  })

  it('deletes and revokes the image when its course is removed', async () => {
    const service = createService()
    const created = await service.create(input, image())

    await service.remove(created.id)

    expect(imageStore.files.size).toBe(0)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(created.imageUrl)
  })

  it('rejects an image that is not JPG, PNG or WebP and stores nothing', async () => {
    const service = createService()
    const before = await service.list()
    const gif = new File(['gif'], 'animation.gif', { type: 'image/gif' })

    await expect(service.create(input, gif)).rejects.toThrow('Only JPG, PNG or WebP images are allowed')
    await expect(service.update(before[0].id, before[0], gif)).rejects.toThrow()

    expect(imageStore.files.size).toBe(0)
    expect(await service.list()).toEqual(before)
  })

  it('stores no image when the save fails', async () => {
    const service = createService()
    const [first] = await service.list()
    writeFailureSwitch('saves', true)

    await expect(service.create(input, image())).rejects.toThrow()
    await expect(service.update(first.id, first, image())).rejects.toThrow()

    expect(imageStore.files.size).toBe(0)
  })

  it('stores no image when the course input is invalid', async () => {
    await expect(createService().create({ ...input, name: '' }, image())).rejects.toThrow()

    expect(imageStore.files.size).toBe(0)
  })
})

// Mock-only behaviour: remove when a real service replaces the mock.
describe('remove', () => {
  it('succeeds for an unknown id and leaves the stored courses alone', async () => {
    const service = createService()
    const before = await service.list()

    await expect(service.remove('missing')).resolves.toBeUndefined()

    expect(await service.list()).toEqual(before)
  })
})

describe('failure switches', () => {
  type Call = 'list' | 'get' | 'create' | 'update' | 'remove'

  function calls(service: CoursesService, id: string): [Call, () => Promise<unknown>][] {
    return [
      ['list', () => service.list()],
      ['get', () => service.get(id)],
      ['create', () => service.create(input)],
      ['update', () => service.update(id, input)],
      ['remove', () => service.remove(id)],
    ]
  }

  it.each([
    ['list', ['list', 'get']],
    ['saves', ['create', 'update']],
    ['deletes', ['remove']],
  ] as const)('with "fail %s" on, only %j reject', async (name, failing) => {
    const service = createService()
    const [first] = await service.list()
    writeFailureSwitch(name, true)

    for (const [call, run] of calls(service, first.id)) {
      if ((failing as readonly Call[]).includes(call)) {
        await expect(run(), call).rejects.toThrow()
      } else {
        await run()
      }
    }
  })

  it('keeps the course stored when a delete fails', async () => {
    const service = createService()
    const [first] = await service.list()
    writeFailureSwitch('deletes', true)

    await expect(service.remove(first.id)).rejects.toThrow()

    writeFailureSwitch('deletes', false)
    expect(await service.get(first.id)).toEqual(first)
  })
})

// Mock-only behaviour: remove when a real service replaces the mock.
describe('latency', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('resolves only after the simulated latency', async () => {
    const service = createLocalCoursesService({ latency: () => 600 })
    const settled = vi.fn()
    void service.list().then(settled)

    await vi.advanceTimersByTimeAsync(599)
    expect(settled).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(settled).toHaveBeenCalled()
  })
})

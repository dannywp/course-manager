import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { CourseInput } from '../domain/course'
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

function createService(now = () => clockStart) {
  return createLocalCoursesService({ latency: () => 0, now })
}

beforeEach(() => localStorage.clear())

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

describe('image urls', () => {
  it('resolves a seed image to its static path', async () => {
    const service = createService()
    const { id } = await service.create({ ...input, imageId: 'seed:pebble-beach' })

    expect((await service.list()).find((course) => course.id === id)?.imageUrl).toBe('/seed/pebble-beach.jpg')
  })

  it('resolves a course without an image to null', async () => {
    const service = createService()
    const { id } = await service.create(input)

    expect((await service.list()).find((course) => course.id === id)?.imageUrl).toBeNull()
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

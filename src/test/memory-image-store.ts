import type { ImageStore } from '../services/local-courses-service'

export function createMemoryImageStore() {
  const files = new Map<string, File>()
  const store: ImageStore = {
    get: async (id) => files.get(id),
    set: async (id, file) => {
      files.set(id, file)
    },
    del: async (id) => {
      files.delete(id)
    },
  }
  return { store, files }
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import type { CourseInput } from '../domain/course'
import { coursesService } from '../services/courses-service'
import { coursesQueryKey } from './use-courses-query'

export function useSaveCourse(id?: string) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync, isError } = useMutation({
    mutationFn: (input: CourseInput) => (id ? coursesService.update(id, input) : coursesService.create(input)),
    // The key also matches the course's detail query. The list isn't mounted during a save, so the default
    // refetch type would skip it and changes would pop in after arriving back. Returning the promise waits for it.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: coursesQueryKey, refetchType: 'all' }),
  })

  async function save(input: CourseInput) {
    // The form shows the failure from saveFailed, and a rejection here would go unhandled.
    const saved = await mutateAsync(input).catch(() => null)
    if (saved) {
      await navigate('/')
    }
  }

  return { save, saveFailed: isError }
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CourseInput } from '../domain/course'
import { coursesService } from '../services/courses-service'
import { coursesQueryKey } from './use-courses-query'

export function useCreateCourseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CourseInput) => coursesService.create(input),
    // The list isn't mounted during a save, so the default refetch type would skip it and the
    // new course would pop in after arriving back. Returning the promise waits for the fresh list.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: coursesQueryKey, refetchType: 'all' }),
  })
}

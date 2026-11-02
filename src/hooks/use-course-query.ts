import { useQuery } from '@tanstack/react-query'
import { coursesService } from '../services/courses-service'
import { coursesQueryKey } from './use-courses-query'

export function useCourseQuery(id: string) {
  return useQuery({
    queryKey: [...coursesQueryKey, id],
    queryFn: () => coursesService.get(id),
    retry: false,
    // The form reads its values once on mount, so a cached copy could prefill it with old data.
    gcTime: 0,
  })
}

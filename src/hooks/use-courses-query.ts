import { useQuery } from '@tanstack/react-query'
import { coursesService } from '../services/courses-service'

export const coursesQueryKey = ['courses']

export function useCoursesQuery() {
  return useQuery({ queryKey: coursesQueryKey, queryFn: () => coursesService.list(), retry: false })
}

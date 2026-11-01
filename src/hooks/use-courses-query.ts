import { useQuery } from '@tanstack/react-query'
import { coursesService } from '../services/courses-service'

export function useCoursesQuery() {
  return useQuery({ queryKey: ['courses'], queryFn: () => coursesService.list(), retry: false })
}

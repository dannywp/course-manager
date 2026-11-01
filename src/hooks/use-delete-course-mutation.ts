import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CourseWithImage } from '../domain/course'
import { coursesService } from '../services/courses-service'
import { coursesQueryKey } from './use-courses-query'

export function useDeleteCourseMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (course: CourseWithImage) => coursesService.remove(course.id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: coursesQueryKey })
      const previous = queryClient.getQueryData<CourseWithImage[]>(coursesQueryKey)
      queryClient.setQueryData<CourseWithImage[]>(coursesQueryKey, (courses) =>
        courses?.filter((course) => course.id !== id),
      )
      return { previous }
    },
    onError: (_error, _course, context) => {
      queryClient.setQueryData(coursesQueryKey, context?.previous)
    },
    // Returning this promise would keep the mutation pending until the refetch ends, delaying the failure notice.
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: coursesQueryKey })
    },
  })
}

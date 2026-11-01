import { useNavigate } from 'react-router'
import { CourseForm } from '../components/course-form'
import { PageHeader } from '../components/page-header'
import type { CourseInput } from '../domain/course'
import { useCreateCourseMutation } from '../hooks/use-create-course-mutation'

export function Component() {
  const navigate = useNavigate()
  const createCourse = useCreateCourseMutation()

  async function save(input: CourseInput) {
    // The form shows the failure from createCourse.isError, and a rejection here would go unhandled.
    const created = await createCourse.mutateAsync(input).catch(() => null)
    if (created) {
      await navigate('/')
    }
  }

  return (
    <>
      <PageHeader title="Create course" />
      <CourseForm saveFailed={createCourse.isError} onSubmit={save} />
    </>
  )
}

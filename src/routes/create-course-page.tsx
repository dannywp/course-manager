import { CourseForm } from '../components/course-form'
import { PageHeader } from '../components/page-header'
import { useSaveCourse } from '../hooks/use-save-course'

export function Component() {
  const { save, saveFailed } = useSaveCourse()

  return (
    <>
      <PageHeader title="Create course" />
      <CourseForm saveFailed={saveFailed} onSubmit={save} />
    </>
  )
}

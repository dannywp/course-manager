import { Link, useParams } from 'react-router'
import buttonStyles from '../components/button.module.css'
import { CourseForm, CourseFormSkeleton } from '../components/course-form'
import { PageHeader } from '../components/page-header'
import messageStyles from '../components/page-message.module.css'
import { useCourseQuery } from '../hooks/use-course-query'
import { useSaveCourse } from '../hooks/use-save-course'

const buttonClass = `${buttonStyles.button} ${buttonStyles.primary}`

function CourseState({ id }: { id: string }) {
  const { data: course, isError, refetch } = useCourseQuery(id)
  const { save, saveFailed } = useSaveCourse(id)

  if (course) {
    return <CourseForm course={course} saveFailed={saveFailed} onSubmit={save} />
  }

  if (course === null) {
    return (
      <div className={messageStyles.message}>
        <p>Course not found</p>
        <Link to="/" className={buttonClass}>
          Back to courses
        </Link>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={messageStyles.message} role="alert">
        <p>Couldn't load the course</p>
        <button type="button" className={buttonClass} onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    )
  }

  return <CourseFormSkeleton />
}

export function Component() {
  const { id } = useParams<'id'>()

  return (
    <>
      <PageHeader title="Edit course" />
      <CourseState id={id!} />
    </>
  )
}

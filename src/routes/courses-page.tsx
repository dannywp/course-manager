import { useRef, useState } from 'react'
import { Link } from 'react-router'
import buttonStyles from '../components/button.module.css'
import { CloseIcon } from '../components/close-icon'
import { CourseCard } from '../components/course-card'
import { CourseCardSkeleton } from '../components/course-card-skeleton'
import { CourseMenu } from '../components/course-menu'
import { DeleteCourseModal } from '../components/delete-course-modal'
import { PageHeader } from '../components/page-header'
import type { CourseWithImage } from '../domain/course'
import { useCoursesQuery } from '../hooks/use-courses-query'
import { useDeleteCourseMutation } from '../hooks/use-delete-course-mutation'
import styles from './courses-page.module.css'

const buttonClass = `${buttonStyles.button} ${buttonStyles.primary}`

type DeleteRequest = {
  course: CourseWithImage
  trigger: HTMLButtonElement
}

function CoursesState({ onDelete }: { onDelete: (request: DeleteRequest) => void }) {
  const { data: courses, isError, refetch } = useCoursesQuery()

  if (courses?.length === 0) {
    return (
      <div className={styles.message}>
        <p>No courses yet</p>
        <Link to="/courses/new" className={buttonClass}>
          Create a course
        </Link>
      </div>
    )
  }

  if (courses) {
    return (
      <ul className={styles.list}>
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard
              course={course}
              actions={<CourseMenu course={course} onDelete={(trigger) => onDelete({ course, trigger })} />}
            />
          </li>
        ))}
      </ul>
    )
  }

  if (isError) {
    return (
      <div className={styles.message} role="alert">
        <p>Couldn't load the courses</p>
        <button type="button" className={buttonClass} onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className={styles.list} role="status" aria-label="Loading courses">
      {Array.from({ length: 8 }, (_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function Component() {
  const deleteCourse = useDeleteCourseMutation()
  const [deleteRequest, setDeleteRequest] = useState<DeleteRequest | null>(null)
  const createLinkRef = useRef<HTMLAnchorElement>(null)
  const failedCourse = deleteCourse.isError ? deleteCourse.variables : undefined

  function confirmDelete({ course, trigger }: DeleteRequest) {
    const item = trigger.closest('li')
    const neighbour = item?.nextElementSibling ?? item?.previousElementSibling
    const nextFocus = neighbour?.querySelector<HTMLElement>('[aria-haspopup="menu"]') ?? createLinkRef.current
    nextFocus?.focus()
    setDeleteRequest(null)
    deleteCourse.mutate(course)
  }

  function dismissNotice() {
    deleteCourse.reset()
    createLinkRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <PageHeader title="Courses" />
      <div className={failedCourse && styles.toast}>
        <p aria-live="assertive">{failedCourse && `Couldn't delete ${failedCourse.name}. It's back in the list.`}</p>
        {failedCourse && (
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.icon} ${buttonStyles.ghost} ${styles.dismiss}`}
            aria-label="Dismiss error"
            onClick={dismissNotice}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      <div className={styles.content}>
        <Link ref={createLinkRef} to="/courses/new" className={`${buttonClass} ${styles.create}`}>
          Create a course
        </Link>
        <CoursesState onDelete={setDeleteRequest} />
      </div>
      {deleteRequest && (
        <DeleteCourseModal
          courseName={deleteRequest.course.name}
          onCancel={() => setDeleteRequest(null)}
          onConfirm={() => confirmDelete(deleteRequest)}
        />
      )}
    </>
  )
}

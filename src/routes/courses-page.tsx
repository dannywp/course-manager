import { Link } from 'react-router'
import buttonStyles from '../components/button.module.css'
import { CourseCard } from '../components/course-card'
import { CourseCardSkeleton } from '../components/course-card-skeleton'
import { PageHeader } from '../components/page-header'
import { useCoursesQuery } from '../hooks/use-courses-query'
import styles from './courses-page.module.css'

const buttonClass = `${buttonStyles.button} ${buttonStyles.primary}`

function CoursesState() {
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
            <CourseCard course={course} />
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
  return (
    <>
      <PageHeader title="Courses" />
      <div className={styles.content}>
        <Link to="/courses/new" className={`${buttonClass} ${styles.create}`}>
          Create a course
        </Link>
        <CoursesState />
      </div>
    </>
  )
}

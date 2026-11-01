import type { Course, CourseInput } from '../domain/course'

export function sortCourses(courses: readonly Course[]): Course[] {
  return courses.toSorted((a, b) => {
    if (a.featuredAt !== null && b.featuredAt !== null && a.featuredAt !== b.featuredAt) {
      return a.featuredAt - b.featuredAt
    }
    if ((a.featuredAt === null) !== (b.featuredAt === null)) {
      return a.featuredAt === null ? 1 : -1
    }
    return b.createdAt - a.createdAt
  })
}

export function applySave(previous: Course | null, input: CourseInput, now: number): Omit<Course, 'id'> {
  return {
    ...input,
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
    featuredAt: input.featured ? (previous?.featuredAt ?? now) : null,
  }
}

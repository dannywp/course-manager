import type { Course, CourseInput } from '../domain/course'
import { createLocalCoursesService } from './local-courses-service'

export type CoursesService = {
  list(): Promise<Course[]>
  get(id: string): Promise<Course | null>
  create(input: CourseInput): Promise<Course>
  update(id: string, input: CourseInput): Promise<Course>
  remove(id: string): Promise<void>
}

export const coursesService: CoursesService = createLocalCoursesService()

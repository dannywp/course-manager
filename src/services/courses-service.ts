import type { CourseInput, CourseWithImage } from '../domain/course'
import { createLocalCoursesService } from './local-courses-service'

export type CoursesService = {
  list(): Promise<CourseWithImage[]>
  get(id: string): Promise<CourseWithImage | null>
  create(input: CourseInput, image?: File): Promise<CourseWithImage>
  update(id: string, input: CourseInput, image?: File): Promise<CourseWithImage>
  remove(id: string): Promise<void>
}

export const coursesService: CoursesService = createLocalCoursesService()

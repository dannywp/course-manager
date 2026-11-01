import { z } from 'zod'
import { countries } from './countries'

export const courseInputSchema = z.object({
  name: z.string().trim().min(1).max(80),
  city: z.string().trim().min(1).max(60),
  countryCode: z.enum(countries.map((country) => country.code)),
  par: z.int().min(54).max(80),
  difficulty: z.int().min(1).max(5),
  featured: z.boolean(),
  description: z.string().trim().max(1000),
  imageId: z.string().nullable(),
})

export const courseSchema = courseInputSchema
  .extend({
    id: z.string().min(1),
    createdAt: z.int(),
    updatedAt: z.int(),
    featuredAt: z.int().nullable(),
  })
  .refine((course) => course.featured === (course.featuredAt !== null), {
    message: 'featuredAt must be set exactly when the course is featured',
    path: ['featuredAt'],
  })

export type CourseInput = z.infer<typeof courseInputSchema>
export type Course = z.infer<typeof courseSchema>
export type CourseWithImage = Course & { imageUrl: string | null }

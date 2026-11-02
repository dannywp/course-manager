import { z } from 'zod'
import { countries } from './countries'

const parMessage = 'Enter a par from 54 to 80'
const difficultyMessage = 'Choose a difficulty'

export const courseInputSchema = z.object({
  name: z.string().trim().min(1, 'Enter a title').max(80, 'Keep the title to 80 characters'),
  city: z.string().trim().min(1, 'Enter a city or state').max(60, 'Keep the city or state to 60 characters'),
  countryCode: z.enum(
    countries.map((country) => country.code),
    'Choose a country',
  ),
  par: z.int(parMessage).min(54, parMessage).max(80, parMessage),
  difficulty: z.int(difficultyMessage).min(1, difficultyMessage).max(5, difficultyMessage),
  featured: z.boolean(),
  description: z.string().trim().max(1000, 'Keep the description to 1000 characters'),
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
export type CourseWithImage = Course & { imageUrl: string | null; imageName: string | null }

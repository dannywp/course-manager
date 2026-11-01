import type { Course, CourseInput } from '../domain/course'
import { applySave } from './course-rules'

const inputs: CourseInput[] = [
  {
    name: 'Pebble Beach Golf Links',
    city: 'Pebble Beach',
    countryCode: 'US',
    par: 72,
    difficulty: 4,
    featured: true,
    description: '',
    imageId: 'seed:pebble-beach',
  },
  {
    name: 'St Andrews Old Course',
    city: 'St Andrews',
    countryCode: 'GB',
    par: 72,
    difficulty: 4,
    featured: true,
    description: '',
    imageId: 'seed:st-andrews',
  },
  {
    name: 'Kawana Fuji Course',
    city: 'Ito',
    countryCode: 'JP',
    par: 72,
    difficulty: 3,
    featured: false,
    description: '',
    imageId: null,
  },
  {
    name: 'Valderrama',
    city: 'Sotogrande',
    countryCode: 'ES',
    par: 71,
    difficulty: 5,
    featured: false,
    description: '',
    imageId: 'seed:valderrama',
  },
  {
    name: 'Hidden Canyon',
    city: 'Sedona',
    countryCode: 'US',
    par: 71,
    difficulty: 3,
    featured: false,
    description: '',
    imageId: 'seed:hidden-canyon',
  },
  {
    name: 'Quinta do Lago',
    city: 'Almancil',
    countryCode: 'PT',
    par: 72,
    difficulty: 2,
    featured: false,
    description: '',
    imageId: 'seed:quinta-do-lago',
  },
]

export function seedCourses(now: number): Course[] {
  return inputs.map((input, index) => ({
    id: crypto.randomUUID(),
    ...applySave(null, input, now - (inputs.length - index) * 24 * 60 * 60 * 1000),
  }))
}

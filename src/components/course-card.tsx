import { useState, type ReactNode } from 'react'
import type { CourseWithImage } from '../domain/course'
import styles from './course-card.module.css'

type CourseCardProps = {
  course: Pick<CourseWithImage, 'featured' | 'imageUrl'> &
    Partial<Pick<CourseWithImage, 'name' | 'city' | 'countryCode' | 'par' | 'difficulty'>>
  actions?: ReactNode
}

export function CourseCard({ course, actions }: CourseCardProps) {
  const { name, city, countryCode, par, difficulty, featured, imageUrl } = course
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const src = imageUrl === null || imageUrl === failedUrl ? '/placeholder.png' : imageUrl
  const location = `${city?.trim() || 'City'}, ${countryCode || 'Country'}`
  const title = name?.trim()

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <img className={styles.photo} src={src} alt="" loading="lazy" onError={() => setFailedUrl(imageUrl)} />
        {featured && (
          <span className={styles.badge}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M6 .5l1.7 3.6 3.9.5-2.9 2.7.8 3.9L6 9.3l-3.5 1.9.8-3.9L.4 4.6l3.9-.5z" />
            </svg>
            Featured
          </span>
        )}
      </div>
      <div className={styles.text}>
        <p className={styles.location} title={location}>
          {location}
        </p>
        <h2 className={`${styles.name} ${title ? '' : styles.placeholder}`} title={title}>
          {title || 'Course name'}
        </h2>
        <p className={styles.meta}>
          <span className={par === undefined ? styles.placeholder : undefined}>Par {par ?? '–'}</span>
          <span aria-hidden="true">•</span>
          <span className={difficulty === undefined ? styles.placeholder : undefined}>Difficulty: {difficulty ?? '–'}/5</span>
        </p>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </article>
  )
}

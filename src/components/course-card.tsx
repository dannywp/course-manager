import { useState } from 'react'
import type { CourseWithImage } from '../domain/course'
import buttonStyles from './button.module.css'
import styles from './course-card.module.css'

type CourseCardProps = {
  course: Pick<CourseWithImage, 'name' | 'city' | 'countryCode' | 'par' | 'difficulty' | 'featured' | 'imageUrl'>
}

export function CourseCard({ course }: CourseCardProps) {
  const { name, city, countryCode, par, difficulty, featured, imageUrl } = course
  const [failedUrl, setFailedUrl] = useState<string | null>(null)
  const src = imageUrl === null || imageUrl === failedUrl ? '/placeholder.png' : imageUrl
  const location = `${city}, ${countryCode}`

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
        <h2 className={styles.name} title={name}>
          {name}
        </h2>
        <p className={styles.meta}>
          <span>Par {par}</span>
          <span aria-hidden="true">•</span>
          <span>Difficulty: {difficulty}/5</span>
        </p>
        <button
          type="button"
          className={`${buttonStyles.button} ${buttonStyles.icon} ${styles.menuButton}`}
          aria-label={`Actions for ${name}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="14" cy="8" r="1.5" />
          </svg>
        </button>
      </div>
    </article>
  )
}

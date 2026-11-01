import styles from './course-card.module.css'

export function CourseCardSkeleton() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.image} />
      <div className={styles.text}>
        <div className={`${styles.bar} ${styles.barLocation}`} />
        <div className={`${styles.bar} ${styles.barName}`} />
        <div className={`${styles.bar} ${styles.barMeta}`} />
      </div>
    </div>
  )
}

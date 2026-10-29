import styles from './page-header.module.css'

type PageHeaderProps = {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>Browse and add golf courses</p>
    </header>
  )
}

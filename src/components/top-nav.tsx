import { useSyncExternalStore } from 'react'
import styles from './top-nav.module.css'

function subscribeToConnection(onChange: () => void) {
  window.addEventListener('online', onChange)
  window.addEventListener('offline', onChange)
  return () => {
    window.removeEventListener('online', onChange)
    window.removeEventListener('offline', onChange)
  }
}

export function TopNav() {
  const online = useSyncExternalStore(subscribeToConnection, () => navigator.onLine)

  return (
    <header className={styles.nav}>
      <div className={styles.logo}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12.9181 0C13.5177 0 14 0.482309 14 1.08194V12.9181C14 13.5177 13.5177 14 12.9181 14H5.57263C5.46835 14 5.38362 13.9088 5.39665 13.8045C6.05494 8.17318 9.05308 2.2095 11.041 0.0195531C11.054 0.00651769 11.0736 0 11.0931 0H12.9181Z" />
          <path d="M1.08194 0H10.0177C10.0372 0 10.0503 0.0260708 10.0307 0.0391061C6.3352 3.14153 3.42179 9.47672 2.2095 13.824C2.18343 13.9283 2.08566 14 1.98138 14H1.08194C0.482309 14 0 13.5177 0 12.9181V1.08194C0 0.482309 0.482309 0 1.08194 0Z" />
        </svg>
      </div>
      <span className={styles.product}>Facility portal</span>
      <span role="status" className={online ? undefined : styles.offline}>
        {!online && 'Offline'}
      </span>
    </header>
  )
}

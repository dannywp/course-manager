import { useEffect, useId, useRef, type KeyboardEvent } from 'react'
import buttonStyles from './button.module.css'
import { CloseIcon } from './close-icon'
import styles from './delete-course-modal.module.css'

type DeleteCourseModalProps = {
  courseName: string
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteCourseModal({ courseName, onCancel, onConfirm }: DeleteCourseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const bodyId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    cancelRef.current?.focus()
    return () => dialog?.close()
  }, [])

  // Browsers only restore focus when an attached dialog closes, and React detaches this one before
  // effect cleanups run. Confirm also needs the page un-inert before it can move focus to a card.
  function closeThen(callback: () => void) {
    dialogRef.current?.close()
    callback()
  }

  function wrapTab(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') {
      return
    }
    const buttons = event.currentTarget.querySelectorAll('button')
    const first = buttons[0]
    const last = buttons[buttons.length - 1]
    const [edge, wrapTarget] = event.shiftKey ? [first, last] : [last, first]
    if (document.activeElement === edge) {
      event.preventDefault()
      wrapTarget.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      onCancel={() => closeThen(onCancel)}
      onKeyDown={wrapTab}
    >
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Delete course
        </h2>
        <button
          type="button"
          className={`${buttonStyles.button} ${buttonStyles.icon} ${buttonStyles.ghost} ${styles.close}`}
          aria-label="Close"
          onClick={() => closeThen(onCancel)}
        >
          <CloseIcon />
        </button>
      </header>
      <p id={bodyId} className={styles.body}>
        Are you sure you want to delete <strong>{courseName}</strong>? You will lose all data attached to it.
      </p>
      <footer className={styles.footer}>
        <button
          ref={cancelRef}
          type="button"
          className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          onClick={() => closeThen(onCancel)}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${buttonStyles.button} ${buttonStyles.danger}`}
          onClick={() => closeThen(onConfirm)}
        >
          Delete
        </button>
      </footer>
    </dialog>
  )
}

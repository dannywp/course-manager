import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router'
import type { Course } from '../domain/course'
import buttonStyles from './button.module.css'
import styles from './course-menu.module.css'
import { PencilIcon } from './pencil-icon'

type CourseMenuProps = {
  course: Pick<Course, 'id' | 'name'>
  onDelete: (trigger: HTMLButtonElement) => void
}

export function CourseMenu({ course, onDelete }: CourseMenuProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const label = `Actions for ${course.name}`

  useLayoutEffect(() => {
    const menu = menuRef.current
    if (!menu) {
      return
    }
    if (menu.getBoundingClientRect().right > document.documentElement.clientWidth) {
      menu.dataset.align = 'end'
    }
    menu.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }
    function closeOnOutsidePress({ target }: PointerEvent) {
      const inside = [menuRef.current, triggerRef.current].some((element) => element?.contains(target as Node))
      if (!inside) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', closeOnOutsidePress)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress)
  }, [open])

  function close() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]')]
    const current = items.indexOf(event.target as HTMLElement)

    switch (event.key) {
      case 'ArrowDown':
        items[(current + 1) % items.length].focus()
        break
      case 'ArrowUp':
        items[(current - 1 + items.length) % items.length].focus()
        break
      case 'Home':
        items[0].focus()
        break
      case 'End':
        items[items.length - 1].focus()
        break
      case 'Escape':
      case 'Tab':
        close()
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${buttonStyles.button} ${buttonStyles.icon} ${styles.trigger}`}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
          <circle cx="2" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="14" cy="8" r="1.5" />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className={styles.menu}
          role="menu"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
        >
          <Link
            to={`/courses/${course.id}/edit`}
            className={styles.item}
            role="menuitem"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault()
                event.currentTarget.click()
              }
            }}
          >
            <PencilIcon />
            Edit
          </Link>
          <button
            type="button"
            className={styles.item}
            role="menuitem"
            tabIndex={-1}
            onClick={() => {
              close()
              onDelete(triggerRef.current!)
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
              <path d="M2 3.5h12M6 3.5V1.5h4v2M3.5 3.5l.7 11h7.6l.7-11M6.5 6.5v5.5M9.5 6.5v5.5" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </>
  )
}

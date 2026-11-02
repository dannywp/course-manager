import { useEffect, useId, useRef, useState, type DragEvent } from 'react'
import { imageFileAccept, validateImageFile } from '../domain/image-file'
import { useImageFallback } from '../hooks/use-image-fallback'
import buttonStyles from './button.module.css'
import fieldStyles from './form-fields.module.css'
import styles from './image-field.module.css'
import { PencilIcon } from './pencil-icon'

type ImageFieldProps = {
  image: { url: string; name: string } | null
  onSelect: (file: File) => void
}

export function ImageField({ image, onSelect }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const changeRef = useRef<HTMLButtonElement>(null)
  const focusChangeButton = useRef(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const errorId = useId()
  const hasImage = image !== null
  const thumbnail = useImageFallback(image?.url ?? null)

  // The drop zone is replaced by the file row, so focus would otherwise fall to the page.
  useEffect(() => {
    if (hasImage && focusChangeButton.current) {
      changeRef.current?.focus()
    }
  }, [hasImage])

  function select(file: File | undefined) {
    if (!file) {
      return
    }
    const message = validateImageFile(file)
    setError(message)
    if (message === null) {
      focusChangeButton.current = !hasImage
      onSelect(file)
    }
  }

  function handleDragLeave(event: DragEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDragging(false)
    }
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragging(false)
    select(event.dataTransfer.files[0])
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={imageFileAccept}
        hidden
        onChange={(event) => {
          select(event.target.files?.[0])
          event.target.value = ''
        }}
      />
      {image ? (
        <div className={styles.file}>
          <img className={styles.thumbnail} src={thumbnail.src} alt="" onError={thumbnail.onError} />
          <p className={styles.name} title={image.name}>
            {image.name}
          </p>
          <button
            ref={changeRef}
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.icon}`}
            aria-label="Change image"
            aria-describedby={error ? errorId : undefined}
            onClick={() => inputRef.current!.click()}
          >
            <PencilIcon />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.dropZone}
          data-dragging={dragging || undefined}
          aria-describedby={error ? errorId : undefined}
          onClick={() => inputRef.current!.click()}
          onDragEnter={(event) => event.preventDefault()}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
            <path d="M10 24H8.5a6.5 6.5 0 0 1-.9-12.94A9 9 0 0 1 25 11.5a6.25 6.25 0 0 1-.5 12.5H22M16 27V15m-4.5 4.5L16 15l4.5 4.5" />
          </svg>
          <span className={styles.title}>Drag & Drop</span>
          <span className={styles.hint}>Drag & drop or click to browse. JPG, PNG or WebP, max 5 MB.</span>
        </button>
      )}
      {error && (
        <p id={errorId} role="alert" className={fieldStyles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export function ImageFieldSkeleton() {
  return <div className={styles.fileSkeleton} />
}

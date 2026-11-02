import { useId, type ComponentProps, type ReactNode } from 'react'
import styles from './form-fields.module.css'

type FieldProps = {
  label: string
  error?: string
  className?: string
}

type ControlProps = {
  id: string
  'aria-invalid': boolean
  'aria-describedby': string | undefined
}

function Field({
  label,
  error,
  className = '',
  children,
}: FieldProps & { children: (control: ControlProps) => ReactNode }) {
  const id = useId()
  const errorId = useId()

  return (
    <div className={`${styles.field} ${className}`}>
      {children({ id, 'aria-invalid': error !== undefined, 'aria-describedby': error ? errorId : undefined })}
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({
  label,
  error,
  ...input
}: Omit<FieldProps, 'className'> & Omit<ComponentProps<'input'>, 'className' | 'placeholder'>) {
  return (
    <Field label={label} error={error}>
      {(control) => <input type="text" {...input} {...control} className={styles.control} placeholder=" " />}
    </Field>
  )
}

export function TextAreaField({
  label,
  error,
  className,
  ...textarea
}: FieldProps & Omit<ComponentProps<'textarea'>, 'className' | 'placeholder'>) {
  return (
    <Field label={label} error={error} className={className}>
      {(control) => (
        <textarea {...textarea} {...control} className={`${styles.control} ${styles.textarea}`} placeholder=" " />
      )}
    </Field>
  )
}

export function SelectField({
  label,
  error,
  children,
  ...select
}: Pick<FieldProps, 'label' | 'error'> & Omit<ComponentProps<'select'>, 'className'>) {
  return (
    <Field label={label} error={error}>
      {(control) => (
        <select {...select} {...control} className={`${styles.control} ${styles.select}`}>
          <option value="" hidden>
            Choose an option
          </option>
          {children}
        </select>
      )}
    </Field>
  )
}

export function FieldSkeleton({ tall = false, className = '' }: { tall?: boolean; className?: string }) {
  return (
    <div className={`${styles.field} ${className}`}>
      <div className={`${styles.controlSkeleton} ${tall ? styles.tall : ''}`} />
    </div>
  )
}

export function CheckboxSkeleton() {
  return <div className={styles.checkboxSkeleton} />
}

export function CheckboxField({ label, ...input }: Pick<FieldProps, 'label'> & Omit<ComponentProps<'input'>, 'className'>) {
  return (
    <label className={styles.checkboxField}>
      <input type="checkbox" {...input} className={styles.checkbox} />
      {label}
    </label>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm, useWatch, type Control } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { countries } from '../domain/countries'
import { courseInputSchema, type CourseInput } from '../domain/course'
import buttonStyles from './button.module.css'
import { CourseCard } from './course-card'
import styles from './course-form.module.css'
import { CheckboxField, SelectField, TextAreaField, TextField } from './form-fields'

type CourseFormProps = {
  saveFailed: boolean
  onSubmit: (input: CourseInput) => Promise<void>
}

function CoursePreview({ control }: { control: Control<CourseInput> }) {
  const { name, city, countryCode, par, difficulty, featured } = useWatch({ control })
  const labelId = useId()

  return (
    <aside className={styles.preview} aria-labelledby={labelId}>
      <p id={labelId} className={styles.previewLabel}>
        Card preview
      </p>
      <CourseCard
        course={{
          name,
          city,
          countryCode,
          par: Number.isInteger(par) ? par : undefined,
          difficulty: Number.isInteger(difficulty) ? difficulty : undefined,
          featured: featured === true,
          imageUrl: null,
        }}
      />
    </aside>
  )
}

export function CourseForm({ saveFailed, onSubmit }: CourseFormProps) {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseInputSchema),
    defaultValues: { name: '', city: '', featured: false, description: '', imageId: null },
  })

  return (
    <form noValidate autoComplete="off" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <div className={styles.actions}>
        <button
          type="button"
          className={`${buttonStyles.button} ${buttonStyles.secondary}`}
          disabled={isSubmitting}
          onClick={() => void navigate('/')}
        >
          Cancel
        </button>
        <button type="submit" className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.save}`} disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </button>
      </div>
      <div className={styles.columns}>
        <div>
          {saveFailed && (
            <p role="alert" className={styles.banner}>
              Couldn't save the course. Your changes are still here.
            </p>
          )}
          <section className={styles.section}>
            <div>
              <h2 className={styles.heading}>Course details</h2>
              <p className={styles.explainer}>Review the information and make changes if necessary.</p>
            </div>
            <div className={styles.fields}>
              <TextField label="Title*" required error={errors.name?.message} {...register('name')} />
              <SelectField
                label="Difficulty*"
                required
                error={errors.difficulty?.message}
                {...register('difficulty', { valueAsNumber: true })}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </SelectField>
              <TextAreaField
                label="Course description"
                className={styles.wide}
                error={errors.description?.message}
                {...register('description')}
              />
              <TextField
                label="Par*"
                inputMode="numeric"
                required
                hint="Typical: 68–74"
                error={errors.par?.message}
                {...register('par', { valueAsNumber: true })}
              />
            </div>
            <CheckboxField label="Featured course" {...register('featured')} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.heading}>Location</h2>
            <div className={styles.fields}>
              <TextField label="City/State*" required error={errors.city?.message} {...register('city')} />
              <SelectField label="Country*" required error={errors.countryCode?.message} {...register('countryCode')}>
                {countries.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </SelectField>
            </div>
          </section>
        </div>
        <CoursePreview control={control} />
      </div>
    </form>
  )
}

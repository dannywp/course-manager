import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { useForm, useWatch, type Control } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { countries } from '../domain/countries'
import { courseInputSchema, type CourseInput, type CourseWithImage } from '../domain/course'
import buttonStyles from './button.module.css'
import { CourseCard } from './course-card'
import { CourseCardSkeleton } from './course-card-skeleton'
import styles from './course-form.module.css'
import { CheckboxField, CheckboxSkeleton, FieldSkeleton, SelectField, TextAreaField, TextField } from './form-fields'
import { ImageField, ImageFieldSkeleton } from './image-field'

type CourseFormProps = {
  course?: CourseWithImage
  saveFailed: boolean
  onSubmit: (input: CourseInput, image?: File) => Promise<void>
}

const detailsHeading = (
  <div>
    <h2 className={styles.heading}>Course details</h2>
    <p className={styles.explainer}>Review the information and make changes if necessary.</p>
  </div>
)

const locationHeading = <h2 className={styles.heading}>Location</h2>

const imageHeading = <h2 className={styles.heading}>Image</h2>

function PreviewPanel({ children }: { children: ReactNode }) {
  const labelId = useId()

  return (
    <aside className={styles.preview} aria-labelledby={labelId}>
      <p id={labelId} className={styles.previewLabel}>
        Card preview
      </p>
      {children}
    </aside>
  )
}

function CoursePreview({ control, imageUrl }: { control: Control<CourseInput>; imageUrl: string | null }) {
  const { name, city, countryCode, par, difficulty, featured } = useWatch({ control })

  return (
    <PreviewPanel>
      <CourseCard
        course={{
          name,
          city,
          countryCode,
          par: Number.isInteger(par) ? par : undefined,
          difficulty: Number.isInteger(difficulty) ? difficulty : undefined,
          featured: featured === true,
          imageUrl,
        }}
      />
    </PreviewPanel>
  )
}

export function CourseFormSkeleton() {
  return (
    <div role="status" aria-label="Loading course">
      <div className={styles.actions} />
      <div className={styles.columns}>
        <div>
          <section className={styles.section}>
            {detailsHeading}
            <div className={styles.fields}>
              <FieldSkeleton />
              <FieldSkeleton />
              <FieldSkeleton tall className={styles.wide} />
              <FieldSkeleton withHint />
            </div>
            <CheckboxSkeleton />
          </section>
          <section className={styles.section}>
            {locationHeading}
            <div className={styles.fields}>
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          </section>
          <section className={styles.section}>
            {imageHeading}
            <ImageFieldSkeleton />
          </section>
        </div>
        <PreviewPanel>
          <CourseCardSkeleton />
        </PreviewPanel>
      </div>
    </div>
  )
}

export function CourseForm({ course, saveFailed, onSubmit }: CourseFormProps) {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseInputSchema),
    defaultValues: course ?? { name: '', city: '', featured: false, description: '', imageId: null },
  })
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null)

  useEffect(() => {
    if (selectedImage) {
      return () => URL.revokeObjectURL(selectedImage.url)
    }
  }, [selectedImage])

  const storedImage = course?.imageUrl && course.imageName ? { url: course.imageUrl, name: course.imageName } : null
  const image = selectedImage ? { url: selectedImage.url, name: selectedImage.file.name } : storedImage

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={(event) => void handleSubmit((input) => onSubmit(input, selectedImage?.file))(event)}
      // Browsers open a file dropped where nothing accepts it, which would throw away the form.
      onDragOver={(event) => {
        if (!event.isDefaultPrevented()) {
          event.preventDefault()
          event.dataTransfer.dropEffect = 'none'
        }
      }}
      onDrop={(event) => event.preventDefault()}
    >
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
            {detailsHeading}
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
            {locationHeading}
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
          <section className={styles.section}>
            {imageHeading}
            <ImageField image={image} onSelect={(file) => setSelectedImage({ file, url: URL.createObjectURL(file) })} />
          </section>
        </div>
        <CoursePreview control={control} imageUrl={image?.url ?? null} />
      </div>
    </form>
  )
}

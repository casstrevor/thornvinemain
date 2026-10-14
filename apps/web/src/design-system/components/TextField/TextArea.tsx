import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react'
import './text-field.css'

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
  label: string
  hint?: ReactNode
  error?: ReactNode
  hideLabel?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, hideLabel = false, id, className, required, rows = 3, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={['tv-field', error && 'tv-field--invalid', className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'tv-field__label'}>
        {label}
        {required ? (
          <span className="tv-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        className="tv-field__input tv-field__area"
        required={required}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...rest}
      />
      {hint && !error ? (
        <p id={hintId} className="tv-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="tv-field__error">
          {error}
        </p>
      ) : null}
    </div>
  )
})

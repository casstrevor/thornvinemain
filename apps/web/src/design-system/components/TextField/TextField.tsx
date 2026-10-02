import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './text-field.css'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string
  hint?: ReactNode
  error?: ReactNode
  /** Visually hide the label while keeping it accessible. */
  hideLabel?: boolean
}

export function TextField({ label, hint, error, hideLabel = false, id, className, required, ...rest }: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={['tv-field', error && 'tv-field--invalid', className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'tv-field__label'}>
        {label}
        {required ? <span className="tv-field__required" aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={inputId}
        className="tv-field__input"
        required={required}
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
}

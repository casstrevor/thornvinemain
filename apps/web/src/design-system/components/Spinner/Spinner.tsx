import './spinner.css'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  /** Announced to assistive tech. Pass an empty string when a parent already announces busy state. */
  label?: string
  className?: string
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <span
      className={['tv-spinner', `tv-spinner--${size}`, className].filter(Boolean).join(' ')}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
    >
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}

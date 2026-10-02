export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonTone = 'default' | 'inverse'

export type ButtonStyleOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: ButtonTone
  fullWidth?: boolean
  className?: string
}

/** Button styling for non-button elements such as router `<Link>`s and anchors. */
export function buttonClassName({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  fullWidth = false,
  className,
}: ButtonStyleOptions = {}) {
  return [
    'tv-btn',
    `tv-btn--${variant}`,
    `tv-btn--${size}`,
    tone === 'inverse' && 'tv-btn--inverse',
    fullWidth && 'tv-btn--full',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

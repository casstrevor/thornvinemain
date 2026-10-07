import type { ButtonHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/iconPaths'
import { buttonClassName, type ButtonSize, type ButtonTone, type ButtonVariant } from './buttonClassName'
import './button.css'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: IconName
  /** Required: icon-only controls have no visible text. */
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: ButtonTone
}

export function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 'md',
  tone,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={buttonClassName({
        variant,
        size,
        tone,
        className: ['tv-btn--icon', className].filter(Boolean).join(' '),
      })}
      {...rest}
    >
      <Icon name={icon} size={size === 'lg' ? 'lg' : 'md'} />
    </button>
  )
}

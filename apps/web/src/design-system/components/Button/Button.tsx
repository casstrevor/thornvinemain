import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../Spinner/Spinner'
import { buttonClassName, type ButtonStyleOptions } from './buttonClassName'
import './button.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleOptions & {
    iconStart?: ReactNode
    iconEnd?: ReactNode
    loading?: boolean
  }

export function Button({
  variant,
  size,
  tone,
  fullWidth,
  className,
  iconStart,
  iconEnd,
  loading = false,
  disabled,
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, tone, fullWidth, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size="sm" label="" /> : iconStart}
      <span className="tv-btn__label">{children}</span>
      {loading ? null : iconEnd}
    </button>
  )
}

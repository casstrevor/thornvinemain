import type { HTMLAttributes } from 'react'
import './badge.css'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  /** Leading status dot; pulses when `live`. */
  dot?: boolean
  live?: boolean
}

export function Badge({ tone = 'neutral', dot = false, live = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={['tv-badge', `tv-badge--${tone}`, className].filter(Boolean).join(' ')} {...rest}>
      {dot ? <span className={['tv-badge__dot', live && 'tv-badge__dot--live'].filter(Boolean).join(' ')} aria-hidden="true" /> : null}
      {children}
    </span>
  )
}

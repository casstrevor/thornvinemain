import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/iconPaths'
import './alert.css'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

const toneIcon: Record<AlertTone, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  danger: 'warning',
}

type AlertProps = {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  action?: ReactNode
  className?: string
}

export function Alert({ tone = 'info', title, children, action, className }: AlertProps) {
  const urgent = tone === 'danger' || tone === 'warning'

  return (
    <div
      className={['tv-alert', `tv-alert--${tone}`, className].filter(Boolean).join(' ')}
      role={urgent ? 'alert' : 'status'}
    >
      <Icon name={toneIcon[tone]} className="tv-alert__icon" />
      <div className="tv-alert__body">
        {title ? <p className="tv-alert__title">{title}</p> : null}
        {children ? <div className="tv-alert__text">{children}</div> : null}
      </div>
      {action ? <div className="tv-alert__action">{action}</div> : null}
    </div>
  )
}

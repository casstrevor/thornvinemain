import type { HTMLAttributes, ReactNode } from 'react'
import './card.css'

type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  media?: ReactNode
  eyebrow?: ReactNode
  title?: ReactNode
  footer?: ReactNode
  /** Lift on hover; use when the whole card is a link target. */
  interactive?: boolean
  surface?: 'default' | 'muted' | 'inverse'
}

export function Card({
  media,
  eyebrow,
  title,
  footer,
  interactive = false,
  surface = 'default',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <article
      className={[
        'tv-card',
        `tv-card--${surface}`,
        interactive && 'tv-card--interactive',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {media ? <div className="tv-card__media">{media}</div> : null}
      <div className="tv-card__body">
        {eyebrow ? <p className="tv-card__eyebrow">{eyebrow}</p> : null}
        {title ? <h3 className="tv-card__title">{title}</h3> : null}
        {children ? <div className="tv-card__content">{children}</div> : null}
      </div>
      {footer ? <div className="tv-card__footer">{footer}</div> : null}
    </article>
  )
}

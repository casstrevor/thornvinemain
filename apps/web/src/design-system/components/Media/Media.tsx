import type { ImgHTMLAttributes, ReactNode } from 'react'
import './media.css'

export type MediaRatio = '21/9' | '16/9' | '4/3' | '1/1' | '3/4'
export type MediaOverlay = 'none' | 'bottom' | 'full'

type MediaProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> & {
  /** Required. Use an empty string only for purely decorative imagery. */
  alt: string
  ratio?: MediaRatio
  overlay?: MediaOverlay
  rounded?: boolean
  caption?: ReactNode
}

export function Media({
  alt,
  ratio = '16/9',
  overlay = 'none',
  rounded = true,
  caption,
  className,
  loading = 'lazy',
  ...rest
}: MediaProps) {
  return (
    <figure
      className={[
        'tv-media',
        `tv-media--overlay-${overlay}`,
        rounded && 'tv-media--rounded',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ aspectRatio: ratio }}
    >
      <img className="tv-media__img" alt={alt} loading={loading} decoding="async" {...rest} />
      {caption ? <figcaption className="tv-media__caption">{caption}</figcaption> : null}
    </figure>
  )
}

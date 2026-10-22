import type { ImgHTMLAttributes } from 'react'
import { publicUrl } from '../lib/publicUrl'
import './logo-mark.css'

type LogoMarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  /** Provide when the mark stands alone; otherwise it is hidden. */
  label?: string
  /** Light mark for dark surfaces. Default is the dark mark for light UI. */
  tone?: 'default' | 'inverse'
}

/** Official Thornvine TV monogram (mirrored thorns). Asset: `public/images/logo.png`. */
export function LogoMark({ className, label, tone = 'default', ...rest }: LogoMarkProps) {
  const src = publicUrl(tone === 'inverse' ? 'images/logo-inverse.png' : 'images/logo.png')
  return (
    <img
      src={src}
      alt={label ?? ''}
      className={['tv-logo-mark', className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
      draggable={false}
      {...rest}
    />
  )
}

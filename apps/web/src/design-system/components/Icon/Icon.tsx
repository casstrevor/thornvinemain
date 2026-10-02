import type { SVGProps } from 'react'
import { iconPaths, type IconName } from './iconPaths'
import './icon.css'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
  /** Provide when the icon conveys meaning on its own; otherwise it is hidden. */
  label?: string
}

export function Icon({ name, size = 'md', label, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={['tv-icon', `tv-icon--${size}`, className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {iconPaths[name]}
    </svg>
  )
}

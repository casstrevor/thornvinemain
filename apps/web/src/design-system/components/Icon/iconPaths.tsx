export const iconPaths = {
  'arrow-right': <path d="M4 10h11M11 6l4 4-4 4" />,
  'arrow-out': <path d="M5 15L15 5M8 5h7v7" />,
  'arrow-left': <path d="M16 10H5M9 6l-4 4 4 4" />,
  plus: <path d="M10 4v12M4 10h12" />,
  check: <path d="M4 10.5l4 4 8-9" />,
  close: <path d="M5 5l10 10M15 5L5 15" />,
  'chevron-down': <path d="M5 8l5 5 5-5" />,
  'chevron-right': <path d="M8 5l5 5-5 5" />,
  search: (
    <>
      <circle cx="9" cy="9" r="5" />
      <path d="M13 13l4 4" />
    </>
  ),
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v5M10 6.5v.01" />
    </>
  ),
  warning: (
    <>
      <path d="M10 3l8 14H2L10 3Z" />
      <path d="M10 8v4M10 14.5v.01" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M7 10.2l2 2 4-4.4" />
    </>
  ),
  leaf: (
    <>
      <path d="M10 17s-6-4.5-6-9.5C4 4.5 7 3 10 2.5c3 .5 6 2 6 5 0 5-6 9.5-6 9.5Z" />
      <path d="M10 16V6" />
    </>
  ),
  user: (
    <>
      <circle cx="10" cy="7" r="3" />
      <path d="M4 17c1-3.2 3.3-4.8 6-4.8s5 1.6 6 4.8" />
    </>
  ),
  menu: <path d="M3 6h14M3 10h14M3 14h14" />,
  paperclip: <path d="M8.2 10.4l3.8-3.8a2.1 2.1 0 0 1 3 3l-5.7 5.7a3 3 0 0 1-4.2-4.2l5.2-5.2" />,
} as const

export type IconName = keyof typeof iconPaths

export const iconNames = Object.keys(iconPaths) as IconName[]


import type { IconName } from '../../design-system'

export type NavAccess = 'everyone' | 'admin'

export type NavItem = {
  to: string
  label: string
  icon: IconName
  access: NavAccess
}

export const navItems: NavItem[] = [
  { to: '/clientportal', label: 'Client portal', icon: 'grid', access: 'everyone' },
  { to: '/newclient/review', label: 'New-client review', icon: 'clipboard', access: 'admin' },
  { to: '/design-system', label: 'Design system', icon: 'swatch', access: 'admin' },
]

export function visibleNavItems(items: NavItem[], { isAdmin }: { isAdmin: boolean }): NavItem[] {
  return items.filter((item) => item.access === 'everyone' || isAdmin)
}

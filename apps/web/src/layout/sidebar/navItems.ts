import type { IconName } from '../../design-system'
import { DESIGN_SYSTEM_ROLES, type PortalRole } from '../../lib/roles'

export type NavItem = {
  to: string
  label: string
  icon: IconName
  /** Roles that see the link. Omit to show it to everyone. */
  roles?: PortalRole[]
}

export const navItems: NavItem[] = [
  { to: '/newclient/review', label: 'Review desk', icon: 'clipboard', roles: ['thornvine_admin'] },
  { to: '/design-system', label: 'Design system', icon: 'swatch', roles: DESIGN_SYSTEM_ROLES },
]

export function visibleNavItems(
  items: NavItem[],
  hasRole: (...roles: PortalRole[]) => boolean,
): NavItem[] {
  return items.filter((item) => !item.roles || hasRole(...item.roles))
}

import { NavLink } from 'react-router-dom'
import { Icon } from '../../design-system'
import type { NavItem } from './navItems'

type SidebarNavProps = {
  items: NavItem[]
  onNavigate?: () => void
}

export function SidebarNav({ items, onNavigate }: SidebarNavProps) {
  return (
    <nav className="app-sidebar__nav" aria-label="Main">
      <ul className="app-sidebar__list">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                ['app-sidebar__link', isActive && 'app-sidebar__link--active'].filter(Boolean).join(' ')
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

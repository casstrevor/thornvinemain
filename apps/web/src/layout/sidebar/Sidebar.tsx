import { Link } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { navItems, visibleNavItems } from './navItems'
import { SidebarAccount } from './SidebarAccount'
import { SidebarNav } from './SidebarNav'
import './sidebar.css'

type SidebarProps = {
  id: string
  /** Drawer state on narrow screens; the sidebar is always shown on wide screens. */
  open: boolean
  onNavigate?: () => void
}

export function Sidebar({ id, open, onNavigate }: SidebarProps) {
  const { hasRole } = useAuth()

  return (
    <aside id={id} className={['app-sidebar', open && 'app-sidebar--open'].filter(Boolean).join(' ')}>
      <Link to="/" className="app-sidebar__brand" onClick={onNavigate}>
        thornvine
      </Link>
      <SidebarNav items={visibleNavItems(navItems, hasRole)} onNavigate={onNavigate} />
      <SidebarAccount onNavigate={onNavigate} />
    </aside>
  )
}

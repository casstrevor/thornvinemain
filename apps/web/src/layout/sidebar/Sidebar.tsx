import { useNavigate } from 'react-router-dom'
import { LogoMark } from '../../brand/LogoMark'
import { useAuth } from '../../lib/auth'
import { navItems, visibleNavItems } from './navItems'
import { SidebarAccount } from './SidebarAccount'
import { SidebarNav } from './SidebarNav'
import './sidebar.css'

type SidebarProps = {
  id: string
  /** Drawer state on narrow screens. */
  open: boolean
  /** Full menu on wide screens. When false, only the brand is visible. */
  expanded: boolean
  onExpand?: () => void
  onNavigate?: () => void
}

function BrandMark() {
  return (
    <>
      <LogoMark />
      <span>thornvine</span>
    </>
  )
}

export function Sidebar({ id, open, expanded, onExpand, onNavigate }: SidebarProps) {
  const { hasRole } = useAuth()
  const navigate = useNavigate()
  const collapsed = !expanded

  return (
    <aside
      id={id}
      className={['app-sidebar', 'thornvine-glass-effect', 'thornvine-glass-effect--panel', open && 'app-sidebar--open', collapsed && 'app-sidebar--collapsed']
        .filter(Boolean)
        .join(' ')}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <SidebarAccount place="start" onNavigate={onNavigate} />
      <button
        type="button"
        className="app-sidebar__brand"
        aria-expanded={!collapsed}
        aria-controls={id}
        aria-label={collapsed ? 'Open menu' : 'Thornvine home'}
        onClick={() => {
          if (collapsed) {
            onExpand?.()
            return
          }
          onNavigate?.()
          navigate('/')
        }}
      >
        <BrandMark />
      </button>
      <SidebarNav items={visibleNavItems(navItems, hasRole)} onNavigate={onNavigate} />
      <SidebarAccount place="end" onNavigate={onNavigate} />
    </aside>
  )
}

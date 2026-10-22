import { useEffect, useRef, type PointerEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoMark } from '../../brand/LogoMark'
import { useAuth } from '../../lib/auth'
import { navItems, visibleNavItems } from './navItems'
import { SidebarAccount } from './SidebarAccount'
import { SidebarNav } from './SidebarNav'
import './sidebar.css'

function tokenDurationMs(element: Element, token: string, fallback: number) {
  const raw = getComputedStyle(element).getPropertyValue(token).trim()
  if (!raw) return fallback
  const value = Number.parseFloat(raw)
  if (!Number.isFinite(value)) return fallback
  return raw.endsWith('s') && !raw.endsWith('ms') ? value * 1000 : value
}

type SidebarProps = {
  id: string
  /** Drawer state on narrow screens. */
  open: boolean
  /** Full menu on wide screens. When false, only the brand is visible. */
  expanded: boolean
  /** Open the overlay menu while the pointer stays over the chip. */
  hoverExpand?: boolean
  onExpand?: () => void
  onCollapse?: () => void
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

export function Sidebar({
  id,
  open,
  expanded,
  hoverExpand = false,
  onExpand,
  onCollapse,
  onNavigate,
}: SidebarProps) {
  const { hasRole } = useAuth()
  const navigate = useNavigate()
  const collapsed = !expanded
  const leaveTimer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(leaveTimer.current), [])

  function onPointerEnter() {
    if (!hoverExpand) return
    window.clearTimeout(leaveTimer.current)
    onExpand?.()
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (!hoverExpand) return
    window.clearTimeout(leaveTimer.current)
    const delay = tokenDurationMs(event.currentTarget, '--tv-duration-fast', 180)
    leaveTimer.current = window.setTimeout(() => onCollapse?.(), delay)
  }

  return (
    <aside
      id={id}
      className={['app-sidebar', 'thornvine-glass-effect', 'thornvine-glass-effect--panel', open && 'app-sidebar--open', collapsed && 'app-sidebar--collapsed']
        .filter(Boolean)
        .join(' ')}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
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
      <SidebarAccount place="start" onNavigate={onNavigate} />
      <SidebarNav items={visibleNavItems(navItems, hasRole)} onNavigate={onNavigate} />
      <SidebarAccount place="end" onNavigate={onNavigate} />
    </aside>
  )
}

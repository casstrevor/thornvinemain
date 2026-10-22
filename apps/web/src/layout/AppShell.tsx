import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LogoMark } from '../brand/LogoMark'
import { IconButton } from '../design-system'
import { Sidebar } from './sidebar/Sidebar'
import { useMediaQuery } from './useMediaQuery'
import './app-shell.css'

const sidebarId = 'app-sidebar'
const narrowQuery = '(max-width: 56rem)'
const fineHoverQuery = '(hover: hover) and (pointer: fine)'

/** Signed-in app pages dock the brand in the navigation so it does not cover the page. */
function isAuthenticatedAppPath(pathname: string) {
  return (
    pathname === '/account' ||
    pathname === '/clientportal' ||
    pathname.startsWith('/design-system') ||
    pathname.startsWith('/newclient/review')
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const narrow = useMediaQuery(narrowQuery)
  const fineHover = useMediaQuery(fineHoverQuery)
  const authenticated = isAuthenticatedAppPath(pathname)
  const docked = authenticated && !narrow
  const overlayChip = !authenticated && !narrow
  const hoverExpand = overlayChip && fineHover
  // Keyed to the path so the mobile drawer closes on its own after any navigation.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const open = openOn === pathname
  const close = useCallback(() => setOpenOn(null), [])
  const collapse = useCallback(() => setExpanded(false), [])
  const expand = useCallback(() => setExpanded(true), [])
  const onNavigate = useCallback(() => {
    close()
    collapse()
  }, [close, collapse])

  useEffect(() => {
    if (!open && !expanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        collapse()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, expanded, close, collapse])

  useEffect(() => {
    if (narrow || docked || !expanded) return
    const onPointerDown = (event: PointerEvent) => {
      const sidebar = document.getElementById(sidebarId)
      if (!sidebar) return
      const target = event.target
      if (!(target instanceof Node)) return
      if (sidebar.contains(target)) return
      collapse()
    }
    const attach = window.setTimeout(() => {
      document.addEventListener('pointerdown', onPointerDown)
    }, 0)
    return () => {
      window.clearTimeout(attach)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [narrow, docked, expanded, collapse])

  return (
    <div
      className={[
        'app-shell',
        docked && 'app-shell--docked',
        overlayChip && 'app-shell--overlay-chip',
        expanded && 'app-shell--sidebar-expanded',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="app-shell__bar">
        <IconButton
          icon={open ? 'close' : 'menu'}
          label={open ? 'Close menu' : 'Open menu'}
          variant="tertiary"
          aria-expanded={open}
          aria-controls={sidebarId}
          onClick={() => setOpenOn(open ? null : pathname)}
        />
        <Link to="/" className="app-shell__brand" aria-label="Thornvine home">
          <LogoMark />
          <span>thornvine</span>
        </Link>
      </div>
      <Sidebar
        id={sidebarId}
        open={open}
        expanded={docked || narrow || expanded}
        hoverExpand={hoverExpand}
        onExpand={expand}
        onCollapse={collapse}
        onNavigate={onNavigate}
      />
      {open ? <div className="app-shell__scrim" aria-hidden="true" onClick={close} /> : null}
      <div className="app-shell__content">
        <Outlet />
      </div>
    </div>
  )
}

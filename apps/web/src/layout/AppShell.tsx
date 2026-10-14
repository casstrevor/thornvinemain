import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IconButton } from '../design-system'
import { Sidebar } from './sidebar/Sidebar'
import './app-shell.css'

const sidebarId = 'app-sidebar'

export function AppShell() {
  const { pathname } = useLocation()
  // Keyed to the path so the drawer closes on its own after any navigation.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const close = useCallback(() => setOpenOn(null), [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  return (
    <div className="app-shell">
      <div className="app-shell__bar">
        <IconButton
          icon={open ? 'close' : 'menu'}
          label={open ? 'Close menu' : 'Open menu'}
          variant="tertiary"
          aria-expanded={open}
          aria-controls={sidebarId}
          onClick={() => setOpenOn(open ? null : pathname)}
        />
        <Link to="/" className="app-shell__brand">
          thornvine
        </Link>
      </div>
      <Sidebar id={sidebarId} open={open} onNavigate={close} />
      {open ? <div className="app-shell__scrim" aria-hidden="true" onClick={close} /> : null}
      <div className="app-shell__content">
        <Outlet />
      </div>
    </div>
  )
}

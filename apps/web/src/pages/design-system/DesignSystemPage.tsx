import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Badge, IconButton, Spinner, type BadgeTone } from '../../design-system'
import { useAuth } from '../../lib/auth'
import { PlannedDoc } from './docs/PlannedDoc'
import { findEntry, flattenEntries, type EntryStatus } from './registry'
import { SideNav } from './SideNav'
import './design-system.css'

const statusTone: Record<EntryStatus, BadgeTone> = {
  stable: 'success',
  beta: 'warning',
  planned: 'neutral',
}

const entryPath = (id: string) => (id === 'overview' ? '/design-system' : `/design-system/${id}`)

export function DesignSystemPage() {
  const { entryId = 'overview' } = useParams()
  const { profile, hasRole, signOut } = useAuth()
  const [navOpen, setNavOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  const match = findEntry(entryId)
  const entries = useMemo(() => flattenEntries(), [])

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
    headingRef.current?.focus({ preventScroll: true })
  }, [entryId])

  if (!match) return <Navigate to="/design-system" replace />

  const { entry, trail } = match
  const index = entries.findIndex((e) => e.id === entry.id)
  const prev = entries[index - 1]
  const next = entries[index + 1]
  const roleLabel = hasRole('thornvine_admin') ? 'Admin' : 'Designer'
  const Doc = entry.Doc

  return (
    <div className="ds-shell">
      <header className="ds-topbar">
        <div className="ds-topbar__brand">
          <IconButton
            icon="menu"
            label={navOpen ? 'Close navigation' : 'Open navigation'}
            variant="tertiary"
            size="sm"
            className="ds-topbar__menu"
            aria-expanded={navOpen}
            aria-controls="ds-sidebar"
            onClick={() => setNavOpen((open) => !open)}
          />
          <Link to="/" className="ds-topbar__logo">
            thornvine
          </Link>
          <span className="ds-topbar__divider" aria-hidden="true">
            /
          </span>
          <span className="ds-topbar__title">Design system</span>
        </div>
        <div className="ds-topbar__actions">
          <Link to="/clientportal" className="ds-topbar__signout">
            Client portal
          </Link>
          <span className="ds-topbar__user">{profile?.email}</span>
          <Badge tone="accent">{roleLabel}</Badge>
          <button type="button" className="ds-topbar__signout" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <div className="ds-body">
        <aside id="ds-sidebar" className={['ds-sidebar', navOpen && 'is-open'].filter(Boolean).join(' ')}>
          <SideNav onNavigate={() => setNavOpen(false)} />
        </aside>
        {navOpen ? <button type="button" className="ds-scrim" aria-label="Close navigation" onClick={() => setNavOpen(false)} /> : null}

        <main ref={mainRef} className="ds-main" id="ds-main">
          <div className="ds-main__inner">
            <header className="ds-entry-head">
              {trail.length ? (
                <nav aria-label="Breadcrumb" className="ds-breadcrumb">
                  <ol>
                    {trail.map((group) => (
                      <li key={group.id}>{group.title}</li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="ds-entry-head__title">
                <h1 ref={headingRef} tabIndex={-1}>
                  {entry.title}
                </h1>
                <Badge tone={statusTone[entry.status]} dot>
                  {entry.status}
                </Badge>
              </div>
              <p className="ds-entry-head__summary">{entry.summary}</p>
            </header>

            <div className="ds-entry-body" key={entry.id}>
              {Doc ? (
                <Suspense
                  fallback={
                    <div className="ds-loading">
                      <Spinner label="Loading documentation" />
                    </div>
                  }
                >
                  <Doc />
                </Suspense>
              ) : (
                <PlannedDoc entry={entry} />
              )}
            </div>

            <nav className="ds-pager" aria-label="Previous and next">
              {prev ? (
                <Link to={entryPath(prev.id)} className="ds-pager__link">
                  <span>Previous</span>
                  <strong>{prev.title}</strong>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link to={entryPath(next.id)} className="ds-pager__link ds-pager__link--next">
                  <span>Next</span>
                  <strong>{next.title}</strong>
                </Link>
              ) : null}
            </nav>
          </div>
        </main>
      </div>
    </div>
  )
}

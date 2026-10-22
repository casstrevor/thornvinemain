import { Link, useLocation } from 'react-router-dom'
import { Badge, Icon, buttonClassName } from '../../design-system'
import { useAuth } from '../../lib/auth'

export function SidebarAccount({
  onNavigate,
  place,
}: {
  onNavigate?: () => void
  /** Signed-in identity sits under the brand. Sign in sits at the bottom of the menu. */
  place: 'start' | 'end'
}) {
  const { session, profile, isAdmin, loading } = useAuth()
  const { pathname, search } = useLocation()

  if (loading) return null

  const signedIn = session && !session.user.is_anonymous
  if (!signedIn) {
    if (place !== 'end') return null
    const next = encodeURIComponent(`${pathname}${search}`)
    return (
      <div className="app-sidebar__account">
        <Link
          to={`/login?next=${next}`}
          onClick={onNavigate}
          className={buttonClassName({ variant: 'secondary', fullWidth: true })}
        >
          <Icon name="sign-in" />
          <span className="tv-btn__label">Sign in</span>
        </Link>
      </div>
    )
  }

  if (place !== 'start') return null

  const onAccount = pathname === '/account'

  return (
    <Link
      to="/account"
      onClick={onNavigate}
      className={[
        'app-sidebar__account',
        'app-sidebar__account--identity',
        onAccount && 'app-sidebar__account--current',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Your account"
      aria-current={onAccount ? 'page' : undefined}
    >
      <span className="app-sidebar__email">
        {profile?.full_name?.trim() || profile?.email || session.user.email}
      </span>
      {isAdmin ? <Badge tone="accent">Admin</Badge> : null}
    </Link>
  )
}

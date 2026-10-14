import { Link, useLocation } from 'react-router-dom'
import { Badge, Button, Icon, buttonClassName } from '../../design-system'
import { useAuth } from '../../lib/auth'

export function SidebarAccount({ onNavigate }: { onNavigate?: () => void }) {
  const { session, profile, isAdmin, loading, signOut } = useAuth()
  const { pathname, search } = useLocation()

  if (loading) return null

  const signedIn = session && !session.user.is_anonymous
  if (!signedIn) {
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

  return (
    <div className="app-sidebar__account">
      <p className="app-sidebar__email">{profile?.email ?? session.user.email}</p>
      {isAdmin ? <Badge tone="accent">Admin</Badge> : null}
      <Button
        variant="tertiary"
        fullWidth
        iconStart={<Icon name="sign-out" />}
        onClick={() => {
          onNavigate?.()
          void signOut()
        }}
      >
        Sign out
      </Button>
    </div>
  )
}

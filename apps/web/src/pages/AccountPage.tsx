import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Icon } from '../design-system'
import { useAuth } from '../lib/auth'
import type { PortalRole } from '../lib/roles'
import './account.css'

const roleLabel: Record<PortalRole, string> = {
  thornvine_admin: 'Admin',
  thornvine_designer: 'Designer',
  client_owner: 'Owner',
  client_member: 'Member',
}

export function AccountPage() {
  const { profile, session, isAdmin, roles, memberships, signOut } = useAuth()
  const navigate = useNavigate()
  const email = profile?.email ?? session?.user.email ?? ''
  const name = profile?.full_name?.trim() || 'Not set yet'
  const workspaces = memberships.map((row) => row.client?.name).filter(Boolean)
  const roleNames = roles.map((role) => roleLabel[role]).filter(Boolean)

  return (
    <main className="account-page">
      <p className="account-page__eyebrow">Account</p>
      <h1>Your account</h1>
      <p className="account-page__support">Name, email, and how you belong here.</p>

      <Card title={profile?.full_name?.trim() || email}>
        <dl className="account-page__facts">
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>{name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd className="account-page__roles">
              {isAdmin ? <Badge tone="accent">Admin</Badge> : null}
              {roleNames
                .filter((label) => label !== 'Admin')
                .map((label) => (
                  <Badge key={label}>{label}</Badge>
                ))}
              {roleNames.length === 0 ? 'Not set yet' : null}
            </dd>
          </div>
          <div>
            <dt>Workspace</dt>
            <dd>
              {workspaces.length > 0
                ? workspaces.join(', ')
                : isAdmin
                  ? 'Thornvine admin access across workspaces.'
                  : 'No workspace yet.'}
            </dd>
          </div>
        </dl>
      </Card>

      <Button
        variant="tertiary"
        iconStart={<Icon name="sign-out" />}
        onClick={() => {
          void signOut().then(() => navigate('/'))
        }}
      >
        Sign out
      </Button>
    </main>
  )
}

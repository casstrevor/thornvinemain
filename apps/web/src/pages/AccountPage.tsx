import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Badge, Button, Card, Icon, TextField } from '../design-system'
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
  const { profile, session, isAdmin, roles, memberships, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()
  const email = profile?.email ?? session?.user.email ?? ''
  const savedName = profile?.full_name?.trim() ?? ''
  const workspaces = memberships.map((row) => row.client?.name).filter(Boolean)
  const roleNames = roles.map((role) => roleLabel[role]).filter(Boolean)
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(savedName)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const workspaceLabel =
    workspaces.length > 0
      ? workspaces.join(', ')
      : isAdmin
        ? 'Thornvine'
        : 'No workspace yet.'

  function startEdit() {
    setDraftName(savedName)
    setError(null)
    setSaved(false)
    setEditing(true)
  }

  function cancelEdit() {
    setDraftName(savedName)
    setError(null)
    setEditing(false)
  }

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setSaved(false)
    const result = await updateProfile({ full_name: draftName })
    setSaving(false)
    if (result.error) {
      setError(result.error)
      return
    }
    setEditing(false)
    setSaved(true)
  }

  return (
    <main className="account-page">
      <p className="account-page__eyebrow">Account</p>
      <h1>Your profile</h1>
      <p className="account-page__support">Your name, how you sign in, and where you belong.</p>

      {error ? (
        <Alert tone="danger" title="Something snagged">
          {error}
        </Alert>
      ) : null}
      {saved && !editing ? (
        <Alert tone="success" title="Saved">
          Your profile is up to date.
        </Alert>
      ) : null}

      <Card eyebrow="Profile" title={editing ? 'Edit your details' : 'Your details'}>
        {editing ? (
          <form className="account-page__form" onSubmit={(event) => void onSave(event)}>
            <TextField
              label="Name"
              name="full_name"
              autoComplete="name"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              required
              maxLength={80}
              autoFocus
              hint="This is how we greet you in the menu and on your account."
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              readOnly
              disabled
              hint="Email is how you sign in. Ask us if you need to change it."
            />
            <dl className="account-page__facts">
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
                <dd>{workspaceLabel}</dd>
              </div>
            </dl>
            <div className="account-page__actions">
              <Button type="submit" variant="primary" loading={saving} iconStart={<Icon name="check" />}>
                Save
              </Button>
              <Button type="button" variant="tertiary" onClick={cancelEdit} disabled={saving}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <dl className="account-page__facts">
              <div>
                <dt>Name</dt>
                <dd>{savedName || 'Not set yet'}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{email}</dd>
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
                <dd>{workspaceLabel}</dd>
              </div>
            </dl>
            <div className="account-page__actions">
              <Button variant="secondary" iconStart={<Icon name="user" />} onClick={startEdit}>
                Edit profile
              </Button>
            </div>
          </>
        )}
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

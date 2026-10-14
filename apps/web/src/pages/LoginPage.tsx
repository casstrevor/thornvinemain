import { useState, type CSSProperties, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { publicUrl } from '../lib/publicUrl'
import './auth.css'

export function LoginPage() {
  const { session, loading, signIn, hasPortalAccess, refreshPortal } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const next = params.get('next') || '/clientportal'

  const anonymous = Boolean(session?.user.is_anonymous)

  if (!loading && session && hasPortalAccess && !anonymous) {
    return <Navigate to={next} replace />
  }

  if (!loading && session && !hasPortalAccess && !anonymous) {
    return <Navigate to="/clientportal" replace />
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await signIn(email.trim(), password)
    if (result.error) {
      setSubmitting(false)
      setError(result.error)
      return
    }
    await refreshPortal()
    setSubmitting(false)
    navigate(next, { replace: true })
  }

  return (
    <div
      className="auth-screen auth-screen--branded"
      style={{ '--auth-photo': `url("${publicUrl('images/footer-frame.jpg')}")` } as CSSProperties}
    >
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          thornvine
        </Link>
        <h1>Client portal</h1>
        <p className="auth-lede">
          Sign in with the invite credentials from your Thornvine contact.
        </p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error ? <p className="auth-error" role="alert">{error}</p> : null}
          <button className="btn btn--primary" type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footnote">
          No public signup — access is invite-only.
        </p>
      </div>
    </div>
  )
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { Database } from './database.types'

export type PortalRole = Database['public']['Enums']['portal_role']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Client = Database['public']['Tables']['clients']['Row']
export type ClientMembership =
  Database['public']['Tables']['client_memberships']['Row'] & {
    client: Client | null
  }

type AuthContextValue = {
  session: Session | null
  user: User | null
  profile: Profile | null
  memberships: ClientMembership[]
  isAdmin: boolean
  hasPortalAccess: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshPortal: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function loadPortalState(userId: string) {
  const [{ data: profile }, { data: memberships, error }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase
      .from('client_memberships')
      .select('*, client:clients(*)')
      .eq('user_id', userId),
  ])

  if (error) {
    console.error('Failed to load memberships', error)
  }

  const rows = (memberships ?? []) as ClientMembership[]
  const isAdmin = rows.some((m) => m.role === 'thornvine_admin')

  return {
    profile: profile ?? null,
    memberships: rows,
    isAdmin,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [memberships, setMemberships] = useState<ClientMembership[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshPortal = useCallback(async () => {
    const {
      data: { session: current },
    } = await supabase.auth.getSession()

    if (!current?.user) {
      setProfile(null)
      setMemberships([])
      setIsAdmin(false)
      return
    }

    const portal = await loadPortalState(current.user.id)
    setProfile(portal.profile)
    setMemberships(portal.memberships)
    setIsAdmin(portal.isAdmin)
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setSession(data.session)
      if (data.session?.user) {
        const portal = await loadPortalState(data.session.user.id)
        if (!mounted) return
        setProfile(portal.profile)
        setMemberships(portal.memberships)
        setIsAdmin(portal.isAdmin)
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (!nextSession?.user) {
        setProfile(null)
        setMemberships([])
        setIsAdmin(false)
        setLoading(false)
        return
      }

      setLoading(true)
      void loadPortalState(nextSession.user.id).then((portal) => {
        if (!mounted) return
        setProfile(portal.profile)
        setMemberships(portal.memberships)
        setIsAdmin(portal.isAdmin)
        setLoading(false)
      })
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      memberships,
      isAdmin,
      hasPortalAccess: isAdmin || memberships.length > 0,
      loading,
      signIn,
      signOut,
      refreshPortal,
    }),
    [
      session,
      profile,
      memberships,
      isAdmin,
      loading,
      signIn,
      signOut,
      refreshPortal,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading, hasPortalAccess } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="auth-screen">
        <p className="auth-muted">Checking your session…</p>
      </div>
    )
  }

  if (!session) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />
  }

  if (!hasPortalAccess) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <h1>Access pending</h1>
          <p>
            You&apos;re signed in, but your account isn&apos;t linked to a client
            workspace yet. Ask your Thornvine contact to finish the invite.
          </p>
          <SignOutButton />
        </div>
      </div>
    )
  }

  return children
}

function SignOutButton() {
  const { signOut } = useAuth()
  return (
    <button type="button" className="btn btn--primary" onClick={() => void signOut()}>
      Sign out
    </button>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'
import { AdminWorkspace } from './AdminWorkspace'
import './portal.css'

type ClientRow = Database['public']['Tables']['clients']['Row']
type Project = Database['public']['Tables']['projects']['Row']
type ProjectUpdate = Database['public']['Tables']['project_updates']['Row'] & {
  project?: Pick<Project, 'id' | 'name'> | null
}

const statusLabel: Record<Project['status'], string> = {
  discovery: 'Discovery',
  active: 'Active',
  paused: 'Paused',
  complete: 'Complete',
}

export function ClientPortalPage() {
  const { user, profile, memberships, isAdmin, signOut } = useAuth()
  const [clients, setClients] = useState<ClientRow[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const primaryClient = useMemo(() => {
    const withClient = memberships.find((m) => m.client)
    return withClient?.client ?? null
  }, [memberships])

  const greetingName =
    profile?.full_name?.split(' ')[0] ||
    profile?.email?.split('@')[0] ||
    'there'

  const loadRequest = useRef(0)

  const loadPortal = useCallback(async () => {
    const requestId = ++loadRequest.current

    const clientQuery = isAdmin
      ? supabase.from('clients').select('*').order('name', { ascending: true })
      : Promise.resolve({ data: [] as ClientRow[], error: null })

    const [projectResult, updateResult, clientResult] = await Promise.all([
      supabase.from('projects').select('*').order('updated_at', { ascending: false }),
      supabase
        .from('project_updates')
        .select('*, project:projects(id, name)')
        .order('published_at', { ascending: false })
        .limit(8),
      clientQuery,
    ])

    if (requestId !== loadRequest.current) return

    setError(null)

    if (projectResult.error || updateResult.error || clientResult.error) {
      setError(
        projectResult.error?.message ||
          updateResult.error?.message ||
          clientResult.error?.message ||
          'Failed to load portal',
      )
      setLoadingData(false)
      return
    }

    setProjects(projectResult.data ?? [])
    setUpdates((updateResult.data ?? []) as ProjectUpdate[])
    setClients(clientResult.data ?? [])
    setLoadingData(false)
  }, [isAdmin])

  useEffect(() => {
    void loadPortal()
    return () => {
      loadRequest.current += 1
    }
  }, [loadPortal])

  return (
    <div className="portal">
      <header className="portal-top">
        <Link to="/" className="portal-brand">
          thornvine
        </Link>
        <div className="portal-top-actions">
          <span className="portal-user">
            {profile?.email}
            {isAdmin ? <em>Admin</em> : null}
          </span>
          <button type="button" className="portal-signout" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <main className="portal-main">
        <section className="portal-hero">
          <p className="portal-eyebrow">Client portal</p>
          <h1>Welcome back, {greetingName}.</h1>
          <p>
            {primaryClient
              ? `Workspace for ${primaryClient.name}.`
              : isAdmin
                ? 'You have Thornvine admin access across client workspaces.'
                : 'Your workspace will appear here once projects are ready.'}
          </p>
        </section>

        {error ? (
          <p className="portal-error" role="alert">
            {error}
          </p>
        ) : null}

        {isAdmin && user ? (
          <AdminWorkspace
            userId={user.id}
            clients={clients}
            projects={projects}
            onSaved={loadPortal}
          />
        ) : null}

        <section className="portal-section" aria-labelledby="projects-heading">
          <div className="portal-section-head">
            <h2 id="projects-heading">Projects</h2>
          </div>
          {loadingData ? (
            <p className="portal-muted">Loading projects…</p>
          ) : projects.length === 0 ? (
            <div className="portal-empty">
              <h3>No projects yet</h3>
              <p>
                {isAdmin
                  ? 'Create a client and a project in Workspace setup. They will show up here.'
                  : 'When work kicks off, your active projects and status will show up here.'}
              </p>
            </div>
          ) : (
            <ul className="project-grid">
              {projects.map((project) => (
                <li key={project.id} className="project-tile">
                  <span className={`status-chip status-chip--${project.status}`}>
                    {statusLabel[project.status]}
                  </span>
                  <h3>{project.name}</h3>
                  {isAdmin ? (
                    <p className="project-client">
                      {clients.find((client) => client.id === project.client_id)?.name ?? 'Client'}
                    </p>
                  ) : null}
                  <p>{project.summary || 'No summary yet.'}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="portal-section" aria-labelledby="updates-heading">
          <div className="portal-section-head">
            <h2 id="updates-heading">Recent updates</h2>
          </div>
          {loadingData ? (
            <p className="portal-muted">Loading updates…</p>
          ) : updates.length === 0 ? (
            <div className="portal-empty">
              <h3>Quiet for now</h3>
              <p>Project notes and progress updates will land in this feed.</p>
            </div>
          ) : (
            <ul className="update-list">
              {updates.map((update) => (
                <li key={update.id} className="update-item">
                  <div>
                    <p className="update-meta">
                      {update.project?.name ?? 'Project'}
                      <span aria-hidden="true"> · </span>
                      {new Date(update.published_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <h3>{update.title}</h3>
                    <p>{update.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

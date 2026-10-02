import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'
import './portal.css'

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
  const { profile, memberships, isAdmin, signOut } = useAuth()
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

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoadingData(true)
      setError(null)

      const [{ data: projectRows, error: projectError }, { data: updateRows, error: updateError }] =
        await Promise.all([
          supabase
            .from('projects')
            .select('*')
            .order('updated_at', { ascending: false }),
          supabase
            .from('project_updates')
            .select('*, project:projects(id, name)')
            .order('published_at', { ascending: false })
            .limit(8),
        ])

      if (!mounted) return

      if (projectError || updateError) {
        setError(projectError?.message || updateError?.message || 'Failed to load portal')
        setLoadingData(false)
        return
      }

      setProjects(projectRows ?? [])
      setUpdates((updateRows ?? []) as ProjectUpdate[])
      setLoadingData(false)
    }

    void load()
    return () => {
      mounted = false
    }
  }, [])

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
                When work kicks off, your active projects and status will show up
                here.
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

import { useState, type FormEvent } from 'react'
import type { Database } from '../lib/database.types'
import { supabase } from '../lib/supabase'

type ClientRow = Database['public']['Tables']['clients']['Row']
type Project = Database['public']['Tables']['projects']['Row']
type ClientStatus = Database['public']['Enums']['client_status']
type ProjectStatus = Database['public']['Enums']['project_status']

type Props = {
  userId: string
  clients: ClientRow[]
  projects: Project[]
  onSaved: () => Promise<void>
}

const projectStatusLabel: Record<ProjectStatus, string> = {
  discovery: 'Discovery',
  active: 'Active',
  paused: 'Paused',
  complete: 'Complete',
}

function slugifyClientName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

function saveError(error: { code?: string; message: string }, duplicateLabel: string) {
  if (error.code === '23505') return `That ${duplicateLabel} already exists.`
  return error.message
}

export function AdminWorkspace({ userId, clients, projects, onSaved }: Props) {
  return (
    <section className="portal-section" aria-labelledby="workspace-heading">
      <div className="portal-section-head">
        <h2 id="workspace-heading">Workspace setup</h2>
        <p className="portal-muted">
          Create the client, project, and update records this portal already shows.
          Invites still happen in Supabase Auth.
        </p>
      </div>
      <div className="admin-grid">
        <ClientForm clients={clients} onSaved={onSaved} />
        <ProjectForm clients={clients} onSaved={onSaved} />
        <UpdateForm userId={userId} projects={projects} onSaved={onSaved} />
      </div>
    </section>
  )
}

function ClientForm({
  clients,
  onSaved,
}: {
  clients: ClientRow[]
  onSaved: () => Promise<void>
}) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [status, setStatus] = useState<ClientStatus>('active')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setNotice(null)
    const nextSlug = (slugEdited ? slug : slugifyClientName(name)).trim()
    if (!nextSlug) {
      setError('Add a name that can become a slug.')
      return
    }
    setSaving(true)
    const { error: insertError } = await supabase.from('clients').insert({
      name: name.trim(),
      slug: nextSlug,
      status,
    })
    if (insertError) {
      setSaving(false)
      setError(saveError(insertError, 'slug'))
      return
    }
    setName('')
    setSlug('')
    setSlugEdited(false)
    setStatus('active')
    setNotice('Client saved.')
    await onSaved()
    setSaving(false)
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h3>New client</h3>
      <label>
        Name
        <input
          name="client-name"
          required
          value={name}
          onChange={(event) => {
            const next = event.target.value
            setName(next)
            if (!slugEdited) setSlug(slugifyClientName(next))
          }}
        />
      </label>
      <label>
        Slug
        <input
          name="client-slug"
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="Lowercase letters, numbers, and hyphens"
          value={slug}
          onChange={(event) => {
            setSlugEdited(true)
            setSlug(event.target.value)
          }}
        />
      </label>
      <label>
        Status
        <select
          name="client-status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ClientStatus)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <FormFeedback error={error} notice={notice} />
      <button className="btn btn--primary" type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save client'}
      </button>
      {clients.length > 0 ? (
        <p className="admin-note">{clients.length} client{clients.length === 1 ? '' : 's'} already in the portal.</p>
      ) : null}
    </form>
  )
}

function ProjectForm({
  clients,
  onSaved,
}: {
  clients: ClientRow[]
  onSaved: () => Promise<void>
}) {
  const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [status, setStatus] = useState<ProjectStatus>('discovery')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const blocked = clients.length === 0

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setNotice(null)
    if (!clientId) {
      setError('Choose a client first.')
      return
    }
    setSaving(true)
    const { error: insertError } = await supabase.from('projects').insert({
      client_id: clientId,
      name: name.trim(),
      summary: summary.trim() || null,
      status,
    })
    if (insertError) {
      setSaving(false)
      setError(saveError(insertError, 'project'))
      return
    }
    setName('')
    setSummary('')
    setStatus('discovery')
    setNotice('Project saved.')
    await onSaved()
    setSaving(false)
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h3>New project</h3>
      <label>
        Client
        <select
          name="project-client"
          required
          value={clientId}
          disabled={blocked}
          onChange={(event) => setClientId(event.target.value)}
        >
          <option value="">{blocked ? 'Create a client first' : 'Choose a client'}</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Name
        <input
          name="project-name"
          required
          disabled={blocked}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Summary
        <textarea
          name="project-summary"
          rows={3}
          disabled={blocked}
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </label>
      <label>
        Status
        <select
          name="project-status"
          value={status}
          disabled={blocked}
          onChange={(event) => setStatus(event.target.value as ProjectStatus)}
        >
          {(Object.keys(projectStatusLabel) as ProjectStatus[]).map((value) => (
            <option key={value} value={value}>
              {projectStatusLabel[value]}
            </option>
          ))}
        </select>
      </label>
      <FormFeedback error={error} notice={notice} />
      <button className="btn btn--primary" type="submit" disabled={saving || blocked}>
        {saving ? 'Saving…' : 'Save project'}
      </button>
    </form>
  )
}

function UpdateForm({
  userId,
  projects,
  onSaved,
}: {
  userId: string
  projects: Project[]
  onSaved: () => Promise<void>
}) {
  const [projectId, setProjectId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const blocked = projects.length === 0

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setNotice(null)
    if (!projectId) {
      setError('Choose a project first.')
      return
    }
    setSaving(true)
    const { error: insertError } = await supabase.from('project_updates').insert({
      project_id: projectId,
      author_id: userId,
      title: title.trim(),
      body: body.trim(),
    })
    if (insertError) {
      setSaving(false)
      setError(saveError(insertError, 'update'))
      return
    }
    setTitle('')
    setBody('')
    setNotice('Update published.')
    await onSaved()
    setSaving(false)
  }

  return (
    <form className="admin-card admin-form" onSubmit={onSubmit}>
      <h3>New update</h3>
      <label>
        Project
        <select
          name="update-project"
          required
          value={projectId}
          disabled={blocked}
          onChange={(event) => setProjectId(event.target.value)}
        >
          <option value="">{blocked ? 'Create a project first' : 'Choose a project'}</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Title
        <input
          name="update-title"
          required
          disabled={blocked}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Note
        <textarea
          name="update-body"
          rows={4}
          required
          disabled={blocked}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </label>
      <FormFeedback error={error} notice={notice} />
      <button className="btn btn--primary" type="submit" disabled={saving || blocked}>
        {saving ? 'Publishing…' : 'Publish update'}
      </button>
    </form>
  )
}

function FormFeedback({ error, notice }: { error: string | null; notice: string | null }) {
  if (error) {
    return (
      <p className="portal-error" role="alert">
        {error}
      </p>
    )
  }
  if (notice) {
    return (
      <p className="portal-success" role="status">
        {notice}
      </p>
    )
  }
  return null
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Badge, Button, Card, Spinner, TextArea, TextField, buttonClassName } from '../../design-system'
import { useAuth } from '../../lib/auth'
import { briefField, FIELD_LABEL } from './questionCopy'
import { listIntakes, loadIntake, mergeFields, reviewIntake, type IntakeListItem, type IntakeState, type IntakeStatus } from './intakeApi'
import './new-client.css'

type DeskFilter = 'waiting' | 'writing' | 'decided'

const STATUS_LABEL: Record<IntakeStatus, string> = {
  draft: 'Still writing',
  awaiting_review: 'Waiting',
  clarification: 'Needs a reply',
  invited: 'Invited',
  on_hold: 'On hold',
  declined: 'Declined',
}

const DECISION_LABEL: Record<string, string> = {
  invite: 'Invited them in',
  clarify: 'Asked for a clearer picture',
  hold: 'Put on hold',
  decline: 'Declined',
}

const GAP_LABEL: Record<string, string> = {
  not_discussed: 'not discussed yet',
  unknown: 'not sure yet',
  inferred: 'read between the lines',
}

function statusTone(status: IntakeStatus): 'neutral' | 'success' | 'warning' | 'danger' | 'info' {
  if (status === 'invited') return 'success'
  if (status === 'declined') return 'danger'
  if (status === 'awaiting_review' || status === 'on_hold') return 'warning'
  if (status === 'clarification') return 'info'
  return 'neutral'
}

function relativeDate(iso: string | null) {
  const value = iso ? new Date(iso) : null
  if (!value || Number.isNaN(value.getTime())) return ''
  const days = Math.round((Date.now() - value.getTime()) / 86_400_000)
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return value.toLocaleDateString()
}

function rowTitle(row: IntakeListItem) {
  return row.contact_name?.trim() || row.company_name?.trim() || row.summary?.trim() || 'Introduction'
}

function inFilter(row: IntakeListItem, filter: DeskFilter) {
  if (filter === 'waiting') return row.status === 'awaiting_review' || row.status === 'clarification'
  if (filter === 'writing') {
    return (
      row.status === 'draft' &&
      Boolean(row.summary?.trim() || row.contact_name?.trim() || row.company_name?.trim())
    )
  }
  return row.status === 'invited' || row.status === 'on_hold' || row.status === 'declined'
}

function emptyCopy(filter: DeskFilter) {
  if (filter === 'waiting') return 'Nothing is waiting. New introductions appear here after someone sends them for review.'
  if (filter === 'writing') return 'No one is still writing.'
  return 'No decisions yet.'
}

export function StaffReviewPage() {
  const { intakeId } = useParams()
  const { session, isAdmin, loading } = useAuth()
  if (loading) {
    return (
      <main className="nc-staff">
        <Spinner label="Checking access" />
      </main>
    )
  }
  if (!session || session.user.is_anonymous || !isAdmin) {
    return (
      <main className="nc-staff">
        <Card title="Review desk">
          <p>This page is for Thornvine. Sign in with your staff account.</p>
          <Link className={buttonClassName({ variant: 'primary' })} to="/login?next=/newclient/review">
            Sign in
          </Link>
        </Card>
      </main>
    )
  }
  return intakeId ? <ReviewDetail intakeId={intakeId} /> : <ReviewList />
}

function ReviewList() {
  const [rows, setRows] = useState<IntakeListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<DeskFilter>('waiting')
  useEffect(() => {
    void listIntakes()
      .then(setRows)
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Could not load intakes'))
  }, [])
  const waiting = rows?.filter((row) => inFilter(row, 'waiting')).length ?? 0
  const writing = rows?.filter((row) => inFilter(row, 'writing')).length ?? 0
  const decided = rows?.filter((row) => inFilter(row, 'decided')).length ?? 0
  const visible = rows?.filter((row) => inFilter(row, filter)) ?? []
  return (
    <main className="nc-staff">
      <header className="nc-staff-head">
        <h1>Review desk</h1>
        <p className="nc-staff-support">Who is waiting, who is still writing, and who you already decided on.</p>
      </header>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!rows && !error ? <Spinner label="Loading introductions" /> : null}
      {rows ? (
        <div className="nc-filters" role="group" aria-label="Review desk filters">
          <Button
            variant="secondary"
            className={filter === 'waiting' ? 'nc-filter--on' : undefined}
            aria-pressed={filter === 'waiting'}
            onClick={() => setFilter('waiting')}
          >
            Waiting {waiting}
          </Button>
          <Button
            variant="secondary"
            className={filter === 'writing' ? 'nc-filter--on' : undefined}
            aria-pressed={filter === 'writing'}
            onClick={() => setFilter('writing')}
          >
            Still writing {writing}
          </Button>
          <Button
            variant="secondary"
            className={filter === 'decided' ? 'nc-filter--on' : undefined}
            aria-pressed={filter === 'decided'}
            onClick={() => setFilter('decided')}
          >
            Decided {decided}
          </Button>
        </div>
      ) : null}
      {rows && visible.length === 0 ? <p className="nc-staff-empty">{emptyCopy(filter)}</p> : null}
      <ul className="nc-list">
        {visible.map((row) => (
          <li key={row.id}>
            <Link to={`/newclient/review/${row.id}`} className="nc-desk-link">
              <Card
                className="nc-desk-row"
                interactive
                eyebrow={relativeDate(row.submitted_at || row.created_at)}
                title={rowTitle(row)}
                footer={<Badge tone={statusTone(row.status)}>{STATUS_LABEL[row.status]}</Badge>}
              >
                {row.summary ? <p>{row.summary}</p> : null}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

function ReviewDetail({ intakeId }: { intakeId: string }) {
  const [state, setState] = useState<IntakeState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [clientMessage, setClientMessage] = useState('')
  const [direction, setDirection] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void loadIntake(intakeId)
      .then(setState)
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Could not load intake'))
  }, [intakeId])

  async function decide(decision: 'invite' | 'clarify' | 'hold' | 'decline') {
    setBusy(true)
    setError(null)
    try {
      setState(
        await reviewIntake({
          intakeId,
          decision,
          internalNotes: notes,
          clientMessage,
          stage2Direction: direction,
        }),
      )
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Decision was not saved')
    } finally {
      setBusy(false)
    }
  }

  const fields = state ? mergeFields(state.fields) : []
  const brief = fields
    .filter((field) => field.key !== 'summary')
    .map((field) => ({ field, text: briefField(field) }))
    .filter((row) => row.text)
  const gaps = fields.filter(
    (field) =>
      field.key !== 'summary' &&
      (field.status === 'unknown' || field.status === 'inferred' || field.status === 'not_discussed'),
  )
  const title = state?.intake.contact_name?.trim() || state?.intake.company_name?.trim() || 'Introduction'
  const dateLabel = state?.intake.submitted_at
    ? relativeDate(state.intake.submitted_at)
    : state
      ? 'Still writing'
      : ''

  return (
    <main className="nc-staff">
      <Link className={buttonClassName({ variant: 'tertiary' })} to="/newclient/review">
        Back to the desk
      </Link>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!state && !error ? <Spinner label="Loading introduction" /> : null}
      {state ? (
        <>
          <Card
            eyebrow={<Badge tone={statusTone(state.intake.status)}>{STATUS_LABEL[state.intake.status]}</Badge>}
            title={title}
          >
            <p>
              {[state.intake.contact_name, state.intake.company_name, state.intake.contact_email, dateLabel]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </Card>
          <Card title="Brief">
            {brief.length === 0 ? <p>Nothing written yet.</p> : null}
            <dl className="nc-brief">
              {brief.map(({ field, text }) => (
                <div key={field.key}>
                  <dt>{FIELD_LABEL[field.key]}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card title="Conversation">
            {state.messages.length === 0 ? <p>No conversation yet.</p> : null}
            <ol className="nc-transcript">
              {state.messages.map((message) => (
                <li key={message.id} className={`nc-bubble nc-bubble--${message.role}`}>
                  <p>{message.body}</p>
                </li>
              ))}
            </ol>
          </Card>
          <Card title="References">
            {state.references.length === 0 ? <p>None yet.</p> : null}
            <ul>
              {state.references.map((reference) => (
                <li key={reference.id}>
                  {reference.url ? (
                    <a href={reference.url}>{reference.label || reference.url}</a>
                  ) : (
                    reference.label || 'Attached file'
                  )}
                </li>
              ))}
            </ul>
          </Card>
          {state.intake.status !== 'draft' && gaps.length > 0 ? (
            <Card title="Still open">
              <ul>
                {gaps.map((field) => (
                  <li key={field.key}>
                    {FIELD_LABEL[field.key]} — {GAP_LABEL[field.status] ?? 'still open'}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          {state.intake.status === 'awaiting_review' ? (
            <Card title="Decision">
              <TextArea label="Internal notes" hint="Never shown to the client." value={notes} onChange={(event) => setNotes(event.target.value)} />
              <TextArea label="Message the client can see" value={clientMessage} onChange={(event) => setClientMessage(event.target.value)} />
              <TextField
                label="Direction for a later conversation"
                hint="Kept internal."
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
              />
              <div className="nc-chips">
                <Button variant="primary" disabled={busy} onClick={() => void decide('invite')}>
                  Invite them in
                </Button>
                <Button variant="secondary" disabled={busy} onClick={() => void decide('clarify')}>
                  Request clarification
                </Button>
                <Button variant="secondary" disabled={busy} onClick={() => void decide('hold')}>
                  Put on hold
                </Button>
                <Button variant="tertiary" disabled={busy} onClick={() => void decide('decline')}>
                  Decline
                </Button>
              </div>
            </Card>
          ) : null}
          <Card title="Review history">
            {state.reviews.length === 0 ? <p>No decisions yet.</p> : null}
            <ul>
              {state.reviews.map((review) => (
                <li key={review.id}>
                  {DECISION_LABEL[review.decision] ?? review.decision} · {new Date(review.created_at).toLocaleString()}
                  {review.internal_notes ? ` · ${review.internal_notes}` : ''}
                </li>
              ))}
            </ul>
          </Card>
        </>
      ) : null}
    </main>
  )
}

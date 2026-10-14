import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Badge, Button, Card, Spinner, TextArea, TextField } from '../../design-system'
import { buttonClassName } from '../../design-system'
import { useAuth } from '../../lib/auth'
import { advisoryFit } from './orchestrator'
import { listIntakes, loadIntake, mergeFields, reviewIntake, type IntakeListItem, type IntakeState } from './intakeApi'
import './new-client.css'

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
  useEffect(() => {
    void listIntakes()
      .then(setRows)
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Could not load intakes'))
  }, [])
  return (
    <main className="nc-staff">
      <h1>New-client review</h1>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!rows && !error ? <Spinner label="Loading intakes" /> : null}
      <ul className="nc-list">
        {rows?.map((row) => (
          <li key={row.id}>
            <Card
              eyebrow={row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : 'Not submitted'}
              title={row.contact_name || row.company_name || 'Untitled opportunity'}
              footer={<Badge>{row.status.replaceAll('_', ' ')}</Badge>}
            >
              <Link to={`/newclient/review/${row.id}`}>{row.summary || 'Open the conversation'}</Link>
            </Card>
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
  const latest = state?.submissions[state.submissions.length - 1]

  return (
    <main className="nc-staff">
      <Link to="/newclient/review">All intakes</Link>
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!state && !error ? <Spinner label="Loading intake" /> : null}
      {state ? (
        <>
          <Card
            eyebrow={<Badge tone="info">{state.intake.status.replaceAll('_', ' ')}</Badge>}
            title={state.intake.contact_name || 'Opportunity'}
          >
            <p>
              {state.intake.contact_email} {state.intake.company_name ? `· ${state.intake.company_name}` : ''}
            </p>
            <Alert tone="info" title="Advisory fit, not a decision">
              {advisoryFit(fields)}
            </Alert>
          </Card>
          <Card title="Submitted brief">
            <pre className="nc-summary">{JSON.stringify(latest?.snapshot ?? { fields }, null, 2)}</pre>
          </Card>
          <Card title="Conversation">
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
                    reference.label || reference.storage_path
                  )}
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Unknowns and inferences">
            <ul>
              {fields
                .filter((field) => field.status === 'unknown' || field.status === 'inferred' || field.status === 'not_discussed')
                .map((field) => (
                  <li key={field.key}>
                    {field.key}: {field.status.replaceAll('_', ' ')}
                  </li>
                ))}
            </ul>
          </Card>
          {state.intake.status === 'awaiting_review' ? (
            <Card title="Decision">
              <TextArea label="Internal notes" hint="Never shown to the client." value={notes} onChange={(event) => setNotes(event.target.value)} />
              <TextArea label="Message the client can see" value={clientMessage} onChange={(event) => setClientMessage(event.target.value)} />
              <TextField
                label="Direction for a future Stage 2"
                hint="Kept internal."
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
              />
              <div className="nc-chips">
                <Button variant="primary" disabled={busy} onClick={() => void decide('invite')}>
                  Invite to Stage 2
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
                  {review.decision} · {new Date(review.created_at).toLocaleString()} · reviewer {review.reviewer_id}
                  {review.internal_notes ? ` · notes: ${review.internal_notes}` : ''}
                </li>
              ))}
            </ul>
          </Card>
        </>
      ) : null}
    </main>
  )
}

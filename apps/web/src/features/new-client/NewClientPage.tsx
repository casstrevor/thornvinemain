import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Icon, IconButton, Spinner, TextArea, TextField } from '../../design-system'
import { activeWidget, canSubmit, previousAnswer, questionWidget, widgetFocus, type FieldKey, type FieldValue } from './orchestrator'
import {
  addReference,
  ensureIntakeSession,
  mergeFields,
  removeReference,
  sendTurn,
  startIntake,
  submitIntake,
  type IntakeState,
} from './intakeApi'
import { presentQuestion } from './questionCopy'
import { IntakeWidget, Summary, type NextBinder } from './widgets'
import './new-client.css'

type PendingReference = {
  localId: string
  label: string
  kind: 'link' | 'file'
  status: 'uploading' | 'failed'
  error?: string
  url?: string
  file?: File
}

function draftKey(intakeId: string) {
  return `thornvine-intake-draft:${intakeId}`
}

export function NewClientPage() {
  const navigate = useNavigate()
  const [state, setState] = useState<IntakeState | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [demo, setDemo] = useState(true)
  const [busy, setBusy] = useState(false)
  const [booting, setBooting] = useState(true)
  const [pending, setPending] = useState<PendingReference[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const [link, setLink] = useState('')
  const [linkError, setLinkError] = useState<string | null>(null)
  const [revising, setRevising] = useState<FieldKey | null>(null)
  const [revisionDraft, setRevisionDraft] = useState('')
  const [nextBlocked, setNextBlocked] = useState(true)
  const nextRun = useRef<(() => void) | null>(null)
  const turnKey = useRef<string | null>(null)
  const composer = useRef<HTMLTextAreaElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const addReferenceWrap = useRef<HTMLDivElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const menuId = useId()

  useEffect(() => {
    let active = true
    void (async () => {
      try {
        const session = await ensureIntakeSession()
        if (!active) return
        setUserId(session.user.id)
        const next = await startIntake()
        if (!active) return
        setState(next)
        const saved = sessionStorage.getItem(draftKey(next.intake.id))
        if (saved) setDraft(saved)
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : 'Could not start')
      } finally {
        if (active) setBooting(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  const fields = state ? mergeFields(state.fields) : []
  const ready = canSubmit(fields)
  const open = state?.intake.status === 'draft' || state?.intake.status === 'clarification'
  const lastAssistant = [...(state?.messages ?? [])].reverse().find((message) => message.role === 'assistant')
  const focus: FieldKey | null =
    state && state.messages.filter((message) => message.role === 'client').length === 0
      ? 'idea'
      : widgetFocus(lastAssistant?.widget ?? null)
  const widget = open && !revising ? activeWidget(lastAssistant?.widget ?? null) : revising ? questionWidget(revising) : null
  const showSummary = Boolean(open && !revising && (widget?.type === 'summary' || (ready.ok && !widget)))
  const showComposer = Boolean(open && !showSummary && (!widget || widget.type === 'text'))
  const showChoices = Boolean(open && widget && widget.type !== 'text' && widget.type !== 'summary')
  const copy = presentQuestion(revising ?? focus, revising ? '' : (lastAssistant?.body ?? ''))
  const answerDraft = revising ? revisionDraft : draft
  const nextDisabled = busy || (showComposer ? !answerDraft.trim() : nextBlocked)
  const backTarget = previousAnswer(fields, revising ?? focus)
  const registerNext = useCallback<NextBinder>((action, blocked) => {
    nextRun.current = action
    setNextBlocked((current) => (current === blocked ? current : blocked))
  }, [])

  useEffect(() => {
    if (!state) return
    const key = draftKey(state.intake.id)
    if (draft) sessionStorage.setItem(key, draft)
    else sessionStorage.removeItem(key)
  }, [draft, state])

  useEffect(() => {
    if (booting) return
    if (showComposer) composer.current?.focus()
    else heading.current?.focus()
  }, [lastAssistant?.id, showComposer, showSummary, booting, revising])

  useEffect(() => {
    if (!menuOpen) return
    function onPointer(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (addReferenceWrap.current?.contains(target)) return
      setMenuOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        addReferenceWrap.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  function resizeComposer(element: HTMLTextAreaElement) {
    element.style.height = 'auto'
    const limit = 18 * 16
    element.style.height = `${Math.min(element.scrollHeight, limit)}px`
  }

  async function commit(text: string, widgetValue?: FieldValue | null) {
    if (!state || !open || busy) return
    const body = text.trim()
    if (!body) return
    const key = turnKey.current ?? crypto.randomUUID()
    turnKey.current = key
    setBusy(true)
    setError(null)
    try {
      const result = await sendTurn({
        intakeId: state.intake.id,
        turnKey: key,
        body,
        fields,
        focus: revising ?? focus,
        widgetValue,
      })
      turnKey.current = null
      setState(result.state)
      setDemo(result.demo)
      if (revising) {
        setRevising(null)
        setRevisionDraft('')
      } else {
        setDraft('')
      }
      if (composer.current) {
        composer.current.style.height = ''
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The turn did not save. You can try again.')
    } finally {
      setBusy(false)
    }
  }

  async function sendForReview(correction: string | null) {
    if (!state || busy) return
    const key = turnKey.current ?? crypto.randomUUID()
    turnKey.current = key
    setBusy(true)
    setError(null)
    try {
      let current = state
      const summary = mergeFields(current.fields).find((field) => field.key === 'summary')
      if (correction) {
        const result = await sendTurn({
          intakeId: current.intake.id,
          turnKey: key,
          body: correction,
          fields: mergeFields(current.fields),
          focus: 'summary',
          widgetValue: { confirmed: false, corrections: correction, text: correction },
        })
        turnKey.current = null
        setState(result.state)
        setDemo(result.demo)
        return
      }
      if (summary?.status !== 'confirmed') {
        const result = await sendTurn({
          intakeId: current.intake.id,
          turnKey: key,
          body: 'This feels like my idea.',
          fields: mergeFields(current.fields),
          focus: 'summary',
          widgetValue: { confirmed: true, text: 'confirmed' },
        })
        turnKey.current = null
        current = result.state
        setState(current)
        setDemo(result.demo)
      } else {
        turnKey.current = null
      }
      if (canSubmit(mergeFields(current.fields)).ok) {
        setState(await submitIntake(current.intake.id))
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'This did not send. Your answers are still here.')
    } finally {
      setBusy(false)
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    void commit(answerDraft)
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing || event.key === 'Process') return
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void commit(answerDraft)
    }
  }

  function openAnswer(key: FieldKey) {
    const value = fields.find((field) => field.key === key)?.value
    const text = typeof value?.text === 'string' && value.text !== 'confirmed' ? value.text : ''
    setRevisionDraft(text)
    setRevising(key)
  }

  async function saveReference(item: PendingReference) {
    if (!state || !userId) return
    setPending((current) => current.map((row) => (row.localId === item.localId ? { ...row, status: 'uploading', error: undefined } : row)))
    try {
      const next = await addReference({
        intakeId: state.intake.id,
        userId,
        kind: item.kind,
        label: item.label,
        url: item.url,
        file: item.file,
      })
      setState(next)
      setPending((current) => current.filter((row) => row.localId !== item.localId))
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'This reference did not attach.'
      setPending((current) => current.map((row) => (row.localId === item.localId ? { ...row, status: 'failed', error: message } : row)))
    }
  }

  function queueReference(item: Omit<PendingReference, 'localId' | 'status'>) {
    const localId = crypto.randomUUID()
    const pendingItem: PendingReference = { ...item, localId, status: 'uploading' }
    setPending((current) => [...current, pendingItem])
    void saveReference(pendingItem)
  }

  function saveLink() {
    const url = link.trim()
    if (!/^https?:\/\//i.test(url)) {
      setLinkError('Use a link that starts with http:// or https://.')
      return
    }
    let label = url
    try {
      label = new URL(url).hostname
    } catch {
      label = url
    }
    queueReference({ kind: 'link', label, url })
    setLink('')
    setLinkError(null)
    setLinkOpen(false)
    setMenuOpen(false)
  }

  async function removeSaved(reference: IntakeState['references'][number]) {
    try {
      setState(await removeReference(reference.id, reference.storage_path))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'That reference is still attached.')
    }
  }

  const saveLabel = booting || busy ? 'Saving…' : state && !error ? 'Saved' : ''

  const references = (
    <div className="nc-references">
      {state && (state.references.length > 0 || pending.length > 0) ? (
        <ul className="nc-ref-list">
          {state.references.map((reference) => (
            <li key={reference.id} className="nc-ref-chip">
              <Icon name={reference.kind === 'link' ? 'arrow-out' : 'paperclip'} />
              <span>{reference.label || (reference.kind === 'link' ? 'Link' : 'File')}</span>
              <span className="nc-ref-state">Attached</span>
              {open ? (
                <IconButton icon="close" label={`Remove ${reference.label || 'reference'}`} onClick={() => void removeSaved(reference)} />
              ) : null}
            </li>
          ))}
          {pending.map((reference) => (
            <li key={reference.localId} className={`nc-ref-chip${reference.status === 'failed' ? ' nc-ref-chip--failed' : ''}`}>
              <Icon name={reference.kind === 'link' ? 'arrow-out' : 'paperclip'} />
              <span>{reference.label}</span>
              <span className="nc-ref-state">{reference.status === 'uploading' ? 'Uploading' : 'Failed'}</span>
              {reference.status === 'failed' ? (
                <Button type="button" variant="tertiary" onClick={() => void saveReference(reference)}>
                  Retry
                </Button>
              ) : (
                <Spinner size="sm" label="" />
              )}
              {reference.error ? <span className="nc-ref-error">{reference.error}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {open ? (
        <div className="nc-ref-add" ref={addReferenceWrap}>
          <Button
            type="button"
            variant="tertiary"
            className="nc-quiet"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            iconStart={<Icon name="paperclip" />}
            onClick={() => {
              setLinkOpen(false)
              setMenuOpen((current) => !current)
            }}
          >
            Add a reference
          </Button>
          {menuOpen ? (
            <div id={menuId} className="nc-ref-menu" role="menu">
              <Button
                type="button"
                variant="tertiary"
                className="nc-menu-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  setLinkOpen(true)
                  setLinkError(null)
                }}
              >
                Add a link
              </Button>
              <Button
                type="button"
                variant="tertiary"
                className="nc-menu-item"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  fileInput.current?.click()
                }}
              >
                Upload a file
              </Button>
            </div>
          ) : null}
          {linkOpen ? (
            <div className="nc-link">
              <TextField
                label="Reference link"
                type="url"
                inputMode="url"
                autoFocus
                value={link}
                error={linkError}
                placeholder="https://"
                onChange={(event) => {
                  setLink(event.target.value)
                  setLinkError(null)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    saveLink()
                  }
                }}
              />
              <div className="nc-actions">
                <Button type="button" variant="secondary" onClick={saveLink} disabled={!link.trim()}>
                  Save link
                </Button>
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => {
                    setLinkOpen(false)
                    setLinkError(null)
                    addReferenceWrap.current?.querySelector('button')?.focus()
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
          <input
            ref={fileInput}
            hidden
            type="file"
            accept="image/png,image/jpeg,image/webp,application/pdf,text/plain"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (!file) return
              queueReference({ kind: 'file', label: file.name, file })
            }}
          />
        </div>
      ) : null}
    </div>
  )

  return (
    <div className="nc-shell">
      <header className="nc-header">
        <div className="nc-top">
          <p className="nc-brand">thornvine</p>
          <Button type="button" variant="tertiary" className="nc-exit" onClick={() => navigate('/')}>
            Save and exit
          </Button>
        </div>
        <div className="nc-stage-row">
          <p className="nc-stage-label">Introduction</p>
          <p className="nc-save" role="status">
            {saveLabel}
          </p>
        </div>
      </header>
      <main className="nc-main">
        {booting ? <Spinner label="Opening your introduction" /> : null}
        {!booting && !state && error ? (
          <Alert tone="danger" title="We couldn’t open this introduction">
            {error}
          </Alert>
        ) : null}
        {state && !open ? (
          <section className="nc-focus">
            <p className="nc-eyebrow">Introduction</p>
            <h1 ref={heading} tabIndex={-1}>
              {state.intake.status === 'awaiting_review'
                ? 'Your idea is ready for our review.'
                : state.intake.status === 'invited'
                  ? 'You’re invited into deeper discovery.'
                  : state.intake.status === 'on_hold'
                    ? 'This is on hold.'
                    : state.intake.status === 'declined'
                      ? 'We’re not the right fit for this one.'
                      : 'Your introduction is with our team.'}
            </h1>
            <p className="nc-support">
              {state.intake.status === 'awaiting_review'
                ? 'We’ll review the fit before opening deeper discovery.'
                : state.intake.stage2_unlocked
                  ? 'Deeper discovery is approved. That next conversation is not built yet.'
                  : 'The next conversation stays closed until someone at Thornvine reviews the fit.'}
            </p>
            {state.intake.status === 'awaiting_review' ? <p className="nc-status">Awaiting Thornvine review.</p> : null}
            {state.intake.client_message ? <p className="nc-note">{state.intake.client_message}</p> : null}
          </section>
        ) : null}
        {state && open ? (
          <section className="nc-focus" aria-busy={busy}>
            <div className="nc-question">
              <p className="nc-eyebrow">{copy.eyebrow}</p>
              <h1 ref={heading} tabIndex={-1}>
                {copy.title}
              </h1>
              {revising ? (
                <p className="nc-support">Update this, then choose Next. You’ll come back to where you were.</p>
              ) : copy.support ? (
                <p className="nc-support">{copy.support}</p>
              ) : null}
            </div>
            {state.intake.client_message ? <p className="nc-note">{state.intake.client_message}</p> : null}
            {busy ? <Spinner size="sm" label="" /> : null}
            {showSummary ? (
              <Summary key={state.messages.length} fields={fields} disabled={busy} onReview={(correction) => void sendForReview(correction)} />
            ) : null}
            {showChoices && widget ? (
              <IntakeWidget
                key={revising ?? lastAssistant?.id}
                widget={widget}
                fields={fields}
                disabled={busy}
                onNext={registerNext}
                onCommit={(text, value) => void commit(text, value)}
              />
            ) : null}
            {showComposer ? (
              <form className="nc-composer" onSubmit={onSubmit}>
                <TextArea
                  ref={composer}
                  label="Your answer"
                  hideLabel
                  rows={6}
                  value={answerDraft}
                  disabled={busy}
                  placeholder={copy.placeholder}
                  onChange={(event) => {
                    if (revising) setRevisionDraft(event.target.value)
                    else setDraft(event.target.value)
                    resizeComposer(event.target)
                  }}
                  onKeyDown={onKeyDown}
                />
                {references}
              </form>
            ) : (
              references
            )}
            {showComposer && copy.hint ? <p className="nc-hint">{copy.hint}</p> : null}
            {showComposer || showChoices || backTarget || revising ? (
              <div className="nc-nav">
                <div className="nc-nav-start">
                  {backTarget ? (
                    <Button
                      type="button"
                      variant="secondary"
                      iconStart={<Icon name="arrow-left" />}
                      disabled={busy}
                      onClick={() => openAnswer(backTarget)}
                    >
                      Back
                    </Button>
                  ) : null}
                  {revising ? (
                    <Button type="button" variant="secondary" disabled={busy} onClick={() => setRevising(null)}>
                      Return
                    </Button>
                  ) : null}
                </div>
                {showComposer || showChoices ? (
                  <div className="nc-nav-end">
                    <Button
                      type="button"
                      variant={nextDisabled ? 'secondary' : 'primary'}
                      disabled={nextDisabled}
                      onClick={() => {
                        if (showComposer) void commit(answerDraft)
                        else nextRun.current?.()
                      }}
                    >
                      Next
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}
            {error ? (
              <Alert tone="danger" title="Something snagged">
                {error}
              </Alert>
            ) : null}
            {demo ? <p className="nc-notice">This introduction saves your answers for our team to review.</p> : null}
          </section>
        ) : null}
      </main>
      <svg className="nc-botanical" viewBox="0 0 160 220" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M86 210c8-38 6-78-8-112" />
          <path d="M78 168c-22-6-36-2-48 12 18 2 32-2 48-12Z" />
          <path d="M80 142c18-10 34-6 46 8-16 6-30 4-46-8Z" />
          <path d="M76 112c-18-12-28-8-36 6 14 4 26 2 36-6Z" />
          <path d="M74 86c16-14 30-10 40 6-14 8-26 6-40-6Z" />
          <path d="M70 64c-12-16-16-28-8-40 10 14 12 26 8 40Z" />
          <path d="M78 98c22-4 34 6 38 22" />
        </g>
      </svg>
    </div>
  )
}

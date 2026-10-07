import { useLayoutEffect, useState } from 'react'
import { Button, Icon, TextArea, TextField, type IconName } from '../../design-system'
import { FIELD_LABEL } from './questionCopy'
import type { FieldKey, FieldRecord, FieldValue, Widget } from './orchestrator'

export type NextBinder = (action: (() => void) | null, disabled: boolean) => void

type Props = {
  widget: Widget
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: (text: string, value: FieldValue) => void
  onReview?: (correction: string | null) => void
}

function useRegisterNext(onNext: NextBinder | undefined, action: () => void, blocked: boolean) {
  useLayoutEffect(() => {
    onNext?.(() => action(), blocked)
  }, [onNext, action, blocked])
}

export function IntakeWidget({ widget, fields, disabled, onNext, onCommit, onReview }: Props) {
  if (widget.type === 'text') return null
  if (widget.type === 'chips' || widget.type === 'cards') {
    return <Choices widget={widget} fields={fields} disabled={disabled} onNext={onNext} onCommit={onCommit} />
  }
  if (widget.type === 'investment') return <Investment fields={fields} disabled={disabled} onNext={onNext} onCommit={onCommit} />
  if (widget.type === 'timing') return <Timing fields={fields} disabled={disabled} onNext={onNext} onCommit={onCommit} />
  if (widget.type === 'boundaries') return <Boundaries fields={fields} disabled={disabled} onNext={onNext} onCommit={onCommit} />
  if (widget.type === 'contact') return <Contact fields={fields} disabled={disabled} onNext={onNext} onCommit={onCommit} />
  return <Summary fields={fields} disabled={disabled} onReview={onReview} />
}

function fieldValue(fields: FieldRecord[], key: FieldKey) {
  return fields.find((field) => field.key === key)?.value
}

function optionIcon(id: string): IconName {
  if (/customer|team|community|business|user|people/.test(id)) return 'user'
  if (/unsure|help|discuss|explor/.test(id)) return 'info'
  return 'leaf'
}

function Choices({
  widget,
  fields,
  disabled,
  onNext,
  onCommit,
}: {
  widget: Extract<Widget, { type: 'chips' | 'cards' }>
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: Props['onCommit']
}) {
  const existing = fieldValue(fields, widget.field)
  const initial = Array.isArray(existing?.ids)
    ? existing.ids.map(String)
    : typeof existing?.id === 'string' && existing.id
      ? [existing.id]
      : typeof existing?.chip === 'string' && existing.chip
        ? [existing.chip]
        : []
  const [picked, setPicked] = useState<string[]>(initial)
  const [otherNote, setOtherNote] = useState('')
  function toggle(id: string) {
    setPicked((current) => {
      if (!widget.multiple) return current[0] === id ? current : [id]
      if (id === 'unsure') return current.length === 1 && current[0] === 'unsure' ? [] : ['unsure']
      const rest = current.filter((item) => item !== 'unsure')
      return rest.includes(id) ? rest.filter((item) => item !== id) : [...rest, id]
    })
  }
  const labels = widget.options.filter((option) => picked.includes(option.id)).map((option) => option.label)
  const answerText = otherNote.trim() && picked.includes('other') ? `${labels.join(', ')}. ${otherNote.trim()}` : labels.join(', ')
  useRegisterNext(
    onNext,
    () =>
      onCommit(answerText, {
        ids: picked,
        id: picked[0] ?? '',
        choice: picked[0] ?? '',
        confirm: picked[0] ?? '',
        text: answerText,
      }),
    Boolean(disabled) || picked.length === 0,
  )
  return (
    <div className="nc-widget">
      <div
        className={widget.type === 'cards' ? `nc-cards${widget.options.length > 6 ? ' nc-cards--stack' : ''}` : 'nc-chips'}
        role="group"
        aria-label={widget.multiple ? 'Answer choices, choose any that fit' : 'Answer choices'}
      >
        {widget.options.map((option) => {
          const selected = picked.includes(option.id)
          return (
            <Button
              key={option.id}
              variant="secondary"
              aria-pressed={selected}
              className={selected ? 'nc-choice nc-choice--on' : 'nc-choice'}
              disabled={disabled}
              iconStart={<Icon name={selected ? 'check' : optionIcon(option.id)} />}
              onClick={() => toggle(option.id)}
            >
              {option.label}
            </Button>
          )
        })}
      </div>
      {picked.includes('other') ? (
        <TextField
          label="Tell us a bit more"
          value={otherNote}
          placeholder="A sentence is plenty."
          onChange={(event) => setOtherNote(event.target.value)}
        />
      ) : null}
    </div>
  )
}

function Investment({
  fields,
  disabled,
  onNext,
  onCommit,
}: {
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: Props['onCommit']
}) {
  const existing = fieldValue(fields, 'investment')
  const stored = existing?.choice === 'range' || existing?.choice === 'help' || existing?.choice === 'discuss' ? existing.choice : ''
  const [choice, setChoice] = useState<'range' | 'help' | 'discuss' | ''>(stored)
  const [min, setMin] = useState(typeof existing?.min === 'string' ? existing.min : '')
  const [max, setMax] = useState(typeof existing?.max === 'string' ? existing.max : '')
  const [currency, setCurrency] = useState(typeof existing?.currency === 'string' ? existing.currency : 'USD')
  const [covers, setCovers] = useState(typeof existing?.covers === 'string' ? existing.covers : 'initial')
  const options = [
    ['range', 'I have a range'],
    ['help', 'Not sure yet'],
    ['discuss', "Let's discuss it"],
  ] as const
  const blocked = Boolean(disabled) || !choice || (choice === 'range' && (!min || !max))
  useRegisterNext(
    onNext,
    () =>
      onCommit(
        choice === 'range' ? `${min}–${max} ${currency}, covering ${covers}` : choice === 'help' ? 'Not sure yet' : "Let's discuss it",
        { choice, min, max, currency, covers, text: choice === 'help' ? 'Not sure yet' : choice },
      ),
    blocked,
  )
  return (
    <div className="nc-widget">
      <div className="nc-cards" role="group" aria-label="Investment">
        {options.map(([id, label]) => (
          <Button
            key={id}
            variant="secondary"
            aria-pressed={choice === id}
            className={choice === id ? 'nc-choice nc-choice--on' : 'nc-choice'}
            disabled={disabled}
            iconStart={<Icon name={choice === id ? 'check' : id === 'help' ? 'info' : 'leaf'} />}
            onClick={() => setChoice(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      {choice === 'range' ? (
        <div className="nc-split">
          <TextField label="From" inputMode="decimal" value={min} onChange={(event) => setMin(event.target.value)} />
          <TextField label="To" inputMode="decimal" value={max} onChange={(event) => setMax(event.target.value)} />
          <TextField label="Currency" value={currency} onChange={(event) => setCurrency(event.target.value)} />
          <TextField label="Covers" hint="Initial build, ongoing support, or both." value={covers} onChange={(event) => setCovers(event.target.value)} />
        </div>
      ) : null}
    </div>
  )
}

function Timing({
  fields,
  disabled,
  onNext,
  onCommit,
}: {
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: Props['onCommit']
}) {
  const existing = fieldValue(fields, 'timing')
  const stored = existing?.choice === 'exploring' || existing?.choice === 'months' || existing?.choice === 'date' || existing?.choice === 'help' ? existing.choice : ''
  const [choice, setChoice] = useState<'exploring' | 'months' | 'date' | 'help' | ''>(stored)
  const [date, setDate] = useState(typeof existing?.date === 'string' ? existing.date : '')
  const [driver, setDriver] = useState(typeof existing?.driver === 'string' ? existing.driver : '')
  const [flexible, setFlexible] = useState(typeof existing?.flexible === 'string' ? existing.flexible : 'some room')
  const options = [
    ['exploring', 'Exploring for now'],
    ['months', 'In the next few months'],
    ['date', 'A specific date'],
    ['help', 'Not sure yet'],
  ] as const
  useRegisterNext(
    onNext,
    () => {
      const text =
        choice === 'date' ? `${date}. ${driver}. Flexibility: ${flexible}` : choice === 'months' ? 'In the next few months' : choice === 'help' ? 'Not sure yet' : 'Exploring for now'
      onCommit(text, { choice, date, driver, flexible, text })
    },
    Boolean(disabled) || !choice || (choice === 'date' && !date),
  )
  return (
    <div className="nc-widget">
      <div className="nc-cards" role="group" aria-label="Timing">
        {options.map(([id, label]) => (
          <Button
            key={id}
            variant="secondary"
            aria-pressed={choice === id}
            className={choice === id ? 'nc-choice nc-choice--on' : 'nc-choice'}
            disabled={disabled}
            iconStart={<Icon name={choice === id ? 'check' : 'leaf'} />}
            onClick={() => setChoice(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      {choice === 'date' ? (
        <div className="nc-split">
          <TextField label="Date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <TextField label="Why that date" value={driver} onChange={(event) => setDriver(event.target.value)} />
          <TextField label="Flexibility" value={flexible} onChange={(event) => setFlexible(event.target.value)} />
        </div>
      ) : null}
    </div>
  )
}

function Boundaries({
  fields,
  disabled,
  onNext,
  onCommit,
}: {
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: Props['onCommit']
}) {
  const existing = fieldValue(fields, 'boundaries')
  const [text, setText] = useState(typeof existing?.text === 'string' ? existing.text : '')
  useRegisterNext(onNext, () => onCommit(text.trim(), { text: text.trim(), none: false }), Boolean(disabled) || !text.trim())
  return (
    <div className="nc-widget">
      <TextArea label="Boundaries" placeholder="Must-haves, limits, or a curveball..." value={text} onChange={(event) => setText(event.target.value)} rows={5} />
      <Button variant="tertiary" disabled={disabled} onClick={() => onCommit('Nothing comes to mind', { text: '', none: true })}>
        Nothing comes to mind
      </Button>
    </div>
  )
}

function Contact({
  fields,
  disabled,
  onNext,
  onCommit,
}: {
  fields: FieldRecord[]
  disabled?: boolean
  onNext?: NextBinder
  onCommit: Props['onCommit']
}) {
  const existing = fieldValue(fields, 'contact')
  const [name, setName] = useState(typeof existing?.name === 'string' ? existing.name : '')
  const [email, setEmail] = useState(typeof existing?.email === 'string' ? existing.email : '')
  const [company, setCompany] = useState(typeof existing?.company === 'string' ? existing.company : '')
  useRegisterNext(
    onNext,
    () =>
      onCommit(`${name.trim()}${company.trim() ? `, ${company.trim()}` : ''} · ${email.trim()}`, {
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        text: name.trim(),
      }),
    Boolean(disabled) || !name.trim() || !email.includes('@'),
  )
  return (
    <div className="nc-widget">
      <TextField label="Name" required value={name} onChange={(event) => setName(event.target.value)} />
      <TextField label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <TextField label="Company or project" value={company} onChange={(event) => setCompany(event.target.value)} />
    </div>
  )
}

export function Summary({
  fields,
  disabled,
  onReview,
}: {
  fields: FieldRecord[]
  disabled?: boolean
  onReview?: (correction: string | null) => void
}) {
  const rows = fields.filter((field) => field.key !== 'summary' && field.status !== 'not_discussed')
  const [edits, setEdits] = useState<Record<string, string>>(() =>
    Object.fromEntries(rows.map((field) => [field.key, summarize(field)])),
  )
  const correction = rows
    .map((field) => {
      const next = (edits[field.key] ?? '').trim()
      const original = summarize(field).trim()
      if (next === original) return null
      return `${FIELD_LABEL[field.key]}: ${next || 'Cleared'}`
    })
    .filter((line): line is string => Boolean(line))
    .join('\n')
  return (
    <div className="nc-widget">
      <ul className="nc-review-list">
        {rows.map((field) => (
          <li key={field.key}>
            <TextField
              label={FIELD_LABEL[field.key]}
              value={edits[field.key] ?? ''}
              onChange={(event) => setEdits((current) => ({ ...current, [field.key]: event.target.value }))}
            />
          </li>
        ))}
      </ul>
      <Button variant="primary" disabled={disabled} onClick={() => onReview?.(correction || null)}>
        Send for review
      </Button>
    </div>
  )
}

function summarize(field: FieldRecord): string {
  const value = field.value
  if (typeof value.text === 'string' && value.text && value.text !== 'confirmed') return value.text
  if (typeof value.name === 'string' && value.name) {
    const email = typeof value.email === 'string' ? value.email : ''
    const company = typeof value.company === 'string' ? value.company : ''
    return [value.name, company, email].filter(Boolean).join(' · ')
  }
  if (Array.isArray(value.ids) && value.ids.length) return value.ids.join(', ')
  if (typeof value.choice === 'string' && value.choice) {
    if (value.choice === 'help') return 'Not sure yet'
    if (value.choice === 'range' && value.min && value.max) return `${value.min}–${value.max} ${value.currency ?? ''}`.trim()
    return value.choice
  }
  if (typeof value.id === 'string' && value.id) return value.id
  if (value.none === true) return 'Nothing comes to mind'
  if (field.status === 'not_discussed') return 'Not discussed'
  return field.status.replaceAll('_', ' ')
}

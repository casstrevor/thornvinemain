export const FIELD_KEYS = [
  'idea',
  'motivation',
  'audience',
  'purpose',
  'outcome',
  'starting_point',
  'requested_help',
  'involvement',
  'investment',
  'timing',
  'decision_makers',
  'boundaries',
  'contact',
  'summary',
] as const

export type FieldKey = (typeof FIELD_KEYS)[number]

export const REQUIRED_KEYS = ['idea', 'audience', 'purpose', 'outcome'] as const

export type FieldStatus = 'not_discussed' | 'client_stated' | 'inferred' | 'unknown' | 'confirmed'

export type FieldValue = Record<string, string | string[] | boolean | number | null>

export type FieldRecord = {
  key: FieldKey
  status: FieldStatus
  value: FieldValue
}

export type WidgetOption = { id: string; label: string }

export type Widget =
  | { type: 'text'; field: FieldKey }
  | { type: 'chips' | 'cards'; field: FieldKey; multiple: boolean; options: WidgetOption[] }
  | { type: 'investment' }
  | { type: 'timing' }
  | { type: 'contact' }
  | { type: 'summary' }
  | { type: 'boundaries' }

export type FieldUpdate = {
  key: FieldKey
  status: FieldStatus
  value: FieldValue
}

export type Proposal = {
  message: string
  fields: FieldUpdate[]
  widget: Widget | null
  readyForReview: boolean
  mode: 'demo' | 'model'
  gaps: FieldKey[]
}

const UNKNOWN =
  /\b(not sure|don'?t know|do not know|help me figure|no idea|nothing comes to mind|let'?s discuss|lets discuss|skip for now)\b/i

const CONFIRM = /\b(looks right|that'?s (right|it)|feels like|yes,? that|confirm|this is it|send it)\b/i

export function blankFields(): FieldRecord[] {
  return FIELD_KEYS.map((key) => ({ key, status: 'not_discussed', value: {} }))
}

export function canSubmit(fields: FieldRecord[]): { ok: boolean; gaps: FieldKey[] } {
  const gaps: FieldKey[] = []
  for (const field of fields) {
    if (REQUIRED_KEYS.includes(field.key as (typeof REQUIRED_KEYS)[number])) {
      if (field.status !== 'client_stated' && field.status !== 'confirmed') gaps.push(field.key)
      continue
    }
    if (field.key === 'summary') {
      if (field.status !== 'confirmed') gaps.push(field.key)
      continue
    }
    if (field.key === 'contact') {
      const name = String(field.value.name ?? '').trim()
      const email = String(field.value.email ?? '').trim()
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) gaps.push(field.key)
      continue
    }
    if (field.status === 'not_discussed') gaps.push(field.key)
  }
  return { ok: gaps.length === 0, gaps }
}

export function validateProposal(proposal: Proposal): string | null {
  if (!proposal.message?.trim()) return 'The assistant message is empty.'
  if (proposal.message.length > 4000) return 'The assistant message is too long.'
  const types = new Set(['text', 'chips', 'cards', 'investment', 'timing', 'contact', 'summary', 'boundaries'])
  if (proposal.widget && !types.has(proposal.widget.type)) return 'That widget is not in the registry.'
  for (const update of proposal.fields) {
    if (!FIELD_KEYS.includes(update.key)) return 'Unknown field.'
    if (!['not_discussed', 'client_stated', 'inferred', 'unknown', 'confirmed'].includes(update.status)) {
      return 'Unknown field status.'
    }
  }
  return null
}

function byKey(fields: FieldRecord[]) {
  return new Map(fields.map((field) => [field.key, field]))
}

function needsWork(field: FieldRecord): boolean {
  if (field.key === 'summary' || field.key === 'contact') return false
  if (field.status === 'not_discussed') return true
  if (field.status === 'inferred' && REQUIRED_KEYS.includes(field.key as (typeof REQUIRED_KEYS)[number])) return true
  return false
}

function nextFocus(fields: FieldRecord[]): FieldKey | 'submit' {
  const map = byKey(fields)
  const open = FIELD_KEYS.find((key) => needsWork(map.get(key)!))
  if (open) return open
  const summary = map.get('summary')!
  if (summary.status !== 'confirmed') return 'summary'
  const contact = map.get('contact')!
  const name = String(contact.value.name ?? '').trim()
  const email = String(contact.value.email ?? '').trim()
  if (contact.status === 'not_discussed' || !name || !email.includes('@')) return 'contact'
  return 'submit'
}

function widgetFor(key: FieldKey, confirming: boolean): Widget | null {
  if (confirming) {
    return {
      type: 'chips',
      field: key,
      multiple: false,
      options: [
        { id: 'yes', label: 'Yes, that’s right' },
        { id: 'no', label: 'Not quite' },
      ],
    }
  }
  switch (key) {
    case 'motivation':
      return {
        type: 'cards',
        field: key,
        multiple: true,
        options: [
          { id: 'better-way', label: 'A problem we keep running into' },
          { id: 'busywork', label: 'Too much manual work' },
          { id: 'nothing-fits', label: 'Existing tools don’t meet our needs' },
          { id: 'asking', label: 'Requests from customers or our team' },
          { id: 'outgrown', label: 'We’ve outgrown our current setup' },
          { id: 'opportunity', label: 'An opportunity for a new business' },
          { id: 'inspired', label: 'Inspiration from something we’ve seen' },
          { id: 'idea', label: 'An idea we want to explore' },
          { id: 'other', label: 'Something else' },
          { id: 'unsure', label: 'Not sure yet' },
        ],
      }
    case 'audience':
      return {
        type: 'cards',
        field: key,
        multiple: true,
        options: [
          { id: 'team', label: 'Our team' },
          { id: 'customers', label: 'Our customers' },
          { id: 'businesses', label: 'Other businesses' },
          { id: 'community', label: 'A community' },
          { id: 'someone', label: 'Someone else' },
        ],
      }
    case 'purpose':
      return {
        type: 'cards',
        field: key,
        multiple: false,
        options: [
          { id: 'internal', label: 'Our own business' },
          { id: 'customers', label: 'Our customers' },
          { id: 'venture', label: 'A new venture' },
          { id: 'unsure', label: 'Not sure yet' },
        ],
      }
    case 'starting_point':
      return {
        type: 'cards',
        field: key,
        multiple: true,
        options: [
          { id: 'idea', label: 'An idea' },
          { id: 'designs', label: 'Sketches or designs' },
          { id: 'product', label: 'An existing product' },
          { id: 'content', label: 'Content or data' },
          { id: 'brand', label: 'Branding' },
        ],
      }
    case 'requested_help':
      return {
        type: 'cards',
        field: key,
        multiple: true,
        options: [
          { id: 'shape', label: 'Shape the idea' },
          { id: 'design', label: 'Design it' },
          { id: 'build', label: 'Build it' },
          { id: 'ai', label: 'Add AI or automation' },
          { id: 'brand', label: 'Branding' },
          { id: 'launch', label: 'Launch support' },
          { id: 'decide', label: 'Help me decide' },
        ],
      }
    case 'involvement':
      return {
        type: 'cards',
        field: key,
        multiple: false,
        options: [
          { id: 'hands-on', label: 'Hands-on' },
          { id: 'milestones', label: 'Involved at milestones' },
          { id: 'leave-it', label: 'Mostly leave it to us' },
          { id: 'unsure', label: 'Not sure yet' },
        ],
      }
    case 'investment':
      return { type: 'investment' }
    case 'timing':
      return { type: 'timing' }
    case 'decision_makers':
      return {
        type: 'cards',
        field: key,
        multiple: false,
        options: [
          { id: 'me', label: 'Just me' },
          { id: 'partner', label: 'Me and a partner' },
          { id: 'team', label: 'A wider team' },
        ],
      }
    case 'boundaries':
      return { type: 'boundaries' }
    case 'contact':
      return { type: 'contact' }
    case 'summary':
      return { type: 'summary' }
    case 'idea':
    case 'outcome':
      return { type: 'text', field: key }
    default:
      return null
  }
}

export function questionWidget(key: FieldKey): Widget | null {
  return widgetFor(key, false)
}

export function previousAnswer(fields: { key: FieldKey; status: FieldStatus }[], key: FieldKey | null): FieldKey | null {
  if (!key) return null
  const index = FIELD_KEYS.indexOf(key)
  for (let i = index - 1; i >= 0; i -= 1) {
    const candidate = FIELD_KEYS[i]
    if (candidate === 'summary') continue
    const field = fields.find((item) => item.key === candidate)
    if (field && field.status !== 'not_discussed') return candidate
  }
  return null
}

export function activeWidget(stored: Widget | null): Widget | null {
  if (!stored || (stored.type !== 'chips' && stored.type !== 'cards')) return stored
  const confirming = stored.options.length > 0 && stored.options.every((option) => option.id === 'yes' || option.id === 'no')
  if (confirming) return stored
  return widgetFor(stored.field, false) ?? stored
}

export function widgetFocus(widget: Widget | null): FieldKey | null {
  if (!widget) return null
  if (widget.type === 'investment') return 'investment'
  if (widget.type === 'timing') return 'timing'
  if (widget.type === 'contact') return 'contact'
  if (widget.type === 'summary') return 'summary'
  if (widget.type === 'boundaries') return 'boundaries'
  return widget.field
}

const QUESTION: Record<FieldKey, string> = {
  idea: "What's been growing in your imagination?",
  motivation: 'What sparked it?',
  audience: "Who's this for?",
  purpose: "What's this for?",
  outcome: "What's different when this is working beautifully?",
  starting_point: 'What are we starting with?',
  requested_help: 'Where would you like us to jump in?',
  involvement: 'Which parts are you excited to stay hands-on with?',
  investment: "What would you like to invest?",
  timing: 'When are you hoping to bring this to life?',
  decision_makers: "Who's bringing this to life with you?",
  boundaries: 'Anything we should know before we get started?',
  contact: 'Who should we reach?',
  summary: "Here's the picture we've put together.",
}

function harvest(text: string, fields: Map<FieldKey, FieldRecord>, skip: FieldKey | null): FieldUpdate[] {
  const updates: FieldUpdate[] = []
  const take = (key: FieldKey, value: FieldValue, status: FieldStatus = 'inferred') => {
    if (key === skip) return
    const current = fields.get(key)
    if (!current || current.status !== 'not_discussed') return
    updates.push({ key, status, value })
    fields.set(key, { key, status, value })
  }
  const lower = text.toLowerCase()
  if (/\bcustomers?\b/.test(lower)) take('audience', { ids: ['customers'], text })
  else if (/\b(our team|internal team)\b/.test(lower)) take('audience', { ids: ['team'], text })
  else if (/\bcommunity\b/.test(lower)) take('audience', { ids: ['community'], text })
  else if (/\b(other businesses|b2b)\b/.test(lower)) take('audience', { ids: ['businesses'], text })

  if (/\bnew venture\b/.test(lower)) take('purpose', { id: 'venture', text })
  else if (/\bcustomers? would use\b/.test(lower)) take('purpose', { id: 'customers', text }, 'client_stated')
  else if (/\b(internal|our own business)\b/.test(lower)) take('purpose', { id: 'internal', text })

  const help: string[] = []
  if (/\bdesign\b/.test(lower)) help.push('design')
  if (/\bbuild\b/.test(lower)) help.push('build')
  if (/\bbrand/.test(lower)) help.push('brand')
  if (/\b(ai|automation)\b/.test(lower)) help.push('ai')
  if (/\blaunch\b/.test(lower)) help.push('launch')
  if (help.length) take('requested_help', { ids: help, text }, 'client_stated')

  if (/\bnext few months\b/.test(lower)) take('timing', { choice: 'months', text }, 'client_stated')
  else if (/\bexplor/.test(lower)) take('timing', { choice: 'exploring', text }, 'client_stated')

  if (UNKNOWN.test(text) && /\b(invest|budget|range|cost)\b/.test(lower)) {
    take('investment', { choice: 'help', text }, 'unknown')
  }
  if (/\bfrustrating\b/.test(lower)) take('motivation', { ids: ['better-way'], text }, 'client_stated')
  if (/\bhands-on\b/.test(lower)) take('involvement', { id: 'hands-on', text }, 'client_stated')
  if (/\bjust me\b/.test(lower)) take('decision_makers', { choice: 'me', text }, 'client_stated')
  if (/\bnothing comes to mind\b/.test(lower)) take('boundaries', { none: true, text: '' }, 'unknown')
  return updates
}

function answerFocus(
  focus: FieldKey,
  text: string,
  widgetValue: FieldValue | null,
  current: FieldRecord,
): FieldUpdate | 'clarify' {
  if (widgetValue && Object.keys(widgetValue).length > 0) {
    if (focus === 'summary') {
      if (widgetValue.confirmed === true || widgetValue.confirmed === 'true') {
        return { key: focus, status: 'confirmed', value: { ...current.value, ...widgetValue, confirmed: true } }
      }
      return { key: focus, status: 'client_stated', value: { ...current.value, ...widgetValue, confirmed: false } }
    }
    if (current.status === 'inferred' && widgetValue.confirm === 'yes') {
      return { key: focus, status: 'confirmed', value: current.value }
    }
    if (current.status === 'inferred' && widgetValue.confirm === 'no') {
      return { key: focus, status: 'not_discussed', value: {} }
    }
    const status: FieldStatus =
      widgetValue.choice === 'help' || widgetValue.choice === 'discuss' || widgetValue.none === true
        ? 'unknown'
        : 'client_stated'
    return { key: focus, status, value: { ...widgetValue, text } }
  }

  const trimmed = text.trim()
  if (!trimmed) return 'clarify'
  if (focus !== 'idea' && focus !== 'outcome' && focus !== 'summary' && UNKNOWN.test(trimmed) && trimmed.length < 80) {
    return { key: focus, status: 'unknown', value: { text: trimmed } }
  }
  if (focus === 'idea' && trimmed.length < 12) return 'clarify'
  if (focus === 'summary') {
    if (CONFIRM.test(trimmed)) return { key: focus, status: 'confirmed', value: { ...current.value, confirmed: true } }
    return { key: focus, status: 'client_stated', value: { corrections: trimmed, confirmed: false } }
  }
  if (current.status === 'inferred') {
    if (CONFIRM.test(trimmed)) return { key: focus, status: 'confirmed', value: current.value }
    return { key: focus, status: 'client_stated', value: { text: trimmed } }
  }
  return { key: focus, status: 'client_stated', value: { text: trimmed } }
}

export function proposeTurn(input: {
  fields: FieldRecord[]
  clientText: string
  widgetValue?: FieldValue | null
  focus: FieldKey | null
}): Proposal {
  const fields = input.fields.length ? input.fields.map((field) => ({ ...field, value: { ...field.value } })) : blankFields()
  const map = byKey(fields)
  const focus = input.focus ?? nextFocus(fields)
  const updates: FieldUpdate[] = []

  if (focus !== 'submit') {
    const answered = answerFocus(focus, input.clientText, input.widgetValue ?? null, map.get(focus)!)
    if (answered === 'clarify') {
      return {
        message:
          focus === 'idea'
            ? 'Tell me a little more about what you’d like to create or improve.'
            : 'Could you say a bit more about that? A rough answer is plenty.',
        fields: [],
        widget: widgetFor(focus, false),
        readyForReview: false,
        mode: 'demo',
        gaps: canSubmit(fields).gaps,
      }
    }
    updates.push(answered)
    map.set(answered.key, { key: answered.key, status: answered.status, value: answered.value })
    if (answered.status === 'not_discussed') {
      return finish(map, updates, answered.key, 'No problem. Let’s try that another way.')
    }
  }

  updates.push(...harvest(input.clientText, map, focus === 'submit' ? null : focus))
  const following = nextFocus([...map.values()])
  if (following === 'submit') {
    const ready = canSubmit([...map.values()])
    return {
      message: ready.ok
        ? 'Send this to Thornvine when it feels right. A person on our team will read it.'
        : 'A few pieces still need a clearer answer before we can send this for review.',
      fields: updates,
      widget: null,
      readyForReview: ready.ok,
      mode: 'demo',
      gaps: ready.gaps,
    }
  }
  const confirming = map.get(following)!.status === 'inferred'
  const lead = confirming
    ? `I noted this for ${label(following)}, and I want to check it with you before treating it as settled.`
    : QUESTION[following]
  return finish(map, updates, following, lead, confirming)
}

function finish(
  map: Map<FieldKey, FieldRecord>,
  updates: FieldUpdate[],
  focus: FieldKey,
  message: string,
  confirming = false,
): Proposal {
  const ready = canSubmit([...map.values()])
  return {
    message,
    fields: updates,
    widget: widgetFor(focus, confirming),
    readyForReview: ready.ok,
    mode: 'demo',
    gaps: ready.gaps,
  }
}

function label(key: FieldKey): string {
  return key.replaceAll('_', ' ')
}

export function openingMessage(): string {
  return QUESTION.idea
}

export function advisoryFit(fields: FieldRecord[]): string {
  const idea = fields.find((field) => field.key === 'idea')
  const text = String(idea?.value.text ?? 'This opportunity')
  return `Advisory only: Stage 1 has a first picture of “${text.slice(0, 140)}”. It is not a fit decision, an estimate, or an acceptance to build.`
}

export function clientSnapshot(fields: FieldRecord[], contact: { name: string; email: string; company: string }) {
  return {
    stage: 1,
    fields: fields.map((field) => ({
      key: field.key,
      status: field.status,
      value: field.value,
    })),
    contact,
  }
}

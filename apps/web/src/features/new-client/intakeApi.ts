import { supabase } from '../../lib/supabase'
import {
  blankFields,
  proposeTurn,
  validateProposal,
  type FieldKey,
  type FieldRecord,
  type FieldStatus,
  type FieldValue,
  type Proposal,
  type Widget,
} from './orchestrator'

export type IntakeStatus =
  | 'draft'
  | 'awaiting_review'
  | 'clarification'
  | 'invited'
  | 'on_hold'
  | 'declined'

export type IntakeState = {
  intake: {
    id: string
    status: IntakeStatus
    stage: number
    stage2_unlocked: boolean
    contact_name: string | null
    contact_email: string | null
    company_name: string | null
    client_message: string | null
    created_at: string
    updated_at: string
    submitted_at: string | null
  }
  messages: {
    id: string
    role: 'client' | 'assistant'
    body: string
    widget: Widget | null
    created_at: string
  }[]
  fields: { key: FieldKey; status: FieldStatus; value: FieldValue; source_message_id: string | null }[]
  submissions: { id: string; version: number; snapshot: Record<string, unknown>; created_at: string }[]
  references: {
    id: string
    kind: 'link' | 'file'
    label: string | null
    url: string | null
    storage_path: string | null
    created_at: string
  }[]
  reviews: {
    id: string
    submission_id: string
    reviewer_id: string
    decision: string
    internal_notes: string | null
    client_message: string | null
    stage2_direction: string | null
    created_at: string
  }[]
}

export type IntakeListItem = {
  id: string
  status: IntakeStatus
  contact_name: string | null
  company_name: string | null
  submitted_at: string | null
  created_at: string
  summary: string
}

function asState(data: unknown): IntakeState {
  return data as IntakeState
}

export function mergeFields(rows: IntakeState['fields']): FieldRecord[] {
  const known = new Map(rows.map((row) => [row.key, row]))
  return blankFields().map((field) => {
    const row = known.get(field.key)
    return row ? { key: field.key, status: row.status, value: row.value ?? {} } : field
  })
}

export async function ensureIntakeSession() {
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session
  const created = await supabase.auth.signInAnonymously()
  if (created.error || !created.data.session) {
    throw new Error(
      created.error?.message ??
        'This conversation needs an anonymous session. Enable anonymous sign-ins on the Thornvine Supabase project.',
    )
  }
  return created.data.session
}

export async function startIntake() {
  const { data, error } = await supabase.rpc('intake_start')
  if (error) throw new Error(error.message)
  return asState(data)
}

export async function loadIntake(intakeId: string) {
  const { data, error } = await supabase.rpc('intake_state', { p_intake_id: intakeId })
  if (error) throw new Error(error.message)
  return asState(data)
}

export async function listIntakes() {
  const { data, error } = await supabase.rpc('intake_list')
  if (error) throw new Error(error.message)
  return (data ?? []) as IntakeListItem[]
}

export async function sendTurn(input: {
  intakeId: string
  turnKey: string
  body: string
  fields: FieldRecord[]
  focus: FieldKey | null
  widgetValue?: FieldValue | null
}) {
  let proposal: Proposal = proposeTurn({
    fields: input.fields,
    clientText: input.body,
    widgetValue: input.widgetValue,
    focus: input.focus,
  })
  let demo = true
  try {
    const remote = await supabase.functions.invoke('intake-turn', {
      body: {
        fields: input.fields,
        clientText: input.body,
        widgetValue: input.widgetValue ?? null,
        focus: input.focus,
      },
    })
    const payload = remote.data as { mode?: string; proposal?: Proposal } | null
    if (!remote.error && payload?.mode === 'model' && payload.proposal && !validateProposal(payload.proposal)) {
      proposal = { ...payload.proposal, mode: 'model' }
      demo = false
    }
  } catch {
    demo = true
  }
  const invalid = validateProposal(proposal)
  if (invalid) throw new Error(invalid)
  const { data, error } = await supabase.rpc('intake_apply_turn', {
    p_intake_id: input.intakeId,
    p_turn_key: input.turnKey,
    p_body: input.body,
    p_proposal: proposal as unknown as Record<string, never>,
  })
  if (error) throw new Error(error.message)
  return { state: asState(data), demo }
}

export async function submitIntake(intakeId: string) {
  const { data, error } = await supabase.rpc('intake_submit', { p_intake_id: intakeId })
  if (error) throw new Error(error.message)
  return asState(data)
}

export async function reviewIntake(input: {
  intakeId: string
  decision: 'invite' | 'clarify' | 'hold' | 'decline'
  internalNotes: string
  clientMessage: string
  stage2Direction: string
}) {
  const { data, error } = await supabase.rpc('intake_review', {
    p_intake_id: input.intakeId,
    p_decision: input.decision,
    p_internal_notes: input.internalNotes,
    p_client_message: input.clientMessage,
    p_stage2_direction: input.stage2Direction,
  })
  if (error) throw new Error(error.message)
  return asState(data)
}

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'application/pdf', 'text/plain'])
const MAX_BYTES = 8 * 1024 * 1024

export async function addReference(input: {
  intakeId: string
  userId: string
  kind: 'link' | 'file'
  label: string
  url?: string
  file?: File
}) {
  let storagePath = ''
  let url = input.url ?? ''
  if (input.kind === 'file' && input.file) {
    if (!ALLOWED_TYPES.has(input.file.type) || input.file.size > MAX_BYTES) {
      throw new Error('Use a PNG, JPG, WEBP, PDF, or text file under 8 MB.')
    }
    const safeName = input.file.name.replace(/[^\w.-]+/g, '-').slice(0, 80)
    storagePath = `${input.userId}/${input.intakeId}/${crypto.randomUUID()}-${safeName}`
    const uploaded = await supabase.storage.from('intake-references').upload(storagePath, input.file, {
      contentType: input.file.type,
      upsert: false,
    })
    if (uploaded.error) throw new Error(uploaded.error.message)
  }
  const { data, error } = await supabase.rpc('intake_add_reference', {
    p_intake_id: input.intakeId,
    p_kind: input.kind,
    p_label: input.label,
    p_url: url,
    p_storage_path: storagePath,
  })
  if (error) throw new Error(error.message)
  return asState(data)
}

export async function removeReference(referenceId: string, storagePath: string | null) {
  const { data, error } = await supabase.rpc('intake_remove_reference', {
    p_reference_id: referenceId,
  })
  if (error) throw new Error(error.message)
  if (storagePath) {
    await supabase.storage.from('intake-references').remove([storagePath])
  }
  return asState(data)
}

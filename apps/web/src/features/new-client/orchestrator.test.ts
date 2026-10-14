import assert from 'node:assert/strict'
import {
  advisoryFit,
  previousAnswer,
  questionWidget,
  blankFields,
  canSubmit,
  clientSnapshot,
  proposeTurn,
  validateProposal,
  type FieldRecord,
} from './orchestrator.ts'

const rich =
  'We want an app for our customers because the booking process is frustrating, and we would like you to design and build it in the next few months. Budget is help me figure it out.'

const first = proposeTurn({ fields: blankFields(), clientText: rich, focus: 'idea' })
const idea = first.fields.find((field) => field.key === 'idea')
const audience = first.fields.find((field) => field.key === 'audience')
const help = first.fields.find((field) => field.key === 'requested_help')
const timing = first.fields.find((field) => field.key === 'timing')
assert.equal(idea?.status, 'client_stated')
assert.ok(audience, 'audience captured from the same message')
assert.ok(help, 'requested help captured from the same message')
assert.ok(timing, 'timing captured from the same message')
assert.notEqual(first.message, "What's been growing in your imagination?")

const filled = blankFields().map((field) => {
  const update = first.fields.find((item) => item.key === field.key)
  return update ? { ...field, status: update.status, value: update.value } : field
})
const second = proposeTurn({ fields: filled, clientText: 'Our customers, the people who book today.', focus: 'audience' })
assert.ok(!second.fields.some((field) => field.key === 'idea' && field.value.text))

const unknown = proposeTurn({
  fields: blankFields().map((field) =>
    field.key === 'idea' ? { ...field, status: 'client_stated' as const, value: { text: 'A booking tool' } } : field,
  ),
  clientText: "I don't know",
  focus: 'motivation',
})
assert.equal(unknown.fields.find((field) => field.key === 'motivation')?.status, 'unknown')

const summaryFields: FieldRecord[] = blankFields().map((field) => {
  if (field.key === 'summary') return field
  if (field.key === 'contact') return { ...field, status: 'client_stated' as const, value: { name: 'Ada', email: 'ada@example.com' } }
  if (field.key === 'idea' || field.key === 'audience' || field.key === 'purpose' || field.key === 'outcome') {
    return { ...field, status: 'client_stated' as const, value: { text: 'stated', ids: ['customers'], id: 'customers' } }
  }
  return { ...field, status: 'unknown' as const, value: { text: 'unknown' } }
})
const corrected = proposeTurn({
  fields: summaryFields,
  clientText: 'Please say the audience is the shop team, not customers.',
  focus: 'summary',
})
assert.equal(corrected.fields.find((field) => field.key === 'summary')?.status, 'client_stated')
assert.equal(canSubmit(summaryFields).ok, false)

const confirmed = summaryFields.map((field) =>
  field.key === 'summary' ? { ...field, status: 'confirmed' as const, value: { confirmed: true } } : field,
)
assert.equal(canSubmit(confirmed).ok, true)

const inferred = confirmed.map((field) =>
  field.key === 'outcome' ? { ...field, status: 'inferred' as const } : field,
)
assert.equal(canSubmit(inferred).ok, false)

assert.equal(
  previousAnswer(
    blankFields().map((field) => (field.key === 'idea' ? { ...field, status: 'client_stated' as const, value: { text: 'A booking tool' } } : field)),
    'motivation',
  ),
  'idea',
)
assert.equal(
  previousAnswer(
    blankFields().map((field) =>
      field.key === 'idea' || field.key === 'audience' ? { ...field, status: 'client_stated' as const, value: { text: 'Noted' } } : field,
    ),
    'purpose',
  ),
  'audience',
)
assert.equal(previousAnswer(blankFields(), 'idea'), null)
assert.equal(previousAnswer(blankFields(), null), null)

const spark = proposeTurn({
  fields: blankFields(),
  clientText: 'A trail guide that knows which vehicle can take the path.',
  focus: 'idea',
})
assert.equal(spark.message, 'What sparked it?')
assert.equal(spark.widget && 'field' in spark.widget ? spark.widget.field : null, 'motivation')

const unsure = proposeTurn({
  fields: blankFields().map((field) =>
    field.key === 'idea' ? { ...field, status: 'client_stated' as const, value: { text: 'A trail guide' } } : field,
  ),
  clientText: 'Not sure yet',
  focus: 'motivation',
  widgetValue: { ids: ['unsure'], id: 'unsure', choice: 'unsure', text: 'Not sure yet' },
})
assert.equal(unsure.fields.find((field) => field.key === 'motivation')?.status, 'client_stated')
assert.equal(unsure.message, "Who's this for?")

const returned = proposeTurn({
  fields: blankFields().map((field) => {
    if (field.key === 'idea' || field.key === 'motivation' || field.key === 'audience') {
      return { ...field, status: 'client_stated' as const, value: { text: 'Already answered', ids: ['team'] } }
    }
    return field
  }),
  clientText: 'Our team',
  focus: 'audience',
  widgetValue: { ids: ['team'], id: 'team', choice: 'team', text: 'Our team' },
})
assert.equal(returned.message, "What's this for?")
assert.equal(returned.widget && 'field' in returned.widget ? returned.widget.field : null, 'purpose')

const purposeOptions = questionWidget('purpose')
assert.ok(purposeOptions && purposeOptions.type === 'cards')
if (purposeOptions && purposeOptions.type === 'cards') {
  assert.deepEqual(
    purposeOptions.options.map((option) => option.label),
    ['Our own business', 'Our customers', 'A new venture', 'Not sure yet'],
  )
}

assert.equal(
  validateProposal({
    message: 'Hello',
    fields: [],
    widget: { type: 'html' } as never,
    readyForReview: false,
    mode: 'demo',
    gaps: [],
  }),
  'That widget is not in the registry.',
)

const snap = clientSnapshot(confirmed, { name: 'Ada', email: 'ada@example.com', company: '' })
assert.equal('internalNotes' in snap, false)
assert.match(advisoryFit(confirmed), /Advisory only/)

console.log('orchestrator tests passed')

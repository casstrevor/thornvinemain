import assert from 'node:assert/strict'
import { presentQuestion } from './questionCopy.ts'

const audience = presentQuestion('audience', '')
const purpose = presentQuestion('purpose', '')
assert.equal(audience.eyebrow, "Who it's for")
assert.equal(audience.title, "Who's this for?")
assert.equal(purpose.eyebrow, "What it's for")
assert.equal(purpose.title, "What's this for?")
assert.equal(presentQuestion('purpose', "What's this for?").support, purpose.support)
assert.equal(presentQuestion('idea', '').eyebrow, 'Your idea')
assert.equal(presentQuestion('motivation', '').support, 'Choose any that fit. More than one is welcome.')
assert.equal(presentQuestion('requested_help', '').support, 'Choose any that fit. More than one is welcome.')
assert.equal(presentQuestion('involvement', '').support, 'Choose the one that fits.')

console.log('question copy tests passed')

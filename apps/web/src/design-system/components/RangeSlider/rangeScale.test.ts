import assert from 'node:assert/strict'
import { adjacentMoney, moneyToScale, scaleToMoney } from './rangeScale.ts'

const min = 100
const max = 50_000

assert.equal(scaleToMoney(0, min, max), 100)
assert.equal(scaleToMoney(1000, min, max), 50_000)
assert.equal(moneyToScale(100, min, max), 0)
assert.equal(moneyToScale(50_000, min, max), 1000)
assert.ok(scaleToMoney(500, min, max) > 100)
assert.ok(scaleToMoney(500, min, max) < 50_000)
assert.ok(adjacentMoney(50_000, -1, min, max) < 50_000)
assert.ok(adjacentMoney(100, 1, min, max) > 100)

console.log('range scale tests passed')

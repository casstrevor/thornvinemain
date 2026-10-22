/** Log scale so amounts near $100 stay as easy to set as amounts near $50,000. */
const SCALE = 1000

export function moneyToScale(value: number, min: number, max: number): number {
  const clamped = Math.min(max, Math.max(min, value))
  if (clamped === min) return 0
  if (clamped === max) return SCALE
  const t = (Math.log(clamped) - Math.log(min)) / (Math.log(max) - Math.log(min))
  return Math.round(t * SCALE)
}

export function scaleToMoney(position: number, min: number, max: number): number {
  if (position <= 0) return min
  if (position >= SCALE) return max
  const t = position / SCALE
  const raw = Math.exp(Math.log(min) + t * (Math.log(max) - Math.log(min)))
  return snapMoney(raw, min, max)
}

export function snapMoney(value: number, min: number, max: number): number {
  const clamped = Math.min(max, Math.max(min, value))
  if (clamped === min || clamped === max) return clamped
  const step = clamped < 1000 ? 50 : clamped < 5000 ? 100 : clamped < 20000 ? 500 : 1000
  return Math.min(max, Math.max(min, Math.round(clamped / step) * step))
}

export function adjacentMoney(value: number, direction: -1 | 1, min: number, max: number): number {
  const current = snapMoney(value, min, max)
  let position = moneyToScale(current, min, max)
  for (let step = 0; step < SCALE; step += 1) {
    position += direction
    if (position < 0) return min
    if (position > SCALE) return max
    const next = scaleToMoney(position, min, max)
    if (next !== current) return next
  }
  return current
}

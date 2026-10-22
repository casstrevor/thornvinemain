import { useState } from 'react'
import { adjacentMoney, moneyToScale, scaleToMoney } from './rangeScale'
import './range-slider.css'

const SCALE = 1000

type RangeSliderProps = {
  label: string
  min: number
  max: number
  minValue: number
  maxValue: number
  formatValue: (value: number) => string
  disabled?: boolean
  /** Dim the track when another answer, such as Not sure yet, is selected. */
  quiet?: boolean
  onChange: (next: { min: number; max: number }) => void
}

export function RangeSlider({ label, min, max, minValue, maxValue, formatValue, disabled, quiet, onChange }: RangeSliderProps) {
  const [active, setActive] = useState<'min' | 'max'>('max')
  const start = moneyToScale(minValue, min, max)
  const end = moneyToScale(maxValue, min, max)

  function changeMin(position: number) {
    const money = scaleToMoney(position, min, max)
    onChange({ min: money >= maxValue ? adjacentMoney(maxValue, -1, min, max) : money, max: maxValue })
  }

  function changeMax(position: number) {
    const money = scaleToMoney(position, min, max)
    onChange({ min: minValue, max: money <= minValue ? adjacentMoney(minValue, 1, min, max) : money })
  }

  return (
    <div className={['tv-range', quiet ? 'tv-range--quiet' : ''].filter(Boolean).join(' ')}>
      <div className="tv-range__values">
        <span>{formatValue(minValue)}</span>
        <span>{formatValue(maxValue)}</span>
      </div>
      <div
        className="tv-range__control"
        style={{ ['--tv-range-start' as string]: `${(start / SCALE) * 100}%`, ['--tv-range-end' as string]: `${(end / SCALE) * 100}%` }}
      >
        <div className="tv-range__rail" />
        <input
          className="tv-range__input"
          type="range"
          min={0}
          max={SCALE}
          step={1}
          value={start}
          disabled={disabled}
          aria-label={`${label}, lowest amount`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
          aria-valuetext={formatValue(minValue)}
          style={{ zIndex: active === 'min' ? 2 : 1 }}
          onPointerDown={() => setActive('min')}
          onChange={(event) => changeMin(Number(event.target.value))}
        />
        <input
          className="tv-range__input"
          type="range"
          min={0}
          max={SCALE}
          step={1}
          value={end}
          disabled={disabled}
          aria-label={`${label}, highest amount`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
          aria-valuetext={formatValue(maxValue)}
          style={{ zIndex: active === 'max' ? 2 : 1 }}
          onPointerDown={() => setActive('max')}
          onChange={(event) => changeMax(Number(event.target.value))}
        />
      </div>
      <div className="tv-range__bounds">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  )
}

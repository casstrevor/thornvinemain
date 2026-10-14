import { useState } from 'react'
import { Button, Icon } from '../../../../design-system'
import { durations, easings, keyframes } from '../../../../design-system/tokens'
import { DoDont, DocSection, TokenName } from '../../doc-kit/DocKit'
import { readToken } from '../../doc-kit/tokenValue'

const loopingKeyframes = new Set(['tv-leaf-sway', 'tv-pulse', 'tv-spin'])

function DurationRow({ token, label, usage }: { token: string; label: string; usage?: string }) {
  const value = readToken(token)
  return (
    <tr>
      <td>
        <strong>{label}</strong>
      </td>
      <td>
        <TokenName>{token}</TokenName>
      </td>
      <td>{value}</td>
      <td>{usage}</td>
    </tr>
  )
}

export default function MotionDoc() {
  const [replay, setReplay] = useState(0)

  return (
    <>
      <DocSection
        title="Principles"
        description="Motion should feel like growth: unhurried, organic, and purposeful. It guides attention; it never blocks reading or input."
      >
        <ul className="ds-bullets">
          <li>Entrances ease out (emphasized); exits are quicker and ease in.</li>
          <li>Ambient botanical motion loops slowly and stays behind content.</li>
          <li>
            Every animation honors <code>prefers-reduced-motion</code>; the composed still state must work on its own.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Easing curves" description="Hover a track to watch the dot travel using that curve.">
        <ul className="ds-ease-list">
          {easings.map((spec) => (
            <li key={spec.token} className="ds-ease-row">
              <span className="ds-ease-row__meta">
                <strong>{spec.label}</strong>
                <TokenName>{spec.token}</TokenName>
                <span className="ds-muted">{spec.usage}</span>
              </span>
              <span className="ds-ease-row__track" style={{ ['--ease' as string]: `var(${spec.token})` }}>
                <span className="ds-ease-row__dot" />
              </span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="Durations">
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Token</th>
                <th scope="col">Value</th>
                <th scope="col">Use for</th>
              </tr>
            </thead>
            <tbody>
              {durations.map((spec) => (
                <DurationRow key={spec.token} {...spec} />
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Animations"
        description="Shared keyframes defined in tokens.css. Reference them by name with a duration and easing token."
      >
        <div className="ds-inline-actions">
          <Button size="sm" variant="secondary" onClick={() => setReplay((n) => n + 1)}>
            Replay entrances
          </Button>
        </div>
        <ul className="ds-anim-grid">
          {keyframes.map((spec) => {
            const loops = loopingKeyframes.has(spec.token)
            return (
              <li key={spec.token} className="ds-anim-tile">
                <span className="ds-anim-tile__stage">
                  <span
                    key={loops ? spec.token : `${spec.token}-${replay}`}
                    className={`ds-anim-tile__subject ds-anim-tile__subject--${spec.token}`}
                    style={{
                      animation: loops
                        ? `${spec.token} ${spec.token === 'tv-spin' ? '900ms linear' : '3s var(--tv-ease-organic)'} infinite`
                        : `${spec.token} var(--tv-duration-gentle) var(--tv-ease-emphasized) both`,
                    }}
                  >
                    {spec.token === 'tv-leaf-sway' ? <Icon name="leaf" size="lg" /> : null}
                  </span>
                </span>
                <strong>{spec.label}</strong>
                <TokenName>{spec.token}</TokenName>
                <span className="ds-muted">{spec.usage}</span>
              </li>
            )
          })}
        </ul>
      </DocSection>

      <DocSection title="Usage">
        <DoDont
          dos={[
            'Animate transform and opacity; they stay smooth on low-end devices.',
            'Use Fast for hover/press and Slow for dialogs and drawers.',
            'Stagger list entrances by 40–60ms, capped at ~6 items.',
          ]}
          donts={[
            'Animate layout properties (width, top, margin) in loops.',
            'Loop motion near text people are reading.',
            'Ship motion without a reduced-motion fallback.',
          ]}
        />
      </DocSection>
    </>
  )
}

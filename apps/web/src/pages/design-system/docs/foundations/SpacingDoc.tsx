import { spaceScale } from '../../../../design-system/tokens'
import { DocSection, TokenName } from '../../doc-kit/DocKit'
import { readToken } from '../../doc-kit/tokenValue'

function SpaceRow({ token, label }: { token: string; label: string }) {
  const value = readToken(token)
  return (
    <li className="ds-space-row">
      <span className="ds-space-row__label">
        <strong>{label}</strong>
        <TokenName>{token}</TokenName>
        <span className="ds-muted">{value}</span>
      </span>
      <span className="ds-space-row__bar" style={{ width: `var(${token})` }} />
    </li>
  )
}

export default function SpacingDoc() {
  return (
    <>
      <DocSection
        title="Spacing scale"
        description="A 4px base keeps rhythm consistent. Prefer the scale over one-off values; if you need a new step, add a token."
      >
        <ul className="ds-space-list">
          {spaceScale.map((spec) => (
            <SpaceRow key={spec.token} {...spec} />
          ))}
        </ul>
      </DocSection>

      <DocSection title="Layout guidance">
        <ul className="ds-bullets">
          <li>
            Content max width is <code>1180px</code> for marketing and <code>1080px</code> for the portal, with{' '}
            <code>1.5rem</code> gutters.
          </li>
          <li>Space 2–4 between related elements; space 6–8 between groups; space 12–16 between page sections.</li>
          <li>Touch targets are at least 44px tall (buttons default to 45.6px).</li>
          <li>Breakpoints: 560px (phone), 900px (tablet), 1180px (desktop).</li>
        </ul>
      </DocSection>
    </>
  )
}

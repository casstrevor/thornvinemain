import { radiusScale, shadowScale, type TokenSpec } from '../../../../design-system/tokens'
import { DocSection, TokenName } from '../../doc-kit/DocKit'
import { readToken } from '../../doc-kit/tokenValue'

function ShapeTile({ spec, kind }: { spec: TokenSpec; kind: 'radius' | 'shadow' }) {
  const value = readToken(spec.token)
  return (
    <li className="ds-shape-tile">
      <span
        className="ds-shape-tile__sample"
        style={kind === 'radius' ? { borderRadius: `var(${spec.token})` } : { boxShadow: `var(${spec.token})` }}
      />
      <strong>{spec.label}</strong>
      <TokenName>{spec.token}</TokenName>
      <span className="ds-muted ds-shape-tile__value">{value}</span>
      {spec.usage ? <span className="ds-muted">{spec.usage}</span> : null}
    </li>
  )
}

export default function ShapeDoc() {
  return (
    <>
      <DocSection title="Corner radius" description="Soft, organic corners. Larger surfaces get larger radii.">
        <ul className="ds-shape-grid">
          {radiusScale.map((spec) => (
            <ShapeTile key={spec.token} spec={spec} kind="radius" />
          ))}
        </ul>
      </DocSection>
      <DocSection
        title="Elevation"
        description="Shadows are tinted forest, never pure black, so depth feels natural on cream."
      >
        <ul className="ds-shape-grid">
          {shadowScale.map((spec) => (
            <ShapeTile key={spec.token} spec={spec} kind="shadow" />
          ))}
        </ul>
      </DocSection>
    </>
  )
}

import { colorPrimitives, semanticColors, type TokenSpec } from '../../../../design-system/tokens'
import { DoDont, DocSection, TokenName } from '../../doc-kit/DocKit'
import { readToken } from '../../doc-kit/tokenValue'

function Swatch({ spec }: { spec: TokenSpec }) {
  const value = readToken(spec.token)
  return (
    <li className="ds-swatch">
      <span className="ds-swatch__chip" style={{ background: `var(${spec.token})` }} />
      <span className="ds-swatch__meta">
        <strong>{spec.label}</strong>
        <TokenName>{spec.token}</TokenName>
        <span className="ds-swatch__value">{value}</span>
        {spec.usage ? <span className="ds-swatch__usage">{spec.usage}</span> : null}
      </span>
    </li>
  )
}

export default function ColorDoc() {
  return (
    <>
      <DocSection
        title="Semantic tokens"
        description="Use these in components. They describe intent, so a future theme (dark mode, a client white-label) only re-points them."
      >
        {semanticColors.map((group) => (
          <div key={group.title} className="ds-token-group">
            <h3>{group.title}</h3>
            <ul className="ds-swatch-grid">
              {group.tokens.map((spec) => (
                <Swatch key={spec.token} spec={spec} />
              ))}
            </ul>
          </div>
        ))}
      </DocSection>

      <DocSection
        title="Primitive palette"
        description="Raw brand values. Reference them only when defining new semantic tokens."
      >
        {colorPrimitives.map((group) => (
          <div key={group.title} className="ds-token-group">
            <h3>{group.title}</h3>
            {group.description ? <p className="ds-muted">{group.description}</p> : null}
            <ul className="ds-swatch-grid">
              {group.tokens.map((spec) => (
                <Swatch key={spec.token} spec={spec} />
              ))}
            </ul>
          </div>
        ))}
      </DocSection>

      <DocSection title="Usage">
        <DoDont
          dos={[
            'Reach for semantic tokens first (--tv-color-*).',
            'Keep burgundy to one primary action per view.',
            'Use leaf green sparingly, for selection and progress.',
            'Check text contrast meets WCAG AA (4.5:1 body, 3:1 large).',
          ]}
          donts={[
            'Hard-code hex values in component CSS.',
            'Use burgundy for decoration or large backgrounds.',
            'Put muted text on sage or forest surfaces without checking contrast.',
            'Signal status with color alone; pair it with an icon or label.',
          ]}
        />
      </DocSection>
    </>
  )
}

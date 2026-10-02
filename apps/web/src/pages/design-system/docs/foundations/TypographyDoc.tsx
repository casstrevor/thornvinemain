import { typeScale } from '../../../../design-system/tokens'
import { DocSection, TokenName } from '../../doc-kit/DocKit'
import { readToken } from '../../doc-kit/tokenValue'

function TypeRow({ token, label, usage, display }: { token: string; label: string; usage?: string; display: boolean }) {
  const value = readToken(token)
  return (
    <li className="ds-type-row">
      <div className="ds-type-row__meta">
        <strong>{label}</strong>
        <TokenName>{token}</TokenName>
        <span className="ds-muted">{value}</span>
        {usage ? <span className="ds-muted">{usage}</span> : null}
      </div>
      <p
        className="ds-type-row__sample"
        style={{
          fontSize: `var(${token})`,
          fontFamily: display ? 'var(--tv-font-display)' : 'var(--tv-font-body)',
          fontWeight: display ? 700 : 400,
          letterSpacing: display ? 'var(--tv-tracking-tight)' : undefined,
          lineHeight: display ? 'var(--tv-leading-tight)' : 'var(--tv-leading-normal)',
        }}
      >
        Your imagination. Let&apos;s make it real.
      </p>
    </li>
  )
}

export default function TypographyDoc() {
  return (
    <>
      <DocSection
        title="Typefaces"
        description="Sora carries headlines with confident geometry. DM Sans keeps body copy warm and readable."
      >
        <div className="ds-font-pair">
          <div className="ds-font-card">
            <span className="ds-font-card__glyph" style={{ fontFamily: 'var(--tv-font-display)' }}>
              Aa
            </span>
            <strong>Sora</strong>
            <TokenName>--tv-font-display</TokenName>
            <span className="ds-muted">Headings, numerals, brand moments · 500–800</span>
          </div>
          <div className="ds-font-card">
            <span className="ds-font-card__glyph" style={{ fontFamily: 'var(--tv-font-body)' }}>
              Aa
            </span>
            <strong>DM Sans</strong>
            <TokenName>--tv-font-body</TokenName>
            <span className="ds-muted">Body, UI controls, forms · 400–700</span>
          </div>
        </div>
      </DocSection>

      <DocSection title="Type scale" description="Headings use Sora bold with tight tracking; Lead and below use DM Sans.">
        <ul className="ds-type-list">
          {typeScale.map((spec, index) => (
            <TypeRow key={spec.token} {...spec} display={index < 4} />
          ))}
        </ul>
      </DocSection>

      <DocSection title="Eyebrow" description="Short uppercase labels that introduce a section.">
        <p className="ds-eyebrow-sample">Creative product agency</p>
      </DocSection>
    </>
  )
}

import { Link } from 'react-router-dom'
import { Badge } from '../../../../design-system'
import { DocSection } from '../../doc-kit/DocKit'
import { countByStatus } from '../../registry'

export default function OverviewDoc() {
  const counts = countByStatus()

  return (
    <>
      <DocSection
        title="What this is"
        description="Thornvine's shared language for building warm, confident, human products. Tokens define the values, components package them, and patterns show how they fit together."
      >
        <div className="ds-stat-row">
          <div className="ds-stat">
            <strong>{counts.stable}</strong>
            <Badge tone="success">Stable</Badge>
          </div>
          <div className="ds-stat">
            <strong>{counts.beta}</strong>
            <Badge tone="warning">Beta</Badge>
          </div>
          <div className="ds-stat">
            <strong>{counts.planned}</strong>
            <Badge>Planned</Badge>
          </div>
        </div>
      </DocSection>

      <DocSection title="How it is organized">
        <ul className="ds-bullets">
          <li>
            <strong>Foundations</strong>: tokens for{' '}
            <Link to="/design-system/color">color</Link>, <Link to="/design-system/typography">type</Link>,{' '}
            <Link to="/design-system/spacing">spacing</Link>, shape, <Link to="/design-system/motion">motion</Link>, and{' '}
            <Link to="/design-system/imagery">imagery</Link>.
          </li>
          <li>
            <strong>Components</strong>: reusable React primitives in <code>apps/web/src/design-system</code>, grouped by
            job: actions, forms, feedback, navigation, overlays, and data display.
          </li>
          <li>
            <strong>Patterns</strong>: compositions of components for recurring Thornvine screens.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Using it in code">
        <pre className="ds-preview__code">
          <code>{`import { Button, Badge, TextField } from '../design-system'`}</code>
        </pre>
        <ul className="ds-bullets">
          <li>Style with semantic tokens (<code>var(--tv-color-*)</code>), never raw hex values.</li>
          <li>
            Adding a component: build it in <code>design-system/components/&lt;Name&gt;/</code>, export it from{' '}
            <code>design-system/index.ts</code>, write a doc in <code>pages/design-system/docs/</code>, and flip its
            registry entry from <em>planned</em> to <em>beta</em>.
          </li>
        </ul>
      </DocSection>
    </>
  )
}

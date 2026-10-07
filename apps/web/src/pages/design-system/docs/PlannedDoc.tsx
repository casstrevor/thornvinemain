import { Alert, Badge } from '../../../design-system'
import { DocSection } from '../doc-kit/DocKit'
import type { DocEntry, Priority } from '../registry'

const priorityLabel: Record<Priority, string> = {
  now: 'Now — needed for current work',
  next: 'Next — upcoming features',
  later: 'Later — future roadmap',
}

export function PlannedDoc({ entry }: { entry: DocEntry }) {
  const spec = entry.spec
  if (!spec) return null

  return (
    <>
      <Alert title="Not built yet">
        This is a design spec. Build it in <code>design-system/components/</code>, add a doc, and switch the registry
        entry to <code>built()</code>.
      </Alert>

      <DocSection title="Priority">
        <Badge tone={spec.priority === 'now' ? 'danger' : spec.priority === 'next' ? 'warning' : 'neutral'}>
          {priorityLabel[spec.priority]}
        </Badge>
      </DocSection>

      <DocSection title="Planned variants">
        <ul className="ds-chip-list">
          {spec.variants.map((variant) => (
            <li key={variant}>{variant}</li>
          ))}
        </ul>
      </DocSection>

      {spec.anatomy ? (
        <DocSection title="Anatomy">
          <ol className="ds-bullets">
            {spec.anatomy.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ol>
        </DocSection>
      ) : null}

      {spec.notes ? (
        <DocSection title="Notes">
          <p className="ds-muted">{spec.notes}</p>
        </DocSection>
      ) : null}
    </>
  )
}

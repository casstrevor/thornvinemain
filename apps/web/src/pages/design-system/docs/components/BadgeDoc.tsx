import { Badge } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function BadgeDoc() {
  return (
    <>
      <DocSection title="Tones" description="Compact status labels for projects, roles, and metadata.">
        <Preview code={`<Badge tone="success">Active</Badge>`}>
          <Badge>Complete</Badge>
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Discovery</Badge>
          <Badge tone="danger">Paused</Badge>
          <Badge tone="info">In review</Badge>
          <Badge tone="accent">New</Badge>
        </Preview>
      </DocSection>
      <DocSection title="With status dot" description="Set live to pulse the dot for real-time states.">
        <Preview code={`<Badge tone="success" dot live>Live</Badge>`}>
          <Badge tone="success" dot live>
            Live
          </Badge>
          <Badge tone="warning" dot>
            Pending
          </Badge>
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'tone', type: "'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent'", defaultValue: "'neutral'", description: 'Meaning and color.' },
            { name: 'dot', type: 'boolean', defaultValue: 'false', description: 'Leading status dot.' },
            { name: 'live', type: 'boolean', defaultValue: 'false', description: 'Pulse the dot.' },
          ]}
        />
      </DocSection>
    </>
  )
}

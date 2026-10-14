import { Alert, Button } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function AlertDoc() {
  return (
    <>
      <DocSection
        title="Tones"
        description="Inline, persistent messages tied to a page or section. Warning and danger use role=alert; others use role=status."
      >
        <Preview stack code={`<Alert tone="success" title="Brief sent">We'll reply within two business days.</Alert>`}>
          <Alert title="Heads up">Your first consultation is free.</Alert>
          <Alert tone="success" title="Brief sent">
            We&apos;ll reply within two business days.
          </Alert>
          <Alert tone="warning" title="Proposal expires soon">
            Review and approve by Friday to keep your start date.
          </Alert>
          <Alert
            tone="danger"
            title="Upload failed"
            action={
              <Button size="sm" variant="secondary">
                Retry
              </Button>
            }
          >
            The file was larger than 25MB.
          </Alert>
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: "'info'", description: 'Meaning and color.' },
            { name: 'title', type: 'ReactNode', description: 'Short, scannable headline.' },
            { name: 'children', type: 'ReactNode', description: 'Supporting detail.' },
            { name: 'action', type: 'ReactNode', description: 'Optional trailing action, usually a small button.' },
          ]}
        />
      </DocSection>
    </>
  )
}

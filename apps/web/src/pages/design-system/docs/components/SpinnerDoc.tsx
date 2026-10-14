import { Spinner } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function SpinnerDoc() {
  return (
    <>
      <DocSection
        title="Sizes"
        description="Indeterminate loading for short waits (under ~4s). For longer loads, prefer skeletons. Falls back to a gentle pulse under reduced motion."
      >
        <Preview code={`<Spinner size="sm" />\n<Spinner />\n<Spinner size="lg" label="Loading projects" />`}>
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" label="Loading projects" />
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Diameter.' },
            { name: 'label', type: 'string', defaultValue: "'Loading'", description: 'Announced text; pass "" when a parent announces busy state.' },
          ]}
        />
      </DocSection>
    </>
  )
}

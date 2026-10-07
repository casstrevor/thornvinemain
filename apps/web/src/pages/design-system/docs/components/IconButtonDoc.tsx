import { IconButton } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function IconButtonDoc() {
  return (
    <>
      <DocSection
        title="Default"
        description="Compact, icon-only actions for toolbars, dismissals, and menus. A label is required; it becomes the accessible name and tooltip."
      >
        <Preview code={`<IconButton icon="close" label="Close dialog" />`}>
          <IconButton icon="plus" label="Add item" variant="primary" />
          <IconButton icon="search" label="Search" />
          <IconButton icon="close" label="Close dialog" variant="tertiary" />
          <IconButton icon="menu" label="Open menu" size="sm" />
          <IconButton icon="arrow-right" label="Next" size="lg" />
        </Preview>
      </DocSection>
      <DocSection title="Inverse">
        <Preview surface="dark">
          <IconButton icon="close" label="Close" tone="inverse" />
          <IconButton icon="menu" label="Open menu" tone="inverse" variant="tertiary" />
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'icon', type: 'IconName', description: 'Icon from the Thornvine icon set.' },
            { name: 'label', type: 'string', description: 'Required accessible name; also shown as a tooltip.' },
            { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", defaultValue: "'secondary'", description: 'Visual emphasis.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Square size.' },
            { name: 'tone', type: "'default' | 'inverse'", defaultValue: "'default'", description: 'Use inverse on dark surfaces.' },
          ]}
        />
      </DocSection>
    </>
  )
}

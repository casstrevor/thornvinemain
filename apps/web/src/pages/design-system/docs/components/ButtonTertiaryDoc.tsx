import { Button, Icon } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'
import { buttonProps } from './buttonProps'

export default function ButtonTertiaryDoc() {
  return (
    <>
      <DocSection
        title="Default"
        description="Lowest-emphasis action: an underlined text button for dense UI, dismissals, and inline actions."
      >
        <Preview code={`<Button variant="tertiary">Skip for now</Button>`}>
          <Button variant="tertiary">Skip for now</Button>
          <Button variant="tertiary" iconEnd={<Icon name="arrow-right" />}>
            Read the case study
          </Button>
          <Button variant="tertiary" disabled>
            Disabled
          </Button>
        </Preview>
      </DocSection>
      <DocSection title="Inverse">
        <Preview surface="dark">
          <Button variant="tertiary" tone="inverse">
            Meet the humans
          </Button>
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable rows={buttonProps} />
      </DocSection>
    </>
  )
}

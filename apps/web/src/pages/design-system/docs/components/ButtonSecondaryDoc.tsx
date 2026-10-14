import { Button, Icon } from '../../../../design-system'
import { DoDont, DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'
import { buttonProps } from './buttonProps'

export default function ButtonSecondaryDoc() {
  return (
    <>
      <DocSection
        title="Default"
        description="Supporting actions that sit beside a primary, like “Explore our work” or “Cancel”. Forest outline, transparent fill."
      >
        <Preview code={`<Button variant="secondary">Explore our work</Button>`}>
          <Button variant="secondary">Explore our work</Button>
          <Button variant="secondary" iconStart={<Icon name="plus" />}>
            Add file
          </Button>
          <Button variant="secondary" iconEnd={<Icon name="arrow-out" />}>
            View live site
          </Button>
        </Preview>
      </DocSection>

      <DocSection title="Paired with primary" description="Primary goes first in reading order, then secondary.">
        <Preview code={`<Button>Send brief</Button>\n<Button variant="secondary">Save draft</Button>`}>
          <Button>Send brief</Button>
          <Button variant="secondary">Save draft</Button>
        </Preview>
      </DocSection>

      <DocSection title="Sizes & states">
        <Preview>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary">Medium</Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="secondary" loading>
            Loading
          </Button>
        </Preview>
      </DocSection>

      <DocSection title="Inverse" description="On forest and photography, set tone=&quot;inverse&quot;.">
        <Preview surface="dark" code={`<Button variant="secondary" tone="inverse">See how it happens</Button>`}>
          <Button variant="secondary" tone="inverse">
            See how it happens
          </Button>
          <Button variant="secondary" tone="inverse" disabled>
            Disabled
          </Button>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={buttonProps} />
      </DocSection>

      <DocSection title="Usage">
        <DoDont
          dos={['Use for alternate or reversible paths.', 'Use freely in toolbars and card footers.']}
          donts={['Make secondary visually louder than the primary next to it.', 'Use secondary as the only action when a primary is warranted.']}
        />
      </DocSection>
    </>
  )
}

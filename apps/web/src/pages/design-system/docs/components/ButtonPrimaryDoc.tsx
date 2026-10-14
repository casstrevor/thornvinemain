import { Link } from 'react-router-dom'
import { Button, buttonClassName, Icon } from '../../../../design-system'
import { DoDont, DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'
import { buttonProps } from './buttonProps'

export default function ButtonPrimaryDoc() {
  return (
    <>
      <DocSection
        title="Default"
        description="The single most important action in a view, such as “Tell us your idea” or “Save project”. Burgundy fill with a soft glow; lifts on hover."
      >
        <Preview code={`<Button iconEnd={<Icon name="arrow-right" />}>Tell us your idea</Button>`}>
          <Button iconEnd={<Icon name="arrow-right" />}>Tell us your idea</Button>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview code={`<Button size="sm">Small</Button>\n<Button>Medium</Button>\n<Button size="lg">Large</Button>`}>
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
        </Preview>
      </DocSection>

      <DocSection title="States">
        <Preview code={`<Button disabled>Disabled</Button>\n<Button loading>Saving</Button>`}>
          <Button>Resting</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Saving</Button>
        </Preview>
      </DocSection>

      <DocSection title="On dark surfaces" description="Primary keeps its burgundy fill on forest; contrast holds.">
        <Preview surface="dark">
          <Button iconEnd={<Icon name="arrow-right" />}>Start a project brief</Button>
        </Preview>
      </DocSection>

      <DocSection title="As a link" description="Use buttonClassName() to style router links and anchors that navigate.">
        <Preview code={`<Link to="/design-system" className={buttonClassName()}>Go to overview</Link>`}>
          <Link to="/design-system" className={buttonClassName()}>
            Go to overview
          </Link>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable rows={buttonProps} />
      </DocSection>

      <DocSection title="Usage">
        <DoDont
          dos={['Use one primary button per view or section.', 'Lead with a verb: “Send brief”, “Save changes”.', 'Pair with a secondary for the alternate path.']}
          donts={['Stack several primaries side by side.', 'Use for destructive actions without a confirmation step.', 'Write vague labels like “Click here” or “Submit”.']}
        />
      </DocSection>
    </>
  )
}

import { Badge, Button, Card, Icon, Media } from '../../../../design-system'
import { publicUrl } from '../../../../lib/publicUrl'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function CardDoc() {
  return (
    <>
      <DocSection title="Surfaces" description="A container for one subject: a project, a service, a person.">
        <Preview>
          <div className="ds-card-row">
            <Card eyebrow="Digital products" title="Apps, portals & tools">
              Custom web and mobile apps, customer portals, and internal tools.
            </Card>
            <Card surface="muted" eyebrow="Design & strategy" title="Clear ideas">
              Discovery, UX/UI, and shaping rough ideas into buildable plans.
            </Card>
            <Card surface="inverse" eyebrow="AI & automation" title="Smarter ways to work">
              AI features, agents, and connected workflows.
            </Card>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="With media and footer" description="Set interactive when the whole card navigates.">
        <Preview>
          <div className="ds-card-row">
            <Card
              interactive
              media={<Media src={publicUrl('images/wyldtracks-mountains.jpg')} alt="" ratio="16/9" rounded={false} />}
              eyebrow="Concept"
              title="Wyldtracks trail companion"
              footer={
                <>
                  <Badge tone="info">Illustrative</Badge>
                  <Button variant="tertiary" size="sm" iconEnd={<Icon name="arrow-right" />}>
                    View
                  </Button>
                </>
              }
            >
              Offline maps and trip logs for backcountry explorers.
            </Card>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'eyebrow', type: 'ReactNode', description: 'Small uppercase category label.' },
            { name: 'title', type: 'ReactNode', description: 'Card heading (h3).' },
            { name: 'media', type: 'ReactNode', description: 'Full-bleed media slot above the body.' },
            { name: 'footer', type: 'ReactNode', description: 'Actions or metadata pinned to the bottom.' },
            { name: 'surface', type: "'default' | 'muted' | 'inverse'", defaultValue: "'default'", description: 'Background treatment.' },
            { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Hover lift for clickable cards.' },
          ]}
        />
      </DocSection>
    </>
  )
}

import { Icon, iconNames } from '../../../../design-system'
import { DocSection, Preview } from '../../doc-kit/DocKit'

export default function IconographyDoc() {
  return (
    <>
      <DocSection
        title="Icon set"
        description="Fine botanical line icons on a 20px grid with a 1.7 stroke. They inherit currentColor, so they always match surrounding text."
      >
        <ul className="ds-icon-grid">
          {iconNames.map((name) => (
            <li key={name}>
              <Icon name={name} size="lg" />
              <code>{name}</code>
            </li>
          ))}
        </ul>
      </DocSection>
      <DocSection title="Sizes">
        <Preview code={`<Icon name="leaf" size="sm" />\n<Icon name="leaf" />\n<Icon name="leaf" size="lg" label="Thornvine" />`}>
          <Icon name="leaf" size="sm" />
          <Icon name="leaf" />
          <Icon name="leaf" size="lg" label="Thornvine" />
        </Preview>
        <p className="ds-muted">
          Icons are hidden from assistive tech by default. Pass <code>label</code> only when the icon carries meaning on
          its own.
        </p>
      </DocSection>
    </>
  )
}

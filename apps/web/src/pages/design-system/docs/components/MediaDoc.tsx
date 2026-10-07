import { Media } from '../../../../design-system'
import { publicUrl } from '../../../../lib/publicUrl'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function MediaDoc() {
  return (
    <>
      <DocSection
        title="Default"
        description="Responsive image with a fixed aspect ratio, cover cropping, lazy loading, and an optional legibility overlay."
      >
        <Preview
          stack
          code={`<Media src={publicUrl('images/hero-landscape.jpg')} alt="Misty valley at dawn" ratio="21/9" overlay="bottom" caption="Built to grow with you" />`}
        >
          <Media
            src={publicUrl('images/hero-landscape.jpg')}
            alt="Misty valley at dawn"
            ratio="21/9"
            overlay="bottom"
            caption="Built to grow with you"
          />
        </Preview>
      </DocSection>
      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'alt', type: 'string', description: 'Required. Empty string only for decorative images.' },
            { name: 'ratio', type: "'21/9' | '16/9' | '4/3' | '1/1' | '3/4'", defaultValue: "'16/9'", description: 'Aspect ratio box.' },
            { name: 'overlay', type: "'none' | 'bottom' | 'full'", defaultValue: "'none'", description: 'Gradient for text legibility.' },
            { name: 'rounded', type: 'boolean', defaultValue: 'true', description: 'Apply the extra-large radius.' },
            { name: 'caption', type: 'ReactNode', description: 'Overlaid caption, or below the image when overlay is none.' },
          ]}
        />
      </DocSection>
    </>
  )
}

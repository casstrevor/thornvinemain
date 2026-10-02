import { Media, type MediaRatio } from '../../../../design-system'
import { publicUrl } from '../../../../lib/publicUrl'
import { DoDont, DocSection, Preview } from '../../doc-kit/DocKit'

const library = [
  { file: 'images/hero-composed.jpg', name: 'Hero — composed', use: 'Landing hero background' },
  { file: 'images/hero-tree.jpg', name: 'Hero — tree', use: 'Sculptural tree, right-aligned heroes' },
  { file: 'images/hero-landscape.jpg', name: 'Hero — landscape', use: 'Wide section openers' },
  { file: 'images/foliage.jpg', name: 'Foliage', use: 'Texture bands, auth backdrop' },
  { file: 'images/leaf-detail.jpg', name: 'Leaf detail', use: 'Close-up accents, cards' },
  { file: 'images/footer-leaves.jpg', name: 'Footer leaves', use: 'Deep woodland footer' },
  { file: 'images/wyldtracks-mountains.jpg', name: 'Wyldtracks', use: 'Work showcase (pending approval)' },
  { file: 'images/ovrmaps-forest.jpg', name: 'OVRmaps', use: 'Work showcase (pending approval)' },
] as const

const ratios: MediaRatio[] = ['21/9', '16/9', '4/3', '1/1', '3/4']

export default function ImageryDoc() {
  return (
    <>
      <DocSection
        title="Art direction"
        description="Natural light, glossy leaves, real bark and stone. Imagery should feel grown, not rendered. People appear as real collaborators, never stock poses."
      >
        <ul className="ds-image-grid">
          {library.map((item) => (
            <li key={item.file}>
              <Media src={publicUrl(item.file)} alt={item.name} ratio="4/3" />
              <strong>{item.name}</strong>
              <span className="ds-muted">{item.use}</span>
              <code className="ds-token-name">public/{item.file}</code>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection title="Aspect ratios" description="Use the Media component so ratios, cropping, and lazy loading are consistent.">
        <div className="ds-ratio-row">
          {ratios.map((ratio) => (
            <div key={ratio} className="ds-ratio-row__item">
              <Media src={publicUrl('images/foliage.jpg')} alt="" ratio={ratio} />
              <code className="ds-token-name">{ratio}</code>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Overlays" description="Overlays keep text legible on photography. Bottom fades suit captions; full washes suit centered headlines.">
        <Preview
          code={`<Media src={publicUrl('images/hero-tree.jpg')} alt="Thornvine tree" overlay="bottom" caption="Rooted in craft" />`}
        >
          <div className="ds-overlay-row">
            <Media src={publicUrl('images/hero-tree.jpg')} alt="Tree, no overlay" caption="None" />
            <Media src={publicUrl('images/hero-tree.jpg')} alt="Tree, bottom overlay" overlay="bottom" caption="Bottom" />
            <Media src={publicUrl('images/hero-tree.jpg')} alt="Tree, full overlay" overlay="full" caption="Full" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Usage">
        <DoDont
          dos={[
            'Write alt text that describes purpose; use alt="" only for decoration.',
            'Export JPGs ≤ 500KB at 2× the largest rendered width.',
            'Label illustrative concepts honestly; never imply delivered client work.',
          ]}
          donts={[
            'Place text on busy imagery without an overlay.',
            'Stretch or letterbox images; crop with object-fit instead.',
            'Publish portfolio imagery before permissions are confirmed.',
          ]}
        />
      </DocSection>
    </>
  )
}

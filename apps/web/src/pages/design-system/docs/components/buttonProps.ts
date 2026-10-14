import type { PropRow } from '../../doc-kit/DocKit'

export const buttonProps: PropRow[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'tertiary'", defaultValue: "'primary'", description: 'Visual emphasis.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Height and type size.' },
  { name: 'tone', type: "'default' | 'inverse'", defaultValue: "'default'", description: 'Use inverse on dark forest surfaces.' },
  { name: 'iconStart / iconEnd', type: 'ReactNode', description: 'Optional leading or trailing icon.' },
  { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinner, disables the button, sets aria-busy.' },
  { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Stretch to the container width.' },
  { name: '...rest', type: 'ButtonHTMLAttributes', description: 'Any native button attribute. type defaults to "button".' },
]

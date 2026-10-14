/**
 * Token catalog for documentation. Values are intentionally omitted: the docs
 * resolve them from `tokens.css` at runtime so the CSS stays the only source.
 */
export type TokenSpec = {
  token: string
  label: string
  usage?: string
}

export type TokenGroup = {
  title: string
  description?: string
  tokens: TokenSpec[]
}

export const colorPrimitives: TokenGroup[] = [
  {
    title: 'Forest',
    description: 'Brand anchor. Text, dark surfaces, and secondary actions.',
    tokens: [
      { token: '--tv-forest-900', label: 'Forest 900' },
      { token: '--tv-forest-ink', label: 'Forest ink', usage: 'Introduction question ink' },
      { token: '--tv-forest-800', label: 'Forest 800' },
      { token: '--tv-forest-700', label: 'Forest 700' },
      { token: '--tv-forest-500', label: 'Moss 500' },
      { token: '--tv-forest-300', label: 'Moss 300' },
    ],
  },
  {
    title: 'Cream & sage',
    description: 'Warm, calm backgrounds that set the Thornvine tone.',
    tokens: [
      { token: '--tv-ivory-50', label: 'Ivory 50', usage: 'Introduction canvas' },
      { token: '--tv-cream-50', label: 'Cream 50' },
      { token: '--tv-cream-100', label: 'Cream 100' },
      { token: '--tv-sage-100', label: 'Sage 100' },
      { token: '--tv-sage-150', label: 'Sage 150', usage: 'Composer and selected answers' },
      { token: '--tv-sage-200', label: 'Sage 200' },
      { token: '--tv-line-200', label: 'Line 200', usage: 'Quiet borders' },
      { token: '--tv-white', label: 'White' },
    ],
  },
  {
    title: 'Burgundy',
    description: 'Restrained. Reserved for the primary call to action and danger.',
    tokens: [
      { token: '--tv-burgundy-700', label: 'Burgundy 700' },
      { token: '--tv-burgundy-600', label: 'Burgundy 600' },
      { token: '--tv-wine-700', label: 'Wine 700' },
      { token: '--tv-wine-600', label: 'Wine 600', usage: 'Introduction primary action' },
      { token: '--tv-burgundy-500', label: 'Burgundy 500' },
      { token: '--tv-burgundy-100', label: 'Burgundy 100' },
    ],
  },
  {
    title: 'Gold',
    description: 'Botanical line work, focus rings, and art-deco framing.',
    tokens: [
      { token: '--tv-gold-600', label: 'Gold 600' },
      { token: '--tv-gold-500', label: 'Gold 500' },
      { token: '--tv-gold-300', label: 'Gold 300' },
      { token: '--tv-gold-100', label: 'Gold 100' },
    ],
  },
  {
    title: 'Leaf, slate & river',
    description: 'Leaf is the sparing interaction accent. Slate and river support.',
    tokens: [
      { token: '--tv-leaf-400', label: 'Leaf 400' },
      { token: '--tv-leaf-100', label: 'Leaf 100' },
      { token: '--tv-slate-600', label: 'Slate 600' },
      { token: '--tv-slate-500', label: 'Slate 500', usage: 'Introduction secondary text' },
      { token: '--tv-slate-400', label: 'Slate 400' },
      { token: '--tv-river-600', label: 'River 600' },
      { token: '--tv-river-100', label: 'River 100' },
    ],
  },
]

export const semanticColors: TokenGroup[] = [
  {
    title: 'Surfaces',
    tokens: [
      { token: '--tv-color-bg', label: 'Background', usage: 'Page canvas' },
      { token: '--tv-color-surface', label: 'Surface', usage: 'Cards, inputs, panels' },
      { token: '--tv-color-surface-muted', label: 'Surface muted', usage: 'Section bands, wells' },
      { token: '--tv-color-surface-raised', label: 'Surface raised', usage: 'Popovers, sidebars' },
      { token: '--tv-color-surface-inverse', label: 'Surface inverse', usage: 'Dark woodland sections' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { token: '--tv-color-text', label: 'Text', usage: 'Body and headings' },
      { token: '--tv-color-text-muted', label: 'Text muted', usage: 'Supporting copy' },
      { token: '--tv-color-text-subtle', label: 'Text subtle', usage: 'Placeholders, disabled' },
      { token: '--tv-color-text-inverse', label: 'Text inverse', usage: 'Text on dark surfaces' },
    ],
  },
  {
    title: 'Actions & accents',
    tokens: [
      { token: '--tv-color-action-primary', label: 'Action primary', usage: 'Primary button fill' },
      { token: '--tv-color-action-primary-hover', label: 'Action primary hover' },
      { token: '--tv-color-action-secondary', label: 'Action secondary', usage: 'Secondary button ink' },
      { token: '--tv-color-accent', label: 'Accent', usage: 'Selection, progress, highlights' },
      { token: '--tv-color-focus', label: 'Focus', usage: 'Keyboard focus outline' },
    ],
  },
  {
    title: 'Feedback',
    tokens: [
      { token: '--tv-color-success', label: 'Success' },
      { token: '--tv-color-success-soft', label: 'Success soft' },
      { token: '--tv-color-warning', label: 'Warning' },
      { token: '--tv-color-warning-soft', label: 'Warning soft' },
      { token: '--tv-color-danger', label: 'Danger' },
      { token: '--tv-color-danger-soft', label: 'Danger soft' },
      { token: '--tv-color-info', label: 'Info' },
      { token: '--tv-color-info-soft', label: 'Info soft' },
    ],
  },
  {
    title: 'Introduction',
    tokens: [
      { token: '--tv-color-intro-bg', label: 'Introduction background' },
      { token: '--tv-color-intro-text', label: 'Introduction text' },
      { token: '--tv-color-intro-sage', label: 'Introduction sage' },
      { token: '--tv-color-intro-action', label: 'Introduction action' },
      { token: '--tv-color-intro-action-hover', label: 'Introduction action hover' },
      { token: '--tv-color-intro-muted', label: 'Introduction muted' },
      { token: '--tv-color-intro-border', label: 'Introduction border' },
    ],
  },
]

export const typeScale: TokenSpec[] = [
  { token: '--tv-text-4xl', label: 'Display', usage: 'Hero headlines' },
  { token: '--tv-text-question', label: 'Question', usage: 'Active introduction question' },
  { token: '--tv-text-3xl', label: 'Heading 1', usage: 'Page titles' },
  { token: '--tv-text-2xl', label: 'Heading 2', usage: 'Section titles' },
  { token: '--tv-text-xl', label: 'Heading 3', usage: 'Card and panel titles' },
  { token: '--tv-text-lg', label: 'Lead', usage: 'Intro paragraphs' },
  { token: '--tv-text-md', label: 'Body', usage: 'Default reading size' },
  { token: '--tv-text-sm', label: 'Small', usage: 'Controls, metadata' },
  { token: '--tv-text-xs', label: 'Caption', usage: 'Eyebrows, chips, legal' },
]

export const spaceScale: TokenSpec[] = [
  { token: '--tv-space-1', label: 'Space 1' },
  { token: '--tv-space-2', label: 'Space 2' },
  { token: '--tv-space-3', label: 'Space 3' },
  { token: '--tv-space-4', label: 'Space 4' },
  { token: '--tv-space-5', label: 'Space 5' },
  { token: '--tv-space-6', label: 'Space 6' },
  { token: '--tv-space-8', label: 'Space 8' },
  { token: '--tv-space-10', label: 'Space 10' },
  { token: '--tv-space-12', label: 'Space 12' },
  { token: '--tv-space-16', label: 'Space 16' },
]

export const radiusScale: TokenSpec[] = [
  { token: '--tv-radius-sm', label: 'Small', usage: 'Chips inside inputs, checkboxes' },
  { token: '--tv-radius-md', label: 'Medium', usage: 'Inputs, alerts' },
  { token: '--tv-radius-lg', label: 'Large', usage: 'Cards, tiles' },
  { token: '--tv-radius-xl', label: 'Extra large', usage: 'Media, dialogs' },
  { token: '--tv-radius-pill', label: 'Pill', usage: 'Buttons, badges' },
]

export const shadowScale: TokenSpec[] = [
  { token: '--tv-shadow-sm', label: 'Small', usage: 'Resting controls' },
  { token: '--tv-shadow-md', label: 'Medium', usage: 'Cards, tiles' },
  { token: '--tv-shadow-lg', label: 'Large', usage: 'Dialogs, floating panels' },
  { token: '--tv-shadow-primary', label: 'Primary glow', usage: 'Primary button only' },
  { token: '--tv-focus-ring', label: 'Focus ring', usage: 'Keyboard focus on controls' },
]

export const durations: TokenSpec[] = [
  { token: '--tv-duration-instant', label: 'Instant', usage: 'Color and opacity feedback' },
  { token: '--tv-duration-fast', label: 'Fast', usage: 'Hover, press, small toggles' },
  { token: '--tv-duration-base', label: 'Base', usage: 'Menus, tooltips, accordions' },
  { token: '--tv-duration-slow', label: 'Slow', usage: 'Dialogs, drawers, page transitions' },
  { token: '--tv-duration-gentle', label: 'Gentle', usage: 'Hero entrances, storytelling' },
]

export const easings: TokenSpec[] = [
  { token: '--tv-ease-standard', label: 'Standard', usage: 'Most UI transitions' },
  { token: '--tv-ease-emphasized', label: 'Emphasized', usage: 'Entrances that should feel alive' },
  { token: '--tv-ease-exit', label: 'Exit', usage: 'Elements leaving the screen' },
  { token: '--tv-ease-organic', label: 'Organic', usage: 'Looping botanical motion' },
]

export const keyframes: TokenSpec[] = [
  { token: 'tv-fade-in', label: 'Fade in', usage: 'Overlays, toasts' },
  { token: 'tv-rise-in', label: 'Rise in', usage: 'Section and hero entrances' },
  { token: 'tv-scale-in', label: 'Scale in', usage: 'Popovers, dialogs' },
  { token: 'tv-leaf-sway', label: 'Leaf sway', usage: 'Ambient botanical decoration' },
  { token: 'tv-pulse', label: 'Pulse', usage: 'Live status indicators' },
  { token: 'tv-spin', label: 'Spin', usage: 'Spinners only' },
]

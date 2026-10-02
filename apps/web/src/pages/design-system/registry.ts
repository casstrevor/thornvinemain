import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type EntryStatus = 'stable' | 'beta' | 'planned'
export type Priority = 'now' | 'next' | 'later'

export type PlannedSpec = {
  priority: Priority
  variants: string[]
  anatomy?: string[]
  notes?: string
}

export type DocEntry = {
  kind: 'entry'
  id: string
  title: string
  summary: string
  status: EntryStatus
  Doc?: LazyExoticComponent<ComponentType>
  spec?: PlannedSpec
}

export type DocGroup = {
  kind: 'group'
  id: string
  title: string
  children: DocNode[]
}

export type DocNode = DocEntry | DocGroup

type Loader = () => Promise<{ default: ComponentType }>

const built = (id: string, title: string, summary: string, load: Loader, status: EntryStatus = 'beta'): DocEntry => ({
  kind: 'entry',
  id,
  title,
  summary,
  status,
  Doc: lazy(load),
})

const planned = (id: string, title: string, summary: string, spec: PlannedSpec): DocEntry => ({
  kind: 'entry',
  id,
  title,
  summary,
  status: 'planned',
  spec,
})

const group = (id: string, title: string, children: DocNode[]): DocGroup => ({ kind: 'group', id, title, children })

export const registry: DocNode[] = [
  built('overview', 'Overview', 'How the Thornvine design system is organized and how to use it.', () => import('./docs/foundations/OverviewDoc'), 'stable'),

  group('foundations', 'Foundations', [
    built('color', 'Color tokens', 'Brand palette and semantic color tokens.', () => import('./docs/foundations/ColorDoc')),
    built('typography', 'Typography', 'Typefaces, type scale, and text styles.', () => import('./docs/foundations/TypographyDoc')),
    built('spacing', 'Spacing & layout', 'Spacing scale, widths, and breakpoints.', () => import('./docs/foundations/SpacingDoc')),
    built('shape', 'Radius & elevation', 'Corner radii and shadow depth.', () => import('./docs/foundations/ShapeDoc')),
    built('motion', 'Motion & animation', 'Durations, easing, and shared keyframes.', () => import('./docs/foundations/MotionDoc')),
    built('imagery', 'Imagery', 'Photography direction, ratios, and overlays.', () => import('./docs/foundations/ImageryDoc')),
    built('iconography', 'Iconography', 'The botanical line icon set.', () => import('./docs/foundations/IconographyDoc')),
    planned('theming', 'Theming', 'Dark woodland mode and client white-label themes built by re-pointing semantic tokens.', {
      priority: 'later',
      variants: ['Light (cream)', 'Dark (woodland)', 'Client brand override'],
      notes: 'Requires every component to consume only semantic tokens — keep that rule strict now.',
    }),
  ]),

  group('components', 'Components', [
    group('actions', 'Actions', [
      built('button-primary', 'Primary button', 'The single most important action in a view.', () => import('./docs/components/ButtonPrimaryDoc')),
      built('button-secondary', 'Secondary button', 'Supporting actions beside a primary.', () => import('./docs/components/ButtonSecondaryDoc')),
      built('button-tertiary', 'Tertiary button', 'Low-emphasis text actions.', () => import('./docs/components/ButtonTertiaryDoc')),
      built('icon-button', 'Icon button', 'Compact icon-only actions.', () => import('./docs/components/IconButtonDoc')),
      planned('button-group', 'Button group', 'Related actions joined into one control, such as view toggles.', {
        priority: 'next',
        variants: ['Attached', 'Spaced', 'Segmented (single select)'],
      }),
      planned('menu-button', 'Menu button', 'A button that opens a list of actions.', {
        priority: 'next',
        variants: ['Default', 'Split button'],
        anatomy: ['Trigger', 'Menu surface', 'Menu items', 'Dividers'],
      }),
    ]),

    group('forms', 'Forms', [
      built('text-field', 'Text field', 'Single-line input with label, hint, and error.', () => import('./docs/components/TextFieldDoc')),
      planned('textarea', 'Textarea', 'Multi-line input for project briefs and notes.', {
        priority: 'now',
        variants: ['Default', 'Auto-grow', 'With character count'],
      }),
      planned('select', 'Select', 'Choose one option from a list.', {
        priority: 'now',
        variants: ['Native', 'Custom listbox', 'Searchable (combobox)'],
      }),
      planned('checkbox', 'Checkbox', 'Toggle one or more independent options.', {
        priority: 'now',
        variants: ['Default', 'Indeterminate', 'With description'],
      }),
      planned('radio-group', 'Radio group', 'Choose exactly one option from a small set.', {
        priority: 'now',
        variants: ['Stacked', 'Inline', 'Card (large tap target)'],
      }),
      planned('switch', 'Switch', 'Instantly toggle a setting on or off.', { priority: 'next', variants: ['Default', 'With label and description'] }),
      planned('file-upload', 'File upload', 'Drag-and-drop uploads for portal project files.', {
        priority: 'next',
        variants: ['Dropzone', 'Button trigger', 'File list with progress'],
        notes: 'Pairs with Supabase Storage on the client portal.',
      }),
      planned('date-picker', 'Date picker', 'Pick dates for milestones and scheduling.', { priority: 'later', variants: ['Single date', 'Range'] }),
      planned('form-field', 'Form field', 'Shared label, hint, and error wrapper all inputs compose.', {
        priority: 'now',
        variants: ['Vertical', 'Horizontal'],
        notes: 'Extract from TextField once a second input lands.',
      }),
    ]),

    group('feedback', 'Feedback', [
      built('alert', 'Alert', 'Inline persistent messages.', () => import('./docs/components/AlertDoc')),
      built('badge', 'Badge', 'Compact status labels.', () => import('./docs/components/BadgeDoc')),
      built('spinner', 'Spinner', 'Indeterminate loading indicator.', () => import('./docs/components/SpinnerDoc')),
      planned('toast', 'Toast', 'Brief, auto-dismissing confirmation of an action.', {
        priority: 'next',
        variants: ['Info', 'Success', 'Error with action'],
        anatomy: ['Icon', 'Message', 'Optional action', 'Dismiss'],
      }),
      planned('progress', 'Progress', 'Determinate progress for uploads and project milestones.', {
        priority: 'next',
        variants: ['Linear', 'Circular', 'Stepped milestones'],
      }),
      planned('skeleton', 'Skeleton', 'Shimmering placeholders while content loads.', {
        priority: 'now',
        variants: ['Text lines', 'Avatar', 'Card'],
        notes: 'Uses the tv-shimmer keyframe.',
      }),
    ]),

    group('navigation', 'Navigation', [
      planned('tabs', 'Tabs', 'Switch between related views in the same context.', { priority: 'next', variants: ['Underline', 'Pill'] }),
      planned('breadcrumbs', 'Breadcrumbs', 'Show location within portal hierarchy.', { priority: 'later', variants: ['Default', 'Collapsed'] }),
      planned('pagination', 'Pagination', 'Move through long lists of updates or files.', { priority: 'later', variants: ['Numbered', 'Load more'] }),
      planned('side-nav', 'Side navigation', 'Hierarchical app navigation, like this page’s sidebar.', {
        priority: 'next',
        variants: ['Expanded', 'Collapsed rail', 'Mobile drawer'],
        notes: 'Promote the design-system sidebar into a reusable component.',
      }),
      planned('stepper', 'Stepper', 'Guide people through multi-step flows such as the project brief.', {
        priority: 'next',
        variants: ['Horizontal', 'Vertical'],
      }),
    ]),

    group('overlays', 'Overlays', [
      planned('modal', 'Modal dialog', 'Focused task or confirmation that blocks the page.', {
        priority: 'now',
        variants: ['Default', 'Confirmation', 'Destructive confirmation'],
        anatomy: ['Scrim', 'Panel', 'Title', 'Body', 'Actions', 'Close'],
        notes: 'Use the native <dialog> element for focus trapping.',
      }),
      planned('drawer', 'Drawer', 'Side panel for details without leaving context.', { priority: 'next', variants: ['Right', 'Bottom sheet (mobile)'] }),
      planned('tooltip', 'Tooltip', 'Short label on hover or focus.', { priority: 'next', variants: ['Default', 'Inverse'] }),
      planned('popover', 'Popover', 'Rich floating content anchored to a trigger.', { priority: 'later', variants: ['Default', 'With arrow'] }),
      planned('command-palette', 'Command palette', 'Keyboard-first search and actions for staff.', { priority: 'later', variants: ['Default'] }),
    ]),

    group('data-display', 'Data display', [
      built('card', 'Card', 'Container for a single subject.', () => import('./docs/components/CardDoc')),
      built('media', 'Media', 'Responsive image with ratio and overlay.', () => import('./docs/components/MediaDoc')),
      planned('avatar', 'Avatar', 'Represent people: founders, clients, collaborators.', {
        priority: 'now',
        variants: ['Image', 'Initials', 'Group stack'],
      }),
      planned('table', 'Table', 'Structured data for admin views.', { priority: 'next', variants: ['Default', 'Sortable', 'Selectable rows'] }),
      planned('list', 'List', 'Vertical collections like project updates.', { priority: 'next', variants: ['Simple', 'With media', 'Interactive'] }),
      planned('empty-state', 'Empty state', 'Friendly guidance when there is nothing to show yet.', {
        priority: 'now',
        variants: ['Default', 'With action', 'Illustrated'],
      }),
      planned('stat', 'Stat', 'Highlight a key number with context.', { priority: 'later', variants: ['Default', 'With trend'] }),
      planned('accordion', 'Accordion', 'Progressive disclosure for FAQs and process steps.', { priority: 'next', variants: ['Single', 'Multiple'] }),
    ]),
  ]),

  group('patterns', 'Patterns', [
    planned('page-header', 'Page header', 'Eyebrow, title, intro, and actions at the top of a page.', {
      priority: 'now',
      variants: ['Marketing', 'Portal', 'With breadcrumbs'],
    }),
    planned('auth-card', 'Auth card', 'Sign-in and invite flows on a branded backdrop.', { priority: 'now', variants: ['Sign in', 'Access pending'] }),
    planned('project-tile', 'Project tile', 'Project status summary on the client portal.', { priority: 'now', variants: ['Default', 'Compact'] }),
    planned('brief-form', 'Project brief form', '“Tell us your idea” multi-step intake.', {
      priority: 'next',
      variants: ['Single page', 'Stepped'],
      notes: 'Composes Stepper, TextField, Textarea, Radio group, and File upload.',
    }),
    planned('site-header', 'Site header & footer', 'Marketing navigation and footer.', { priority: 'next', variants: ['Transparent', 'Solid', 'Mobile menu'] }),
  ]),
]

export function flattenEntries(nodes: DocNode[] = registry): DocEntry[] {
  return nodes.flatMap((node) => (node.kind === 'entry' ? [node] : flattenEntries(node.children)))
}

/** Returns the entry and its ancestor groups (for breadcrumbs), or null. */
export function findEntry(id: string, nodes: DocNode[] = registry, trail: DocGroup[] = []): { entry: DocEntry; trail: DocGroup[] } | null {
  for (const node of nodes) {
    if (node.kind === 'entry') {
      if (node.id === id) return { entry: node, trail }
    } else {
      const found = findEntry(id, node.children, [...trail, node])
      if (found) return found
    }
  }
  return null
}

export function countByStatus() {
  const counts: Record<EntryStatus, number> = { stable: 0, beta: 0, planned: 0 }
  for (const entry of flattenEntries()) counts[entry.status] += 1
  return counts
}

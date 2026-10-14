import { useMemo, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '../../design-system'
import { registry, type DocGroup, type DocNode } from './registry'

type SideNavProps = {
  onNavigate?: () => void
}

function filterNodes(nodes: DocNode[], query: string, hidePlanned: boolean): DocNode[] {
  const q = query.trim().toLowerCase()
  return nodes.flatMap<DocNode>((node) => {
    if (node.kind === 'entry') {
      if (hidePlanned && node.status === 'planned') return []
      if (q && !`${node.title} ${node.summary}`.toLowerCase().includes(q)) return []
      return [node]
    }
    const children = filterNodes(node.children, query, hidePlanned)
    return children.length ? [{ ...node, children }] : []
  })
}

export function SideNav({ onNavigate }: SideNavProps) {
  const [query, setQuery] = useState('')
  const [hidePlanned, setHidePlanned] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set())

  const nodes = useMemo(() => filterNodes(registry, query, hidePlanned), [query, hidePlanned])
  const filtering = query.trim().length > 0

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const renderNodes = (list: DocNode[], depth: number) => (
    <ul className={`ds-nav__list ds-nav__list--depth-${depth}`}>
      {list.map((node) =>
        node.kind === 'entry' ? (
          <li key={node.id}>
            <NavLink
              to={node.id === 'overview' ? '/design-system' : `/design-system/${node.id}`}
              end
              className={({ isActive }) => ['ds-nav__link', isActive && 'is-active'].filter(Boolean).join(' ')}
              onClick={onNavigate}
            >
              <span className={`ds-nav__status ds-nav__status--${node.status}`} aria-hidden="true" />
              <span className="ds-nav__label">{node.title}</span>
              {node.status === 'planned' ? <span className="sr-only">(planned)</span> : null}
            </NavLink>
          </li>
        ) : (
          <GroupItem
            key={node.id}
            group={node}
            depth={depth}
            open={filtering || !collapsed.has(node.id)}
            onToggle={() => toggle(node.id)}
          >
            {renderNodes(node.children, depth + 1)}
          </GroupItem>
        ),
      )}
    </ul>
  )

  return (
    <nav className="ds-nav" aria-label="Design system">
      <div className="ds-nav__tools">
        <label className="ds-nav__search">
          <Icon name="search" size="sm" />
          <span className="sr-only">Filter components</span>
          <input type="search" placeholder="Filter…" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="ds-nav__toggle">
          <input type="checkbox" checked={hidePlanned} onChange={(event) => setHidePlanned(event.target.checked)} />
          Hide planned
        </label>
      </div>

      {nodes.length ? renderNodes(nodes, 0) : <p className="ds-nav__empty">No matches for “{query}”.</p>}

      <div className="ds-nav__legend" aria-hidden="true">
        <span>
          <span className="ds-nav__status ds-nav__status--stable" /> Stable
        </span>
        <span>
          <span className="ds-nav__status ds-nav__status--beta" /> Beta
        </span>
        <span>
          <span className="ds-nav__status ds-nav__status--planned" /> Planned
        </span>
      </div>
    </nav>
  )
}

function GroupItem({
  group,
  depth,
  open,
  onToggle,
  children,
}: {
  group: DocGroup
  depth: number
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  const panelId = `ds-nav-${group.id}`
  return (
    <li className={`ds-nav__group ds-nav__group--depth-${depth}`}>
      <button type="button" className="ds-nav__group-toggle" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <Icon name="chevron-right" size="sm" className="ds-nav__chevron" />
        {group.title}
      </button>
      <div id={panelId} hidden={!open}>
        {children}
      </div>
    </li>
  )
}

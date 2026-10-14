import type { ReactNode } from 'react'

export function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="ds-section">
      <header className="ds-section__head">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </section>
  )
}

export function Preview({
  children,
  surface = 'light',
  code,
  label,
  stack = false,
}: {
  children: ReactNode
  surface?: 'light' | 'muted' | 'dark'
  code?: string
  label?: string
  stack?: boolean
}) {
  return (
    <figure className="ds-preview">
      {label ? <figcaption className="ds-preview__label">{label}</figcaption> : null}
      <div className={['ds-preview__stage', `ds-preview__stage--${surface}`, stack && 'ds-preview__stage--stack'].filter(Boolean).join(' ')}>
        {children}
      </div>
      {code ? (
        <pre className="ds-preview__code">
          <code>{code.trim()}</code>
        </pre>
      ) : null}
    </figure>
  )
}

export type PropRow = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>
                <code>{row.type}</code>
              </td>
              <td>{row.defaultValue ? <code>{row.defaultValue}</code> : '—'}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="ds-dodont">
      <div className="ds-dodont__col ds-dodont__col--do">
        <h3>Do</h3>
        <ul>
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="ds-dodont__col ds-dodont__col--dont">
        <h3>Don&apos;t</h3>
        <ul>
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function TokenName({ children }: { children: string }) {
  return <code className="ds-token-name">{children}</code>
}

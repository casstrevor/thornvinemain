import { useState } from 'react'
import { TextField } from '../../../../design-system'
import { DocSection, Preview, PropsTable } from '../../doc-kit/DocKit'

export default function TextFieldDoc() {
  const [email, setEmail] = useState('')
  const invalid = email.length > 0 && !email.includes('@')

  return (
    <>
      <DocSection title="Default" description="Single-line input with a persistent label, optional hint, and inline error.">
        <Preview stack code={`<TextField label="Project name" hint="You can change this later." />`}>
          <TextField label="Project name" placeholder="Lawn-care portal" hint="You can change this later." />
        </Preview>
      </DocSection>

      <DocSection title="Validation" description="Type an address without an @ to see the error state.">
        <Preview stack>
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={invalid ? 'Enter an email address like name@example.com.' : undefined}
            hint="We’ll only use this to reply to your brief."
          />
        </Preview>
      </DocSection>

      <DocSection title="Disabled">
        <Preview stack>
          <TextField label="Workspace" value="Thornvine" disabled readOnly />
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          rows={[
            { name: 'label', type: 'string', description: 'Required visible label.' },
            { name: 'hint', type: 'ReactNode', description: 'Helper text; hidden while an error shows.' },
            { name: 'error', type: 'ReactNode', description: 'Error message; sets aria-invalid.' },
            { name: 'hideLabel', type: 'boolean', defaultValue: 'false', description: 'Visually hide the label (keeps it accessible).' },
            { name: '...rest', type: 'InputHTMLAttributes', description: 'Native input attributes.' },
          ]}
        />
      </DocSection>
    </>
  )
}

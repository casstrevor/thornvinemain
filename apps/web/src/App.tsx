import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<'checking' | 'configured' | 'missing'>(
    'checking',
  )

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    setStatus(url && key ? 'configured' : 'missing')
  }, [])

  return (
    <main className="app">
      <h1>Thornvine</h1>
      <p className="tagline">React + Supabase monorepo skeleton</p>
      <p className={`status status--${status}`}>
        {status === 'checking' && 'Checking Supabase config…'}
        {status === 'configured' && 'Supabase client configured'}
        {status === 'missing' &&
          'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to apps/web/.env.local'}
      </p>
      <p className="hint">
        Client ready at <code>src/lib/supabase.ts</code>
      </p>
    </main>
  )
}

export default App

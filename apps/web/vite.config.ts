import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const monorepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

/** Project Pages site is served from /thornvinemain/. Local dev stays at /. */
function pagesBase(): string {
  const fromEnv = process.env.VITE_BASE_PATH?.trim()
  if (!fromEnv) return '/'
  const withLeadingSlash = fromEnv.startsWith('/') ? fromEnv : `/${fromEnv}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: pagesBase(),
  plugins: [react()],
  // Load VITE_* from monorepo root `.env` / `.env.local`
  envDir: monorepoRoot,
})
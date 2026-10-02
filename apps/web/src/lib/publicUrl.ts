/** Public-folder URL that respects Vite `base` (GitHub Pages project site). */
export function publicUrl(path: string): string {
  const file = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${file}`
}

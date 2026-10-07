/** Resolve a CSS custom property from :root so docs always reflect tokens.css. */
export function readToken(token: string) {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim()
}

export { cn } from "cn"

export type NavItem = { url: string }

/** Exact match or a direct child segment (`/a/b` matches `/a/b/c`, never `/a/bc`). */
export function isPathActive(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`)
}

/**
 * Most specific (longest) matching item wins, so a nested link such as
 * "Add Service" stays selected instead of its parent "My Services".
 */
export function findActiveItem<T extends NavItem>(
  pathname: string,
  items: T[]
): T | null {
  let active: T | null = null

  for (const item of items) {
    if (!isPathActive(pathname, item.url)) continue
    if (!active || item.url.length > active.url.length) active = item
  }

  return active
}

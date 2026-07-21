/**
 * Resolve a path that lives under public/ into a URL that works regardless of
 * the deployed base path (root, or a GitHub Pages /<repo>/ sub-path).
 *
 * Example: asset('sfx/win.ogg') -> '/<repo>/sfx/win.ogg' in production.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}

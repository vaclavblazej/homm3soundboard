import { defineConfig } from 'vite';

// Relative base so the built site works under any GitHub Pages sub-path
// (e.g. https://<user>.github.io/<repo>/) without hardcoding the repo name.
// There is no client-side routing, so a relative base is safe.
export default defineConfig({
  base: './',
});

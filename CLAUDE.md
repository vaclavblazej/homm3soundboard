# CLAUDE.md

Quick orientation for working in this repo. See `README.md` for user-facing docs
and `PLAN.md` for the roadmap and decisions.

## What this is

A single-page **Heroes of Might & Magic III soundboard**. Config-driven: sections
of fixed-size buttons that play a short sound (bundled file or a YouTube subclip).
Pure HTML + TypeScript, bundled with **Vite**, deployed static to **GitHub Pages**.
No runtime framework.

## Commands

```bash
npm install       # once; commit package-lock.json (CI uses `npm ci`)
npm run dev       # dev server + HMR
npm run build     # tsc --noEmit && vite build → dist/
npm run typecheck # tsc --noEmit
npm run preview   # serve built dist/
```

## Where things live

| Path                        | Role                                                     |
| --------------------------- | -------------------------------------------------------- |
| `src/config/sections.ts`    | **The content.** Edit this to add/reorder sections+buttons. |
| `src/config/index.ts`       | Assembles the `SoundboardConfig`.                        |
| `src/types.ts`              | Config schema. Pure data types, no DOM/runtime logic.    |
| `src/audio/player.ts`       | Orchestrator: `play(source)` / `stopCurrent()`.          |
| `src/audio/fileSource.ts`   | Bundled-file playback (HTMLAudioElement, cached by src). |
| `src/audio/youtubeSource.ts`| YouTube IFrame subclip playback (one player cached per video id). |
| `src/ui/render.ts`          | Builds sections + grids from config.                     |
| `src/ui/button.ts`          | Builds one button element.                               |
| `src/util.ts`               | `asset()` — resolves public/ paths against the base URL. |
| `src/styles.css`            | Grid layout + theming.                                   |
| `public/{img,sfx}/`         | Bundled images / audio files.                            |
| `.github/workflows/deploy.yml` | Builds and publishes `dist/` to Pages on push to `main`. |

## Key concepts

- **Config drives everything.** Adding content = editing `sections.ts` only.
  A `SoundSource` is a discriminated union:
  `{ type:'file', src }` or `{ type:'youtube', id, start?, end? }`.
- **Sizing.** `--unit` in `styles.css` ≈ 2 cm; a button's `size:{w,h}` maps to
  `grid-column/row: span N`. Default 1×1.
- **Lazy + cached.** Audio elements and YouTube players are created on first
  press and reused. First play fetches; replays are instant.
- **One sound at a time.** `player.play()` calls `stopCurrent()` first. To allow
  overlap, drop the `activeStop` bookkeeping in `audio/player.ts`.
- **Base path.** Vite `base: './'` (relative), so it works under any
  `github.io/<repo>/` path. Always build asset URLs via `asset()`.

## Gotchas

- YouTube clips: end time is enforced by a 100 ms polling timer in
  `youtubeSource.ts` (there is no native "stop at" event). The `#yt-host`
  container in `index.html` is positioned off-screen, **not** `display:none`
  (hiding it breaks playback). ToS caveats: see `PLAN.md §6`.
- CI uses `npm ci`, so `package-lock.json` must be committed and in sync.
- The `sections.ts` sample still has `TODO_`/placeholder `sfx/*.ogg` sources for
  the effect sections; Main Music + Victory are wired to a real OST video.

# Project Plan — HoMM III Soundboard

## 1. Goal

A single-page soundboard for Heroes of Might & Magic III: sections of
fixed-size buttons that each play a short sound (a bundled file or a subclip of
a YouTube video). Pure HTML + TypeScript, built with Vite, deployed to GitHub
Pages via CI. Content is defined in code and easy to reorder.

## 2. Decisions (locked in)

| Area          | Choice                                                          |
| ------------- | --------------------------------------------------------------- |
| Tooling       | Vite + TypeScript (static output, no runtime framework)         |
| Sound sources | Hybrid per-button: `file` (bundled) or `youtube` (subclip)      |
| Content       | Structured sample sections with `TODO_` placeholders to fill in |
| Assets        | Committed under `public/`; GitHub Pages via Actions             |
| Base path     | Relative (`base: './'`) — repo-name agnostic                    |
| Playback      | One sound at a time (a new press stops the previous)            |

## 3. Architecture

```
config (data) ──> renderBoard ──> button elements
                                        │ click
                                        ▼
                                  audio/player.play(source)
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                                 ▼
                  FilePlayer                        YouTubePlayer
             (HTMLAudioElement,                  (IFrame API, one hidden
              cached by src)                      player cached per video id)
```

- **Config-driven**: `src/config/sections.ts` is the only file to edit for
  content. Types in `src/types.ts` keep it a pure data description.
- **Lazy + cached**: audio elements and YouTube players are created on first
  press and reused afterwards, so first play fetches, replays are instant.
- **Layout**: CSS grid with fixed `--unit` (~2 cm) tracks; buttons span
  `w`×`h` units via `grid-column/row: span N` with dense packing. Sections are
  full-width; a centered `max-width` container keeps wide screens readable.

## 4. Status

**Done (scaffold):**
- Build tooling, TypeScript config, Vite config, `index.html`.
- Full playback engine (file + YouTube subclip), lazy-loaded and cached.
- Config-driven rendering, button layout, theming.
- Sample sections in the requested order with placeholders.
- GitHub Pages deploy workflow; asset folders with instructions.

**Next:**
1. `npm install` and commit `package-lock.json` (CI uses `npm ci`).
2. Verify locally with `npm run dev`; confirm layout/sizing feels right.
3. Populate real content (below).
4. Push to `main`, enable Pages → GitHub Actions.

## 5. Populating content

Replace every `TODO_*` id / path in `src/config/sections.ts`.

- **Bundled files** (best for short effects — instant, precise, offline):
  put OGG/MP3 in `public/sfx/…`, reference as
  `{ type: 'file', src: 'sfx/…' }`. Source the original game SFX (e.g. from a
  legally-owned copy, or trimmed clips) and keep them short.
- **YouTube subclips** (best for long music): find a video, note the video id
  and the `start`/`end` seconds of the passage, reference as
  `{ type: 'youtube', id: '…', start: 42, end: 61 }`.
- **Images**: drop PNGs in `public/img/…`, reference with `image: 'img/…'`.

Ordering guideline is encoded in the sample: main music → important effects →
battle → exploration → town → rare/misc.

## 6. Known constraints / risks

- **YouTube ToS**: fully hidden/inaudible players and audio-only extraction are
  discouraged. This app uses a real, audible player positioned off-screen, and
  favors bundled files for short effects. Treat YouTube as the path for long
  music tracks. If reliability/ToS becomes a concern, host trimmed audio files
  instead.
- **First-play latency**: YouTube clips incur ~1–2 s on first load of the API
  and each video; bundled files a brief fetch. Both are cached afterwards.
- **Autoplay policy**: playback is always triggered by a user click, so
  browser autoplay restrictions are satisfied.
- **Copyright**: game audio/images are Ubisoft/3DO property. Keep the
  deployment personal/fan-use; do not claim ownership.

## 7. Possible enhancements (later)

- Global stop button and a "now playing" indicator.
- Volume control and per-button volume.
- Optional overlapping playback (music bed + effects) — the engine already
  isolates sources, so this is a small change in `audio/player.ts`.
- Search/filter across buttons; keyboard shortcuts.
- Loading spinner on a button while its source warms up.
- Split `sections.ts` into per-topic files if it grows large.
```

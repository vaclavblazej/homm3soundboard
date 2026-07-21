# HoMM III Soundboard

A single-page, configurable soundboard for Heroes of Might & Magic III. Pure
HTML + TypeScript, bundled with Vite, deployable to GitHub Pages.

- Sections stack top-to-bottom and span the page width; content sits in a
  centered, max-width container.
- Each section is a grid of fixed-size buttons (1×1 ≈ 2 cm; any `w`×`h`).
- Buttons show a top title and an optional image that fills the rest.
- Sounds are **bundled files** or **YouTube subclips**, loaded lazily on first
  press and cached for instant replay.

## Getting started

```bash
npm install        # also generates package-lock.json — commit it
npm run dev        # http://localhost:5173 with hot reload
npm run build      # -> dist/ (static, ready for Pages)
npm run preview    # serve the built dist/ locally
npm run typecheck  # tsc --noEmit
```

## Editing the board

All content lives in [`src/config/sections.ts`](src/config/sections.ts). Add or
reorder sections and buttons there — no other code changes needed. See the
comments at the top of that file for the schema, and [PLAN.md](PLAN.md) for the
roadmap and how to source real HoMM III sounds/images.

Put bundled assets in `public/sfx/` and `public/img/` (see the READMEs there).

## Deployment

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on
every push to `main`. One-time setup: in the repo, **Settings → Pages → Build
and deployment → Source: GitHub Actions**. The Vite `base` is relative, so it
works under any `https://<user>.github.io/<repo>/` path without configuration.

## Project layout

```
index.html                 app shell (#board + off-screen #yt-host)
src/
  main.ts                  entry: renders the board from config
  types.ts                 config type definitions
  util.ts                  asset() base-path helper
  config/
    index.ts               assembles the SoundboardConfig
    sections.ts            *** THE CONTENT YOU EDIT ***
  audio/
    player.ts              orchestrator: play()/stopCurrent(), one at a time
    fileSource.ts          bundled-file playback (HTMLAudioElement, cached)
    youtubeSource.ts       YouTube IFrame subclip playback (cached players)
  ui/
    render.ts              builds sections + grids
    button.ts              builds one button
  styles.css               layout + theming
public/{img,sfx}/          bundled images and audio
.github/workflows/         Pages deploy
```

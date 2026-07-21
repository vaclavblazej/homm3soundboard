# Audio files

Drop bundled sound effects here. Reference them from `src/config/sections.ts`
with paths relative to `public/`, e.g. a file at `public/sfx/battle/win.ogg` is
referenced as:

```ts
sound: { type: 'file', src: 'sfx/battle/win.ogg' }
```

Recommended format: **OGG Vorbis** or **MP3**, mono, trimmed to just the effect
(keep files small — these load lazily on first press and are cached).

Subfolders (`battle/`, `map/`, `town/`, `misc/`) are just organization; use any
structure you like as long as the `src` paths match.

# Images

Drop button images here. Reference them from `src/config/sections.ts` with
paths relative to `public/`, e.g. a file at `public/img/angel.png` is referenced
as:

```ts
image: 'img/angel.png'
```

The image is shown below the button title and scales to fill the remaining
space (`object-fit: contain`, so it is never distorted). Transparent PNGs work
well against the dark panel background.

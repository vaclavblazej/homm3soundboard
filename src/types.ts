// ---------------------------------------------------------------------------
// Core configuration types for the soundboard.
// Everything the app renders is driven by a `SoundboardConfig` (see
// src/config/sections.ts). Keep this file free of any runtime/DOM logic so the
// config stays a pure, portable data description.
// ---------------------------------------------------------------------------

/** A sound bundled with the deployed site (mp3/ogg under public/sfx/…). */
export interface SoundFileSource {
  type: 'file';
  /** Path relative to the public/ root, e.g. `sfx/battle/win.ogg`. */
  src: string;
}

/** A subclip of a YouTube video, played via the IFrame Player API. */
export interface SoundYouTubeSource {
  type: 'youtube';
  /** The 11-character YouTube video id (NOT the full URL). */
  id: string;
  /** Start of the clip, in seconds. Defaults to 0. */
  start?: number;
  /** End of the clip, in seconds. If omitted, plays to the end of the video. */
  end?: number;
}

export type SoundSource = SoundFileSource | SoundYouTubeSource;

/** Grid footprint of a button, measured in grid units (1 unit ≈ 2 cm). */
export interface ButtonSize {
  /** Width in units. Default 1. */
  w: number;
  /** Height in units. Default 1. */
  h: number;
}

export interface ButtonConfig {
  /** Top-adjusted label shown on the button. */
  title: string;
  /** What plays when the button is pressed. */
  sound: SoundSource;
  /** Optional image path relative to public/, e.g. `img/angel.png`. */
  image?: string;
  /** Optional fixed size in grid units. Defaults to { w: 1, h: 1 }. */
  size?: ButtonSize;
}

export interface SectionConfig {
  /** Heading shown above the section's button grid. */
  title: string;
  /** Optional one-line description under the heading. */
  description?: string;
  buttons: ButtonConfig[];
}

export interface SoundboardConfig {
  /** Sections are rendered top-to-bottom in array order. */
  sections: SectionConfig[];
}

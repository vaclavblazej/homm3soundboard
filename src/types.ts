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
  /** Repeat from the start when it finishes. Defaults to false. */
  loop?: boolean;
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
  /** Repeat the clip (seek back to `start`) when it reaches its end. Defaults to false. */
  loop?: boolean;
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

/**
 * A group keeps a set of buttons together as one atomic block in the section
 * grid. It occupies `size` grid units and lays its buttons out on an internal
 * grid aligned to the same unit + gap, so wrapping moves the whole block at
 * once instead of splitting the buttons across lines.
 */
export interface GroupConfig {
  /** Footprint of the whole group in grid units (e.g. { w: 4, h: 2 }). */
  size: ButtonSize;
  /** Buttons packed inside the group (typically 1x1). */
  buttons: ButtonConfig[];
}

/** A section entry is either a single button or a group of buttons. */
export type SectionEntry = ButtonConfig | GroupConfig;

/** Narrowing helper: distinguishes a group from a single button. */
export function isGroup(entry: SectionEntry): entry is GroupConfig {
  return 'buttons' in entry;
}

export interface SectionConfig {
  /** Optional heading shown above the section's button grid. Omit for none. */
  title?: string;
  /** Optional one-line description under the heading. */
  description?: string;
  /** Buttons and/or groups, laid out left-to-right in the section grid. */
  items: SectionEntry[];
}

export interface SoundboardConfig {
  /** Sections are rendered top-to-bottom in array order. */
  sections: SectionConfig[];
}

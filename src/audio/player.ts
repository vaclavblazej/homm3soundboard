import type { SoundSource } from '../types';
import { FilePlayer } from './fileSource';
import { YouTubePlayer } from './youtubeSource';

// Single shared instance of each backend; both cache their resources lazily.
const filePlayer = new FilePlayer();
const youtubePlayer = new YouTubePlayer();

// The soundboard plays one sound at a time: pressing a button stops whatever
// was playing before. (Change this if you want overlapping playback.)
let activeStop: (() => void) | null = null;
let activeSource: SoundSource | null = null;

// Listeners are notified whenever the active source changes (start / stop /
// natural end). The UI uses this to keep play-indicators in sync.
const listeners = new Set<(source: SoundSource | null) => void>();

function setActive(source: SoundSource | null, stop: (() => void) | null): void {
  activeSource = source;
  activeStop = stop;
  for (const listener of listeners) listener(activeSource);
}

/** Subscribe to active-source changes. Returns an unsubscribe function. */
export function subscribe(listener: (source: SoundSource | null) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Whether `source` is the one currently playing (by object identity). */
export function isPlaying(source: SoundSource): boolean {
  return activeSource === source;
}

export function stopCurrent(): void {
  const stop = activeStop;
  if (stop) {
    // Clear state first so a stray onEnded from the backend is a no-op.
    setActive(null, null);
    stop();
  }
}

export async function play(source: SoundSource): Promise<void> {
  stopCurrent();

  // Backends call this when playback finishes on its own; clear only if this
  // source is still the active one (a newer press may have superseded it).
  const onEnded = () => {
    if (activeSource === source) setActive(null, null);
  };

  let stop: () => void;
  switch (source.type) {
    case 'file':
      stop = await filePlayer.play(source, onEnded);
      break;
    case 'youtube':
      stop = await youtubePlayer.play(source, onEnded);
      break;
  }

  // A newer press may have started (and finished awaiting) while we awaited;
  // only publish if nothing superseded us in the meantime.
  if (activeSource === null || activeSource === source) {
    setActive(source, stop);
  }
}

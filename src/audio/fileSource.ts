import type { SoundFileSource } from '../types';
import { asset } from '../util';

/**
 * Plays bundled audio files via HTMLAudioElement.
 *
 * Elements are created lazily on first use and cached by src, so a repeated
 * press replays instantly without re-fetching.
 */
export class FilePlayer {
  private cache = new Map<string, HTMLAudioElement>();

  /**
   * Starts playback and returns a stop() callback. `onEnded` fires when the
   * clip reaches its end on its own (not when stop() is called).
   */
  async play(source: SoundFileSource, onEnded: () => void): Promise<() => void> {
    let audio = this.cache.get(source.src);
    if (!audio) {
      audio = new Audio(asset(source.src));
      audio.preload = 'auto';
      this.cache.set(source.src, audio);
    }

    const el = audio;
    el.loop = source.loop ?? false;
    el.onended = onEnded;
    el.currentTime = 0;
    try {
      await el.play();
    } catch (err) {
      console.error(`Failed to play file "${source.src}":`, err);
    }

    return () => {
      el.onended = null;
      el.pause();
      el.currentTime = 0;
    };
  }
}

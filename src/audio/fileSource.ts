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

  /** Returns a stop() callback for the sound just started. */
  async play(source: SoundFileSource): Promise<() => void> {
    let audio = this.cache.get(source.src);
    if (!audio) {
      audio = new Audio(asset(source.src));
      audio.preload = 'auto';
      this.cache.set(source.src, audio);
    }

    audio.currentTime = 0;
    try {
      await audio.play();
    } catch (err) {
      console.error(`Failed to play file "${source.src}":`, err);
    }

    const el = audio;
    return () => {
      el.pause();
      el.currentTime = 0;
    };
  }
}

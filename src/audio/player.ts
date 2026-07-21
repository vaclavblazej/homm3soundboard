import type { SoundSource } from '../types';
import { FilePlayer } from './fileSource';
import { YouTubePlayer } from './youtubeSource';

// Single shared instance of each backend; both cache their resources lazily.
const filePlayer = new FilePlayer();
const youtubePlayer = new YouTubePlayer();

// The soundboard plays one sound at a time: pressing a button stops whatever
// was playing before. (Change this if you want overlapping playback.)
let activeStop: (() => void) | null = null;

export function stopCurrent(): void {
  if (activeStop) {
    activeStop();
    activeStop = null;
  }
}

export async function play(source: SoundSource): Promise<void> {
  stopCurrent();
  switch (source.type) {
    case 'file':
      activeStop = await filePlayer.play(source);
      break;
    case 'youtube':
      activeStop = await youtubePlayer.play(source);
      break;
  }
}

import type { SoundYouTubeSource } from '../types';

/**
 * Plays subclips of YouTube videos via the IFrame Player API.
 *
 * The API script is injected once (lazily, on first YouTube press). One hidden
 * player is created per distinct video id and cached, so replays are fast.
 *
 * NOTE ON TERMS OF SERVICE: YouTube's ToS discourages fully hidden/inaudible
 * players and audio-only extraction. The player here is real and audible; it is
 * merely positioned off-screen. Prefer bundled `file` sources for short effects
 * and reserve YouTube for long music tracks. See PLAN.md for details.
 */

let apiReady: Promise<void> | null = null;

function loadApi(): Promise<void> {
  if (apiReady) return apiReady;
  apiReady = new Promise<void>((resolve) => {
    // The API calls this global when it has finished loading.
    (window as unknown as { onYouTubeIframeAPIReady: () => void }).onYouTubeIframeAPIReady =
      () => resolve();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiReady;
}

export class YouTubePlayer {
  private ready = new Map<string, Promise<YT.Player>>();
  private endTimer: number | null = null;
  // Callback for the clip currently playing; invoked once when it ends on its
  // own. Only one clip plays at a time, so a single field suffices.
  private onEnded: (() => void) | null = null;
  // Looping state for the clip currently playing: when `loop` is set, reaching
  // the end seeks back to `loopStart` and keeps playing instead of finishing.
  private loop = false;
  private loopStart = 0;

  private host(): HTMLElement {
    const el = document.getElementById('yt-host');
    if (!el) throw new Error('#yt-host container is missing from the page');
    return el;
  }

  private getPlayer(id: string): Promise<YT.Player> {
    const existing = this.ready.get(id);
    if (existing) return existing;

    const created = loadApi().then(
      () =>
        new Promise<YT.Player>((resolve) => {
          const div = document.createElement('div');
          div.id = `yt-${id}`;
          this.host().appendChild(div);

          const player = new YT.Player(div.id, {
            videoId: id,
            width: '320',
            height: '180',
            playerVars: {
              controls: 0,
              disablekb: 1,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
            },
            events: {
              onReady: () => resolve(player),
              onStateChange: (e) => {
                // The video reached its natural end (no explicit `end` clip):
                // loop back to the start, or finish if not looping.
                if (e.data === YT.PlayerState.ENDED) {
                  if (this.loop) {
                    player.seekTo(this.loopStart, true);
                    player.playVideo();
                  } else {
                    this.finish();
                  }
                }
              },
            },
          });
        }),
    );

    this.ready.set(id, created);
    return created;
  }

  private clearEndTimer(): void {
    if (this.endTimer !== null) {
      clearInterval(this.endTimer);
      this.endTimer = null;
    }
  }

  /** Playback finished on its own: stop the timer and notify the caller once. */
  private finish(): void {
    this.clearEndTimer();
    const cb = this.onEnded;
    this.onEnded = null;
    cb?.();
  }

  /**
   * Starts playback and returns a stop() callback. `onEnded` fires when the
   * clip reaches its end (or the video ends) on its own — not on stop().
   */
  async play(source: SoundYouTubeSource, onEnded: () => void): Promise<() => void> {
    const player = await this.getPlayer(source.id);
    const start = source.start ?? 0;

    this.clearEndTimer();
    this.onEnded = onEnded;
    this.loop = source.loop ?? false;
    this.loopStart = start;
    player.seekTo(start, true);
    player.playVideo();

    if (source.end != null) {
      const end = source.end;
      this.endTimer = window.setInterval(() => {
        if (player.getCurrentTime() >= end) {
          // Reached the clip's end: loop back to the start, or finish.
          if (this.loop) {
            player.seekTo(start, true);
          } else {
            player.pauseVideo();
            this.finish();
          }
        }
      }, 100);
    }

    return () => {
      this.onEnded = null;
      this.loop = false;
      this.clearEndTimer();
      player.pauseVideo();
    };
  }
}

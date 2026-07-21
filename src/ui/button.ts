import type { ButtonConfig } from '../types';
import { asset } from '../util';
import { play, stopCurrent, isPlaying, subscribe } from '../audio/player';

/**
 * Build a single soundboard button.
 *
 * Layout: title is top-adjusted; the optional image sits below it and grows to
 * fill the remaining space (object-fit: contain keeps it undistorted). Size is
 * expressed in grid units via `grid-column/row: span N`.
 */
export function createButton(cfg: ButtonConfig): HTMLElement {
  const w = cfg.size?.w ?? 1;
  const h = cfg.size?.h ?? 1;

  const btn = document.createElement('button');
  btn.className = 'sb-button';
  btn.type = 'button';
  btn.style.gridColumn = `span ${w}`;
  btn.style.gridRow = `span ${h}`;
  btn.title = cfg.title;

  const title = document.createElement('span');
  title.className = 'sb-button__title';
  title.textContent = cfg.title;
  btn.appendChild(title);

  if (cfg.image) {
    // Image fills the whole button; title + indicator are overlaid on top.
    btn.classList.add('has-image');
    const img = document.createElement('img');
    img.className = 'sb-button__img';
    img.src = asset(cfg.image);
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);
  }

  // Play-indicator pinned to the bottom: an equalizer that animates while this
  // button's sound is playing (see .sb-button__indicator in styles.css).
  const indicator = document.createElement('span');
  indicator.className = 'sb-button__indicator';
  indicator.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 3; i++) indicator.appendChild(document.createElement('i'));
  btn.appendChild(indicator);

  // Click toggles: start this sound, or stop it if it is the one playing.
  btn.addEventListener('click', () => {
    if (isPlaying(cfg.sound)) {
      stopCurrent();
    } else {
      void play(cfg.sound);
    }
  });

  // Keep the indicator in sync with the active source (start / stop / end).
  subscribe(() => {
    btn.classList.toggle('is-playing', isPlaying(cfg.sound));
  });

  return btn;
}

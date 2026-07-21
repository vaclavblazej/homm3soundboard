import type { ButtonConfig } from '../types';
import { asset } from '../util';
import { play } from '../audio/player';

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
    const img = document.createElement('img');
    img.className = 'sb-button__img';
    img.src = asset(cfg.image);
    img.alt = '';
    img.loading = 'lazy';
    btn.appendChild(img);
  }

  btn.addEventListener('click', () => {
    btn.classList.add('is-playing');
    window.setTimeout(() => btn.classList.remove('is-playing'), 300);
    void play(cfg.sound);
  });

  return btn;
}

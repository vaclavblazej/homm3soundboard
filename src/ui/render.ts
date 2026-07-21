import type { SoundboardConfig } from '../types';
import { createButton } from './button';

/** Render all sections (top-to-bottom) and their button grids into `root`. */
export function renderBoard(root: HTMLElement, config: SoundboardConfig): void {
  root.replaceChildren();

  for (const section of config.sections) {
    const sec = document.createElement('section');
    sec.className = 'section';

    const inner = document.createElement('div');
    inner.className = 'container';

    const heading = document.createElement('h2');
    heading.className = 'section__title';
    heading.textContent = section.title;
    inner.appendChild(heading);

    if (section.description) {
      const desc = document.createElement('p');
      desc.className = 'section__desc';
      desc.textContent = section.description;
      inner.appendChild(desc);
    }

    const grid = document.createElement('div');
    grid.className = 'grid';
    for (const button of section.buttons) {
      grid.appendChild(createButton(button));
    }
    inner.appendChild(grid);

    sec.appendChild(inner);
    root.appendChild(sec);
  }
}

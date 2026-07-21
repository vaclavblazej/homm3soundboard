import type { GroupConfig, SoundboardConfig } from '../types';
import { isGroup } from '../types';
import { createButton } from './button';

/**
 * Build a group: a single grid item (spanning `size` units) that is itself a
 * grid, sharing the same unit + gap so its buttons line up exactly with the
 * outer grid while never being split apart by wrapping.
 */
function createGroup(cfg: GroupConfig): HTMLElement {
  const group = document.createElement('div');
  group.className = 'group';
  group.style.gridColumn = `span ${cfg.size.w}`;
  group.style.gridRow = `span ${cfg.size.h}`;
  group.style.gridTemplateColumns = `repeat(${cfg.size.w}, var(--unit))`;
  for (const button of cfg.buttons) {
    group.appendChild(createButton(button));
  }
  return group;
}

/** Render all sections (top-to-bottom) and their button grids into `root`. */
export function renderBoard(root: HTMLElement, config: SoundboardConfig): void {
  root.replaceChildren();

  for (const section of config.sections) {
    const sec = document.createElement('section');
    sec.className = 'section';

    const inner = document.createElement('div');
    inner.className = 'container';

    if (section.title) {
      const heading = document.createElement('h2');
      heading.className = 'section__title';
      heading.textContent = section.title;
      inner.appendChild(heading);
    }

    if (section.description) {
      const desc = document.createElement('p');
      desc.className = 'section__desc';
      desc.textContent = section.description;
      inner.appendChild(desc);
    }

    const grid = document.createElement('div');
    grid.className = 'grid';
    for (const item of section.items) {
      grid.appendChild(isGroup(item) ? createGroup(item) : createButton(item));
    }
    inner.appendChild(grid);

    sec.appendChild(inner);
    root.appendChild(sec);
  }
}

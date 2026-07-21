import type { SectionConfig } from '../types';

// Full HoMM III soundtrack upload used for the Main Music subclips below.
// Chapters/timings taken from the video's chapter markers.
// https://www.youtube.com/watch?v=q43G9FTaomg
const OST = 'q43G9FTaomg';

// One-hour mix of all adventure-map / terrain ambient themes — the music that
// plays while exploring the map. Played from the start (click again to stop).
// https://www.youtube.com/watch?v=j5Ie3H64qo0
const AMBIENT = 'j5Ie3H64qo0';

// ===========================================================================
// SOUNDBOARD CONTENT  —  this is the file you edit to shape the board.
// ===========================================================================
//
// The board is a single section of grouped buttons. Groups keep related
// buttons together (they never get split apart when the grid wraps):
//   - Main Menu: the menu theme plus the Level Up / New Week one-shots.
//   - Combat: the four combat tracks plus the Victory / Defeat one-shots.
//   - Adventure map: the per-terrain ambient themes.
//   - Towns: the eight faction town themes.
//
// Each button needs a `sound`, which is one of:
//   { type: 'file',    src: 'sfx/foo.ogg' }                     // bundled file under public/
//   { type: 'youtube', id: 'VIDEOID', start?: 12, end?: 18 }    // a subclip of a YouTube video
//
// Optional per button:
//   image: 'img/foo.png'   // path under public/img (image fills the button,
//                          // title overlaid at the bottom)
//   size:  { w: 4, h: 3 }  // grid units; 1x1 ≈ 2 cm. Default { w: 1, h: 1 }
//
// A section item can also be a GROUP — a fixed-size block that keeps its
// buttons together (they never get split apart when the grid wraps):
//   { size: { w: 4, h: 2 }, buttons: [ …1x1 buttons… ] }
// The group spans `size` units and packs its buttons on an aligned sub-grid.
//
// The sources below are PLACEHOLDERS. Replace every `TODO_*` id / path with
// real values. See PLAN.md → "Populating content" for how to source them.
// ===========================================================================

export const sections: SectionConfig[] = [
  // Subclips of the full-OST video (see OST above). Timings are [start, end]
  // in seconds, derived from the video's chapter markers.
  {
    items: [
      // Menu theme kept together with the New Week / New Day one-shots.
      {
        size: { w: 3, h: 2 },
        buttons: [
          {
            title: 'Main Menu Theme',
            size: { w: 2, h: 2 },
            image: 'img/main-menu.webp',
            sound: { type: 'youtube', id: OST, start: 0, end: 74, loop: true },
          },
          { title: 'New Week', image: 'img/new-week.webp', sound: { type: 'youtube', id: 'J9byl59_VeY' } },
          { title: 'New Day', image: 'img/new-day.webp', sound: { type: 'youtube', id: 'qGVL4f3zLpI' } },
        ],
      },

      // Combat has four variants in the game; kept together with the Victory /
      // Defeat one-shots as one 3x2 block. The four combat timings are the
      // "combat theme" chapters of the full-OST video.
      {
        size: { w: 3, h: 2 },
        buttons: [
          { title: 'Combat I', image: 'img/combat/combat1.webp', sound: { type: 'youtube', id: OST, start: 229, end: 399, loop: true } },
          { title: 'Combat II', image: 'img/combat/combat2.webp', sound: { type: 'youtube', id: OST, start: 625, end: 786, loop: true } },
          { title: 'Combat III', image: 'img/combat/combat3.webp', sound: { type: 'youtube', id: OST, start: 927, end: 1070, loop: true } },
          { title: 'Combat IV', image: 'img/combat/combat4.webp', sound: { type: 'youtube', id: OST, start: 1207, end: 1401, loop: true } },
          {
            title: 'Victory',
            image: 'img/victory.webp',
            sound: { type: 'youtube', id: 'wRG766JTT08' },
          },
          {
            title: 'Defeat',
            image: 'img/defeat.webp',
            sound: { type: 'youtube', id: 'ylXX28pI5yI' },
          },
        ],
      },

      // Adventure-map ambient, split per terrain. Subclips of the terrain-mix
      // video (see AMBIENT); [start, end] are its per-terrain chapter markers.
      {
        size: { w: 5, h: 2 },
        buttons: [
          { title: 'Grass', image: 'img/terrain/grass.webp', sound: { type: 'youtube', id: AMBIENT, start: 0, end: 479, loop: true } },
          { title: 'Dirt', image: 'img/terrain/dirt.webp', sound: { type: 'youtube', id: AMBIENT, start: 479, end: 797, loop: true } },
          { title: 'Sand', image: 'img/terrain/sand.webp', sound: { type: 'youtube', id: AMBIENT, start: 797, end: 1265, loop: true } },
          { title: 'Snow', image: 'img/terrain/snow.webp', sound: { type: 'youtube', id: AMBIENT, start: 1909, end: 2397, loop: true } },
          { title: 'Swamp', image: 'img/terrain/swamp.webp', sound: { type: 'youtube', id: AMBIENT, start: 2913, end: 3157, loop: true } },
          { title: 'Rough', image: 'img/terrain/rough.webp', sound: { type: 'youtube', id: AMBIENT, start: 1265, end: 1601, loop: true } },
          { title: 'Lava', image: 'img/terrain/lava.webp', sound: { type: 'youtube', id: AMBIENT, start: 1601, end: 1909, loop: true } },
          { title: 'Water', image: 'img/terrain/water.webp', sound: { type: 'youtube', id: AMBIENT, start: 2397, end: 2913, loop: true } },
          { title: 'Underground', image: 'img/terrain/underground.webp', sound: { type: 'youtube', id: AMBIENT, start: 3157, loop: true } },
        ],
      },

      // Eight faction town themes (1x1 cards), kept together as one 4x2 block.
      {
        size: { w: 4, h: 2 },
        buttons: [
          {
            title: 'Castle',
            image: 'img/towns/castle.png',
            sound: { type: 'youtube', id: OST, start: 74, end: 229, loop: true },
          },
          {
            title: 'Rampart',
            image: 'img/towns/rampart.png',
            sound: { type: 'youtube', id: OST, start: 1401, end: 1568, loop: true },
          },
          {
            title: 'Tower',
            image: 'img/towns/tower.png',
            sound: { type: 'youtube', id: OST, start: 399, end: 625, loop: true },
          },
          {
            title: 'Inferno',
            image: 'img/towns/inferno.png',
            sound: { type: 'youtube', id: OST, start: 1806, end: 1943, loop: true },
          },
          {
            title: 'Necropolis',
            image: 'img/towns/necropolis.png',
            sound: { type: 'youtube', id: OST, start: 1998, end: 2151, loop: true },
          },
          {
            title: 'Dungeon',
            image: 'img/towns/dungeon.png',
            sound: { type: 'youtube', id: OST, start: 1070, end: 1207, loop: true },
          },
          {
            title: 'Stronghold',
            image: 'img/towns/stronghold.png',
            sound: { type: 'youtube', id: OST, start: 786, end: 927, loop: true },
          },
          {
            title: 'Fortress',
            image: 'img/towns/fortress.png',
            sound: { type: 'youtube', id: OST, start: 1616, end: 1735, loop: true },
          },
        ],
      },
    ],
  },
];

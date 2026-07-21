import type { SectionConfig } from '../types';

// Full HoMM III soundtrack upload used for the Main Music subclips below.
// Chapters/timings taken from the video's chapter markers.
// https://www.youtube.com/watch?v=q43G9FTaomg
const OST = 'q43G9FTaomg';

// ===========================================================================
// SOUNDBOARD CONTENT  —  this is the file you edit to shape the board.
// ===========================================================================
//
// Sections render TOP-TO-BOTTOM in the order of this array. Ordering guideline
// (from most to least prominent):
//   1. Main music (background, combat, town themes …)
//   2. Important one-shot effects (victory, defeat …)
//   3. Battle effects, grouped together
//   4. Exploration / adventure-map effects, grouped together
//   5. Town / build effects
//   6. Rare or lesser-used effects
//
// Each button needs a `sound`, which is one of:
//   { type: 'file',    src: 'sfx/foo.ogg' }                     // bundled file under public/
//   { type: 'youtube', id: 'VIDEOID', start?: 12, end?: 18 }    // a subclip of a YouTube video
//
// Optional per button:
//   image: 'img/foo.png'   // path under public/img (top title, image fills the rest)
//   size:  { w: 4, h: 3 }  // grid units; 1x1 ≈ 2 cm. Default { w: 1, h: 1 }
//
// The sources below are PLACEHOLDERS. Replace every `TODO_*` id / path with
// real values. See PLAN.md → "Populating content" for how to source them.
// ===========================================================================

export const sections: SectionConfig[] = [
  // --- 1. Main music -------------------------------------------------------
  // Subclips of the full-OST video (see OST above). Timings are [start, end]
  // in seconds, derived from the video's chapter markers.
  {
    title: 'Main Music',
    description: 'Menu, combat and the eight town themes — subclips of the full soundtrack.',
    buttons: [
      {
        title: 'Main Menu Theme',
        size: { w: 4, h: 2 },
        sound: { type: 'youtube', id: OST, start: 0, end: 74 },
      },
      {
        title: 'Combat Theme',
        size: { w: 4, h: 2 },
        sound: { type: 'youtube', id: OST, start: 229, end: 399 },
      },
      // Eight faction town themes, in canonical order.
      {
        title: 'Castle Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 74, end: 229 },
      },
      {
        title: 'Rampart Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 1401, end: 1568 },
      },
      {
        title: 'Tower Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 399, end: 625 },
      },
      {
        title: 'Inferno Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 1806, end: 1943 },
      },
      {
        title: 'Necropolis Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 1998, end: 2151 },
      },
      {
        title: 'Dungeon Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 1070, end: 1207 },
      },
      {
        title: 'Stronghold Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 786, end: 927 },
      },
      {
        title: 'Fortress Town',
        size: { w: 3, h: 2 },
        sound: { type: 'youtube', id: OST, start: 1616, end: 1735 },
      },
    ],
  },

  // --- 2. Important effects ------------------------------------------------
  {
    title: 'Important Effects',
    description: 'Key one-shots you reach for most often.',
    buttons: [
      {
        title: 'Victory',
        size: { w: 2, h: 2 },
        image: 'img/victory.png', // TODO
        // "win scenario" chapter of the full-OST video.
        sound: { type: 'youtube', id: OST, start: 4101, end: 4205 },
      },
      {
        title: 'Defeat',
        size: { w: 2, h: 2 },
        image: 'img/defeat.png', // TODO
        sound: { type: 'file', src: 'sfx/defeat.ogg' }, // TODO
      },
      {
        title: 'Level Up',
        sound: { type: 'file', src: 'sfx/levelup.ogg' }, // TODO
      },
      {
        title: 'New Week',
        sound: { type: 'file', src: 'sfx/newweek.ogg' }, // TODO
      },
    ],
  },

  // --- 3. Battle effects ---------------------------------------------------
  {
    title: 'Battle',
    description: 'Combat actions and spell effects.',
    buttons: [
      { title: 'Melee Hit', sound: { type: 'file', src: 'sfx/battle/melee.ogg' } }, // TODO
      { title: 'Arrow Shot', sound: { type: 'file', src: 'sfx/battle/arrow.ogg' } }, // TODO
      { title: 'Magic Arrow', sound: { type: 'file', src: 'sfx/battle/magicarrow.ogg' } }, // TODO
      { title: 'Fireball', sound: { type: 'file', src: 'sfx/battle/fireball.ogg' } }, // TODO
      { title: 'Resurrect', sound: { type: 'file', src: 'sfx/battle/resurrect.ogg' } }, // TODO
      { title: 'Unit Dies', sound: { type: 'file', src: 'sfx/battle/death.ogg' } }, // TODO
    ],
  },

  // --- 4. Exploration ------------------------------------------------------
  {
    title: 'Exploration',
    description: 'Adventure-map actions.',
    buttons: [
      { title: 'Pick Up Gold', sound: { type: 'file', src: 'sfx/map/gold.ogg' } }, // TODO
      { title: 'Pick Up Resource', sound: { type: 'file', src: 'sfx/map/resource.ogg' } }, // TODO
      { title: 'Dig', sound: { type: 'file', src: 'sfx/map/dig.ogg' } }, // TODO
      { title: 'Enter Town', sound: { type: 'file', src: 'sfx/map/entertown.ogg' } }, // TODO
      { title: 'Visit Well', sound: { type: 'file', src: 'sfx/map/well.ogg' } }, // TODO
    ],
  },

  // --- 5. Town -------------------------------------------------------------
  {
    title: 'Town',
    description: 'Building and recruiting.',
    buttons: [
      { title: 'Build', sound: { type: 'file', src: 'sfx/town/build.ogg' } }, // TODO
      { title: 'Recruit', sound: { type: 'file', src: 'sfx/town/recruit.ogg' } }, // TODO
      { title: 'Buy Spell', sound: { type: 'file', src: 'sfx/town/buyspell.ogg' } }, // TODO
    ],
  },

  // --- 6. Rare / misc ------------------------------------------------------
  {
    title: 'Rare & Misc',
    description: 'Lesser-used and easter-egg sounds.',
    buttons: [
      { title: 'Bad Luck', sound: { type: 'file', src: 'sfx/misc/badluck.ogg' } }, // TODO
      { title: 'Good Morale', sound: { type: 'file', src: 'sfx/misc/morale.ogg' } }, // TODO
      { title: 'Cuckoo', sound: { type: 'file', src: 'sfx/misc/cuckoo.ogg' } }, // TODO
    ],
  },
];

# Adding a destination

All globe destinations live in `src/destinations.js`. Each entry creates its
own marker, title, description, globe position, and opening behavior.

## The easiest kind of new place

1. Add a landmark image to `src/assets/landmarks/`.
2. Import it at the top of `src/destinations.js`:

```js
import moonLibraryArt from './assets/landmarks/moon-library.png'
```

3. Copy an entry in `destinations` and change the words and coordinates:

```js
{
  id: 'moon-library',
  kicker: 'THE SHELVES GO ON FOREVER',
  title: 'The Moon Library',
  copy: 'A place for books, questions, and staying up one page too late.',
  comingSoon: 'The librarian is still arranging the stars by genre.',
  lat: 12,
  lon: 72,
  art: moonLibraryArt,
  tag: 'read something strange',
},
```

That is enough to put a working destination on the globe. It will open the
existing “coming soon” panel, so you can publish an idea before its custom
activity exists.

## When a place has an activity already

Use `game: 'word-game'` (or another existing panel id) instead of
`comingSoon`. The available activity panel ids are in `index.html`, such as
`heart-game`, `question-game`, and `beauty-game`.

For a brand-new custom activity, add the destination first with `comingSoon`,
then build its panel later. This keeps the globe data simple and prevents an
unfinished idea from breaking the map.

## Globe coordinates

`lat` moves a marker up/down: positive is north, negative is south.
`lon` moves it around the globe: values from `-180` to `180` are easiest to
work with. Spread new locations around different longitudes so each spin has
something to discover.

## Word Woods tile preview · 2026-09-24

Preview branch: `preview/word-woods-tiles`. Not deployed; live remains `a051069`.
`src/word-woods.js` and `.css` add a clearing/table with 雨 yǔ (rain), 鸟 niǎo (bird), 风 fēng (wind). Meanings and readings checked against MDBG dictionary. Native SVG/CSS and Web Audio; no dependencies or other destination changes.

Desktop checked: drag placement, Enter/Space placement, three distinct effects, replay, return/focus, single-effect state, flip/pinyin, sound toggle, pronunciation invocation, journal persistence/revisit and legacy saved-word reopening. Browser widths 320/390/430 have no horizontal overflow; controls retain 44px targets; Back to globe restores the destination picker. Build and diff checks passed; no browser console errors. Existing large-bundle warning remains.

Old journal indices 0–4 remain intact; new tiles use 5–7. Original words remain under Earlier words. No storage migration or clearing. Audio begins off. Mandarin uses an available system voice with readable fallback; actual audible quality and absent-voice runtime need physical-device checking. Reduced-motion CSS removes effect animation while retaining visible effect states; preference not emulated in QA. Mobile pointer dragging needs physical-device confirmation; tap is supported and checked at phone widths. Preview screenshots can be distorted by the browser viewport tool; desktop visual inspection passed.

NEXT: Salene reviews the working preview at http://127.0.0.1:4193/salenes-world/?preview=woods01 (choose Word Woods). Do not publish until approved. No further room expansion in this pass.

## Ten-tile preview
Expanded the clearing with 日 rì (sun), 月 yuè (moon), 云 yún (cloud), 花 huā (flower), 树 shù (tree), 水 shuǐ (water), 火 huǒ (fire). Two rows of five keep choices visible, one shared contextual toolbar avoids repeated controls, and only one scene effect appears at a time. Prior journal indices stay unchanged; capacity now includes all fifteen old/new words. Build passed; all ten keyboard placements checked, 320px tile bounds fit, and the new fire word survived reload alongside earlier saved words. Preview only; live still has three tiles. Physical-device audio/motion checks remain outstanding from prior QA.

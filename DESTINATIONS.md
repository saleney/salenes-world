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

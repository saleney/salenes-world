# Painted depth study

Preview: /grief-garden-depth/ (local only; original garden unchanged).

Adds a restrained viewpoint shift, separate basket and growing-plant movement, touch/hover plant response, lifted recipe card, and a closer bench view while recipes are open. Left, center and right controls provide a phone and keyboard alternative to mouse movement. Reduced motion starts with depth disabled; Explore depth explicitly enables this study's movement. Saved plants and harvest use a separate storage key.

This is a shallow depth prototype, not reconstructed 3D geometry: the bench, tree and roses remain in one painted background. A later art pass could separate them if this direction feels right.

Verified: build, JavaScript syntax, no horizontal overflow at 320/390/430/1160 CSS pixels, 44px viewpoint controls, recipe dialog, harvest count, and no browser console errors. Physical iPhone not tested.

## Revision: touch individual objects only
User rejected whole-scene/layer movement and reported plants appearing in the sky. Removed viewpoint controls, parallax and bench camera zoom. The translated `.planted` wrapper had become a zero-height containing block for its absolutely positioned crops. It now explicitly fills the garden (`position:absolute; inset:0`), with only individual crop buttons accepting pointer events. Object feedback responds to pointerdown, not general pointer movement or hover. Verified newly planted base lies inside soil at 320/390/430/1160 widths, with no overflow. This revision supersedes the movement described above; live garden remains unchanged.

## Approved release

Approved original ingredient artwork with local bend-and-pluck motion, and a two-second basket journey. Applied to all back-bed ingredients. Removed scene-wide movement and prototype controls from the production experience. Preserved production saved-garden key and personal text.

Final fixes: full-size planted containing block; back-bed roots following soil slope; basket clipping width and mobile visibility; separate front/back ingredient hit areas. Pending plucks do not collect after their buttons are detached by recipe changes. Mouse and keyboard picking verified with exact basket counts, and target-center hit checks passed at 320, 390, 430 and 1160 CSS pixels. Build and three garden unit tests pass. Physical iPhone touch remains untested.

## 2026-09-30 — Basket sheet and front-bed touch

Adapted the resource review into the existing native JavaScript implementation:
- Phone basket opens as a warm paper bottom sheet with a scrollable inventory, a drag-to-dismiss grip, and a persistent close button. Desktop keeps a centered dialog.
- Recipe changes and handwriting/transcript switches use a short, gentle card transition; original handwriting is still first.
- Each planted ingredient has a separate touch wrapper. Bending that wrapper preserves the planted root and the inner SVG growth animation. Unripe plants settle back; ripe plants harvest into the basket. Stage updates defer while a plant is held.
- Harvest travel measures the visible crop SVG, preserving its size. Reduced-motion preference skips flight and animated panel/card transitions.
- No new dependencies. beUI supplied the bottom-sheet interaction reference; the existing native animation API was sufficient for this scope.

Validation: existing 3 growth/drop/recipe tests and production build passed. Browser checks at 320, 390, 430, and 1280px found no horizontal overflow. Verified basket drag dismissal, scrollable long inventory, recipe switching/transcription, planting then harvesting chard, and inventory increment. No garden console errors observed. Browser had reduced motion enabled, so animated motion timing itself still needs a normal-motion visual review; physical iPhone touch was not tested.

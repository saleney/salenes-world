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

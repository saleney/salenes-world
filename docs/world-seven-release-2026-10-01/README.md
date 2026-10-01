# Salene’s World — seven-place release

October 1, 2026

## What changed

The atlas now shows seven main places, connected by one continuous looping trail. A note from Salene opens as a scroll at the lower left. Recenter map was removed. The desktop tagline is one line. The Post Office annotation says “a letter just arrived for you.”

The previously approved Friendship Arcade timing game is included in this release: insert the token, tap Catch, and the token returns for another round. Added the shared travel journal and deployment-safe return link.

Mobile QA fixes: separated the Garden’s recipe cards from the campfire and basket; placed the Conservatory journal below the objects so it cannot cover the leaf.

## Verification

- Built with the GitHub Pages base path.
- Atlas and all seven rooms checked at 320, 390, and 430 pixels; no horizontal overflow.
- Desktop: no broken images or console errors in the atlas or seven rooms.
- Manual interactions: Word Woods tile reveals pinyin/meaning; Post Office envelope opens/closes; telescope reveals original prompts; Conservatory discoveries open/close; planted Garden ingredient harvests by produce tap and keyboard; sketchbook mark/undo and notes opening; Arcade token insertion/Catch/replay.
- Existing room.html routes and browser storage keys retained. No stored journal data migrated or deleted.
- Screenshots: *-desktop.png and *-mobile.png show atlas and each room. qa-results.json records measured viewport widths. Images record the actual local review states, not invented historical before states.

## Limits and next steps

This is focused functional and responsive QA, not an exhaustive accessibility or cross-browser certification. Sound playback, long drawing gestures, and download export were not re-tested. The journal still keeps data only in the current browser. Its explicit draft-keeping behavior remains a future review.

The next-chapter proposal is updated to reflect the seven-place map and Arcade release. Optional postcard-making and Mount Maybe are future ideas, not prerequisites for this release.

## Final navigation polish
- Added a return to Salene’s Playground on the map.
- Reused the map compass for room return links, retaining accessible labels.
- Moved Word Woods journal to the top right.
- Removed Revisit word and the journal’s extra margin sentence.
- Centered the artist palette vertically against the paper; removed the initial drawing instruction.
- Removed No reply needed from the Post Office.
- Verified local journal and palette; production build passed.

### Consistent room navigation
All travel journal buttons now sit at top right, including mobile. Arcade and Observatory reuse the World compass. Compasses turn gently on hover/focus and return afterward; reduced-motion preference disables the turn. Arcade and Observatory navigation reviewed locally; build passed.

Travel journal now shows Places and Words only. Removed the legacy written Drafts tab; existing browser storage was preserved. Hall of Scribbles drawings remain explicitly downloadable rather than journal entries.

Reshaped the continuous map trail into an irregular hand-drawn loop with rounded lobes and inward dips. Place positions retained.

## Garden mobile spacing and precise drops
Mobile campfire, basket, journal, and compass share one compact row. Ingredient labels were removed visually on phones; accessible names remain. Recipe cards stay on one row. Status notices appear near top center and clear after 3.5 seconds.
Dragged ingredients now use garden coordinates and are exempt from collision repositioning. Legacy planted positions remain compatible. Desktop test released at (640,450) and confirmed the new plant anchor at (640,450); mobile released at (200,350) and confirmed matching anchor. Harvest verified. No horizontal overflow at 320,390,430px. Production build passed.

Mobile garden controls are now icons only, beneath the ingredient tray. Opening view displays up to five saved plants plus three starter plants; older saved plants remain in storage. New plants added during a visit remain visible. Screenshot: garden-icons-below-tray.png.

### Garden reading order and planting space
Centered the recipe buttons above the side-by-side About this garden and Handwritten recipes links. Raised ordinary planting positions and starter plants to clear the lower controls; precise drag placements remain unchanged. Build and syntax checks passed; desktop and phone layouts reviewed. Screenshots: garden-centered-reading.png and garden-centered-reading-mobile.png.

### Mobile icon alignment
Made ingredient wells translucent, aligned their contents, and normalized the fire/basket/journal/compass visual sizes and baseline. Lowered the mobile control rows slightly. Desktop rules unchanged. Build passed; 320, 390, and 430px phone layouts reviewed. Saved garden-aligned-mobile-controls.png.

### Mobile pocket controls below recipes
Moved the mobile campfire/basket/journal/compass row below Morning, Afternoon 1 and Afternoon 2; reading links remain below both. Reviewed phone layout and saved garden-recipes-above-controls.png. Desktop unchanged.

### Soft mobile garden background
Removed the horizontal rule, the inset landscape layers and vignette, and the ingredient tray's rectangular background on phones. The existing full-page cream-to-sage gradient and subtle grain now continue uninterrupted behind the controls. Desktop layout and landscape remain unchanged. Reviewed at 320×740, 390×844, 430×900 and desktop; production build passed. Local/Git before-and-after screenshots: garden-mobile-background-before.png and garden-mobile-background-after.png. These new images have not been synced to Drive or Sheets.

### Desktop icons at upper right
Grouped campfire, harvest basket, travel journal and world compass into one upper-right desktop row. Removed their visible captions while preserving accessible names and existing interactions. Reserved title space to prevent overlap at narrower desktop widths. Phone positioning unchanged. Verified campfire open/toggle, basket open/close, journal open/close and compass navigation; reviewed 1280px and 800px desktop plus 320/390/430px phones. Production build passed. Before-and-after screenshots saved locally and in Git: garden-desktop-controls-before.png and garden-desktop-controls-after.png. Not yet synced to Drive or Sheets.

Desktop icon follow-up: reduced fire and basket slightly and enlarged the journal to compensate for whitespace inside its SVG. All four retain equal 52px click areas, a shared center line and 12px gaps. Reviewed desktop and 320/390/430px phones; mobile rules unchanged. Screenshot: garden-desktop-icons-aligned.png (local/Git; not yet synced to Drive/Sheets).

### World's desktop pocket icons
Replaced the desktop Playground text link with a hand-drawn house and moved Salene's scroll beside the travel journal in the upper-right corner. All three are icon-only, with balanced artwork, 52×52px click areas, 12px gaps and a common vertical center. Accessible names remain. The decorative compass is hidden on desktop; the mobile navigation is preserved. Verified house navigation to Playground, note opening/closing and journal opening/closing. Checked desktop, a narrower 800px window, and exact 320/390/430px phone widths; no horizontal overflow or console errors. Before/after screenshots: world-desktop-icons-before.png and world-desktop-icons-after.png, saved locally and in Git (not yet synced to Drive/Sheets).

### Matching desktop navigation in every room
Moved the World compass beside the journal at upper right in Post Office, Conservatory, Hall of Scribbles, Word Woods, Courage Observatory and Friendship Arcade. Removed the desktop journal caption. Each target measures 52×52px, with 12px between targets and the same vertical center (recorded in room-navigation-qa.json). Kept the Garden's four-object group and the atlas's three-object group. Preserved mobile positions and captions; all six rooms checked at exact 320/390/430px widths with no horizontal overflow. Verified journal open/close and compass navigation in every room. Saved each room's before/after as *-navigation-before.png and *-navigation-after.png locally and in Git; Drive/Sheets sync remains pending.

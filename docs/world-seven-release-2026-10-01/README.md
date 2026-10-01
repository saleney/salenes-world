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

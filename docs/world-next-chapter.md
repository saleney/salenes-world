# Salene’s World — the next chapter

Proposal, September 30, 2026. Based on the current destination database, room activities, and journal implementation. This is a direction to explore, not a change to the live map.

## Keep the identity

The Playground is the working sketchbook. Salene’s World is the unfolded paper map. The Grief Garden is a place within it, grounded in Richard’s recipes, handwriting and song. Keep the parchment, spare compositions, small ink drawings and physical interactions. Each room should feel specific enough to remember.

## Proposed map: seven main places

| Place | What belongs here | What you do | What you might keep |
| --- | --- | --- | --- |
| Word Woods | The existing language clearing | Place words and watch the clearing respond; hear them when sound is available | A word with its meaning and scene |
| The Grief Garden | Richard’s recipes, planting, basket and campfire | Plant abundantly, harvest, read handwriting, listen | Nothing required; this place can be enough on its own |
| The Curiosity Conservatory | Specimen drawers, Question Forest, Wild Question Aquarium and Body Cabinet | Open a drawer, turn a leaf, watch a small body mechanism or catch a question; facts and open questions stay distinguishable | A question worth returning to |
| The Little Post Office | Existing correspondence ideas, Beauty Exchange and Warmth Workshop | Assemble a tiny postcard from a noticed delight and your own words; copy it to share yourself | A postcard draft, only if requested |
| The Friendship Arcade | Shared play | Pull a two-person activity or take turns on one device; the response should come from the people playing | No routine journal entry |
| The Hall of Bad First Drafts | Making and experimentation | Make a tiny imperfect thing; continue an existing draft | Your own draft |
| The Courage Observatory | Perspective and beginnings, including Mount Maybe | Point a telescope toward a small next step; make it concrete in your own words | An optional next-step note |

Seven is a proposed starting point, not a target that needs filling. Word Woods and the garden remain the strongest anchors. Improve one other room at a time before rebuilding everything.

## Where all fourteen places go

| Existing place | Proposed role |
| --- | --- |
| The Visitor Center | A small note from Salene at the edge of the map, rather than a destination |
| Word Woods | Main place |
| The Grief Garden | Main place |
| The Curiosity Conservatory | Main place |
| The Question Forest | A leaf path or discovery inside the Conservatory |
| The Wild Question Aquarium | A little tank inside the Conservatory |
| The Body Cabinet | A specimen cabinet inside the Conservatory |
| The Little Post Office | Main place |
| The Beauty Exchange | A tray of small delights in the Post Office |
| The Warmth Workshop | A correspondence workbench in the Post Office |
| The Friendship Arcade | Main place; protect its two-person focus |
| The Hall of Bad First Drafts | Main place |
| The Courage Observatory | Main place |
| Mount Maybe | A trail visible from the Observatory; preserve the unfinished idea for later |

The smaller places can keep their names and illustrations. Folding them into rooms need not erase their personality or history.

## The journal: a pocket of things you kept

Keep the name “Your travel journal” for now. Make its purpose clearer through the interaction rather than another paragraph of explanation.

An unobtrusive paper tab on the atlas opens a folded pocket. Inside are words and drafts you chose to keep. Each slip leads back to its source. A blank journal needs only “Nothing kept yet.” There is no completion count, visited-place checklist or pressure to collect something everywhere.

Current behavior: words are explicitly kept; nonempty first drafts are automatically included from a separate browser store. Words can be removed; draft entries currently have no journal removal control. The journal appears on room pages, not the atlas. Everything is browser-local, with no cross-device sync.

Next journal pass should begin with those existing words and drafts. Preserve their storage keys and data. Add an atlas entry point and make draft keeping explicit without destroying autosaved drafts. A later “Let go” action should distinguish removing a journal slip from deleting its underlying draft. Do not imply that removing a slip deletes the writing.

Questions, postcards and next-step notes are possible later additions, not features to add before their rooms work well. The current word-only storage validation must be extended deliberately before new entry types can persist.

## What makes each room earn its place

The current Conservatory, Post Office, Observatory, Arcade and Aquarium largely cycle short text through a button. The Question Forest does the same with a different metaphor. Mount Maybe is an unfinished trail. Names alone do not yet create distinct experiences.

Use the Grief Garden as the standard for specificity: an object changes when you touch it, and the content belongs to a particular person or idea. Avoid making every room a parchment panel with a prompt generator. The visual family can stay consistent while the actions differ.

## Suggested order

1. Make a local seven-place map composition to judge whether the smaller world feels right. Keep the current fourteen-place release intact.
2. Prototype the Post Office as an actual postcard-making space. It offers a clear way to test whether Beauty and Warmth belong together.
3. Bring the existing journal onto the atlas as a small pocket, preserving saved words and drafts.
4. Explore the Conservatory as one room with several discoveries. Do not build four new standalone pages.
5. Revisit the Arcade and Observatory after their primary actions are clearer. Mount Maybe can remain a future trail.

## Preservation

Live paper-atlas release: 2e79e53. Previous globe entrance: a70bd6b. Live URL: https://saleney.github.io/salenes-world/

No destinations, saved data, room interactions or deployed files were changed during this review. Existing routes should remain usable if the smaller map is adopted later.


## Progress check — October 1, 2026

The proposal above remains the historical starting point. Subsequent work has delivered Word Woods, the Grief Garden, the Post Office care packages, the Hall of Scribbles, the Courage Observatory, and a Visitor Center scroll over the atlas. The journal now has an atlas entry point.

The Conservatory now combines four discoveries in one room: aquarium, light drawer, folded leaf, and nest. The earlier Body Cabinet idea became the nest; its questions concern animals. Openings sit over the room and close with ×.

Still outstanding:

1. **Local seven-place atlas composition.** The live map still exposes fourteen destinations, so the proposed consolidation has not been applied. Keep legacy URLs usable and saved journal data intact.
2. **Friendship Arcade release.** An approved token-insertion and quick timing-game prototype exists at output/friendship-arcade/index.html but is not deployed. The proposal's two-person emphasis needs a fresh decision alongside this newer approved direction.
3. **Journal keeping behavior.** Verify explicit draft keeping/removal and storage preservation before making further journal changes; older descriptions above may be stale.
4. **Post Office scope.** Current care packages were approved; postcard-making is an optional future idea, not an unfinished requirement.

Recommended next design task: preview the seven-place map before inventing more destinations. Mount Maybe can remain a future trail within the Observatory.


## Seven-place release — October 1, 2026

The seven-place composition was approved and prepared for deployment. It preserves legacy room URLs and journal storage keys. The approved Friendship Arcade token/Catch game is now included. The Visitor Center scroll lives at the map’s lower-left edge; the trail forms a continuous loop.

Next substantive work: review the travel journal’s actual draft-keeping behavior and decide whether any extra saved-entry types are useful. Preserve existing autosaved drafts. Postcard-making and Mount Maybe remain optional later experiments.

Release QA and screenshots: world-seven-release-2026-10-01/README.md.

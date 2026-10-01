# Grief Garden — recording-guided animation pass

Local changes only; not deployed.

Preserved Richard’s recipe data, handwritten photo, About text, dedication, song link, keyboard planting, picking and basket.

Changed painted scene to a simple vector garden with a bench and layered animated fire. Recipe plants use fine stems and restrained flat colors. Breeze and growth animate separately. Plant selection remains active for repeated placement. Capacity is 120 plants. The local preview uses a separate storage key so prior saved gardens remain intact.

Backup: output/garden-before-animation (four original source files).

Validation: JavaScript syntax checks and production build passed. Browser preview connection failed; visual, mobile and interaction QA still needed. Current art is a first local pass, not a final match to the recording. Fire links to the preserved music section and does not autoplay audio.

## Recording-guided composition refinement

Matched the Sept 30 7:21 recording’s fine stems, tiny ingredient tips, spacious field, lower-left recipe cards and compact ingredient tray (right desktop / bottom phones). Kept SVG campfire and basket. Added an ambient meadow of 24 code-drawn plants; newly planted ingredients remain interactive and saved separately. Stem emergence lasts 4.8 seconds with independent swaying. The handwritten recipes have a dedicated link.

Verified desktop and 390px phone composition, Afternoon 1 icon switching, and carrot planting. Phone tray spacing corrected after inspection. Production build passed before the final SVG aspect-ratio correction; JavaScript syntax checks passed. Screenshot: output/garden-reference-latest/reference-garden-desktop.png. Not deployed.

## Code-drawn atmosphere pass

Removed the painted courtyard image markup. Kept the original handwritten recipe photograph (one supplied file; not two invented scans). Plants have stable per-ID sway durations, phases, scale and flip, with base-origin growth and a slight overshoot. Campfire uses SVG gradients, four differently timed embers and pulsing radial light. Background uses code-only gradients, faint hazy SVG terrain, grain and vignette. Recipe papers have soft shadows and individual tilts. Existing click/drag planting, About and music toggles retained. Moved planted stems below the header.

Desktop and three viewport overrides inspected; browser zoom mapped requested 320/390/430 to effective CSS widths 400/487/537. No horizontal overflow at those effective widths. Confirmed differing computed sway durations. Reduced-motion CSS disables all added motion. Screenshot: atmosphere-garden.png. Not deployed.

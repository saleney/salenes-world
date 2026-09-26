# Grief Garden — presentation and phone refinement

User goal: refine the memorial to share with Richard’s dad; fix ingredients that could not be selected on an iPhone.

## Observed causes
The seed shelf used horizontal overflow while every packet captured touch dragging with touch-action:none. That competing gesture prevented normal browsing of the shelf. Separately, the scene’s aspect-ratio and min-height made it 495px wide in a 390px viewport, with its right edge clipped by the garden window. Checking only page overflow would have missed the clipped interaction region.

## Change
All packets now wrap into visible rows, with readable 16px names. Tapping a packet selects its ingredient; tapping soil or the placement buttons plants it. Packets allow normal vertical touch scrolling; a separate 44px drag handle owns direct manipulation and supports edge scrolling. The scene explicitly fits its container; phone harvest targets are at least 44px wide and 48px high. Soil placement controls appear immediately below the scene. Plant overlays stop intercepting soil taps while choosing a spot.

Recipes show one generous card at a time with quiet text navigation. On phones they default to an 18px transcription, with See handwriting and Original photo preserving access to the source. Authorship reads “These are Richard’s juice recipes, handwritten by his dad.” The original photograph and recipe quantities were not changed in this pass.

A shared pigment filter and muted shadows soften the existing SVG produce and basket. This is an improvement to code-native artwork, not a new hand-painted sprite set. The bench card has a paper edge/contact shadow; seeds settle into soil, sprouts unfold, and picked plants leave a small stem. Harvest counts remain available to assistive technology but no longer appear as a score.

## Verification
Production build and three existing growth/drop/artwork tests pass. Browser preview checked at 320, 390, 430 and 1160px: no page overflow; full scene within viewport; all packet and harvest bounds fit. Every morning and afternoon ingredient was planted through the tap/fallback flow at 320px. Desktop drag handle placed an ingredient; recipe switching, readable recipe view, visible harvest and reload persistence worked. No browser warnings/errors were recorded. Physical iPhone Safari gesture testing remains unperformed; viewport testing is not a substitute.

## Learning
Test the bounds of the interactive scene itself, not only document.scrollWidth. Separate gestures that compete: browsing the page, selecting a packet, and dragging into soil. A dedicated drag handle lets the main packet remain a reliable scroll/tap surface. Readability should be available immediately on a phone, rather than requiring deciphering a scaled photograph.

Next check: open the live garden on Salene’s iPhone, scroll through all packets, tap the last ingredient, place it, then try a handle drag. Before sharing with Richard’s dad, review the original handwritten recipes together for transcription fidelity. No claim of physical-device or family review has been made.

# Salene's World Project Instructions

Salene's World is a whimsical interactive museum/playground built around curiosity, wonder, connection, learning, memory, courage, grief, play, and exploration.

## Creative direction

The world should feel whimsical, warm, curious, handmade, playful, surprising, occasionally unhinged, and personal rather than corporate or generic.

Visitors should feel invited to wander, click, discover, and linger. Whimsy should never make the experience frustrating to use.

## Mobile and UX

Mobile is a first-class experience, not a desktop adaptation.

For meaningful UI changes, test representative small, standard, and large phone widths plus desktop.

Avoid horizontal overflow, clipped content, awkward manual page repositioning, tiny touch targets, and fixed positioning that assumes one viewport size.

Placards, panels, and interactive content should fit comfortably within the available viewport. If content is taller than the viewport, scrolling should be natural and intentional.

## Consistency

Before adding a new UI pattern, inspect whether an equivalent button, panel, placard, animation, typography treatment, spacing rule, or responsive behavior already exists.

Reuse existing patterns where practical. Let individual destinations retain their personality without creating unnecessary duplicate systems.

## Code quality and learning

- Inspect before changing.
- Prefer the smallest clean, maintainable solution.
- Avoid unrelated refactors.
- Avoid new dependencies without a clear reason.
- Preserve working desktop and mobile behavior.
- Briefly explain important new concepts because Salene is learning web development.
- Keep agent work concise and token-efficient.

## Important project files

- `src/destinations.js` is the single source of truth for Salene's World destinations. It contains each destination's content, landmark artwork, globe coordinates, and opening behavior. Update this file when adding or changing a destination; do not duplicate destination data elsewhere.
- `index.html` contains the main page structure and activity panels.
- `src/main.js` contains primary interaction logic and Three.js globe behavior.
- `src/style.css` contains shared site styling and responsive behavior.
- `src/assets/` contains world and landmark imagery.
- `vite.config.js` contains build/deployment configuration.
- `.github/workflows/deploy-pages.yml` contains the GitHub Pages deployment workflow.

## Destination editing rule

When adding or editing a destination, start in `src/destinations.js`. Do not hardcode a second destination database elsewhere. If a new destination needs a brand-new interactive activity panel, that activity may also require coordinated markup/logic in `index.html` and `src/main.js`, but the destination metadata itself should remain centralized in `src/destinations.js`.

## Before substantial changes

1. Inspect the relevant existing implementation.
2. Identify reusable patterns.
3. Briefly state the plan for nontrivial work.
4. Make only the scoped change.
5. Test affected interactions on mobile and desktop.
6. Check for regressions and console errors.
7. Summarize what changed.
8. Stop when the requested problem is solved.

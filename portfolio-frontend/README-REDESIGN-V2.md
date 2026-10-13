# AsyncArt redesign v2 (blush, cream and sage)

Verified with a production build and rendered in a browser at desktop and
phone widths, in light and dark.

## Install
1. Copy everything in `src/` over your `src/` folder (same paths).
2. In `src/index.css` the new file replaces your old one. It no longer uses
   `@config "../tailwind.config.js"`, because the palette and fonts now live
   in the CSS itself (Tailwind v4 `@theme`). You can delete `tailwind.config.js`.
3. Keep your existing `src/data/demoProjects.js`, `src/index.jsx` and assets.
   Nothing in them needed to change.

## Delete these old files (no longer used)
- src/App.css
- src/components/Modal.jsx
- src/components/ProjectListModal.jsx
- src/components/WorkProjectCard.jsx
- src/components/AboutMoreModal.jsx
- src/components/SkillTicker.jsx
- src/data/realWorldProjects.js (if you still have it from v1)

## Where to edit things
- Real-world projects: `src/data/realProjects.js` (add `demo` and `code` links here)
- Skills and the project that proves each: `src/data/toolbox.js`
- Projects added in /admin still appear, under "More real-world projects"
- Palette: the CSS variables at the top of `src/index.css`

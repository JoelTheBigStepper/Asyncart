# AsyncArt redesign v3

Built on v2. Verified with a production build, a real browser render (desktop,
phone, light and dark), and an automated check that the resume button downloads.

## Install
1. Copy `src/` over your `src/` folder (same paths) and `public/Joel-Ojo-Resume.pdf`
   into your `public/` folder.
2. Keep your existing `src/data/demoProjects.js`, `src/index.jsx` and assets.

## Delete (no longer used)
- src/components/QuickStack.jsx
- src/assets/yh.png (the old portrait)
- Anything listed in the v2 README that is still around

## The resume
`public/Joel-Ojo-Resume.pdf` is a one-page draft written only from what is already
on the site (skills, products, client work). It has no education, employment
history or email, because I don't have them. Replace it with your own PDF using
the same file name and both Download buttons will serve it. To rename the file,
edit `src/data/site.js`.

## Where to edit things
- Hero projects (the inline pills): `src/pages/Home.jsx`
- Tools marquee list: `marqueeTools` in `src/data/toolbox.js`
- Real-world projects and groups: `src/data/realProjects.js`
- Glass, photo fades and animations: top of `src/index.css`
- Hero and About photos: `src/assets/joel-hero.jpg`, `src/assets/joel-about.jpg`

/* App manifest as a JavaScript object so this file parses as JS */
const appManifest = {
  short_name: "AsyncArt",
  name: "AsyncArt - Portfolio of Joel Caesar",
  description: "Full-Stack Developer Portfolio by Joel Caesar. Built with React, Node.js, Express, MongoDB, and TailwindCSS — showcasing modern, responsive, and elegant web projects.",
  icons: [
    {
      src: "/pwa-192x192.png",
      type: "image/png",
      sizes: "192x192"
    },
    {
      src: "/pwa-512x512.png",
      type: "image/png",
      sizes: "512x512"
    },
    {
      src: "/pwa-maskable-512x512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "maskable"
    }
  ],
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait-primary",
  theme_color: "#000000",
  background_color: "#000000",
  id: "asyncart.vercel.app",
  lang: "en",
  dir: "ltr"
};

/* Expose manifest on the service worker global scope if needed */
self.appManifest = appManifest;

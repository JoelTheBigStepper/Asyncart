module.exports = {
    globDirectory: "build/",
    globPatterns: ["**/*.{html,js,css,png,jpg,svg,woff2}"],
    swDest: "build/sw.js",
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*/, // or /^.*$/, to match everything
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages-cache',
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
    ],
    navigateFallback: '/offline.html',
  };
  
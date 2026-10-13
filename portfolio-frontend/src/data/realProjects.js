// Curated real-world projects, grouped for the Work section.
// Add `code` and `demo` links as projects become public.

const products = [
  {
    id: "medverify",
    title: "MedVerify",
    tagline: "Check whether a medicine is genuine",
    description:
      "A MERN app that lets Nigerians verify medication authenticity against NAFDAC registration data, with plain-language explanations of every result.",
    highlights: [
      "Thousands of NAFDAC drug records scraped and imported",
      "A multi-factor fuzzy matching engine scores each lookup against registered products",
      "A GS1 DataMatrix barcode scanner with a custom Application Identifier parser",
      "Every verification attempt is logged",
      "AI explanations from Claude Haiku, called through a backend proxy",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Claude API", "GS1 DataMatrix"],
    code: "",
    demo: "",
  },
  {
    id: "velastrux",
    title: "Velastrux",
    tagline: "Turn any API into a working dashboard",
    description:
      "A dashboard generator SaaS on the full MERN stack. Connect a site's backend and Velastrux builds the admin dashboard around it.",
    highlights: [
      "The frontend calls each connected site's backend directly with an X-Velastrux-Token header, so customer data never passes through Velastrux's own servers",
      "Endpoints are discovered three ways: an explicit routes list, OpenAPI or Swagger specs, then parallel probing of common paths",
      "A multi-step generator wizard and webhooks signed with HMAC-SHA256",
      "Data pages with 50-record pagination, type-aware forms, and record IDs that work across _id, id and uuid",
      "PostHog analytics, plus full SEO with structured data",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB Atlas", "Render", "Vercel"],
    code: "",
    demo: "",
  },
  {
    id: "synerdio",
    title: "Synerdio",
    tagline: "Debug a web page together, with nothing to install",
    description:
      "A zero-install collaborative live web debugger, built for a hackathon. Several people open the same page and debug it together, with AI help on hand.",
    highlights: [
      "Peers connect over serverless WebRTC with Trystero",
      "AI help from Llama 3.3 70B on Groq, called through a Vercel serverless function",
    ],
    stack: ["React 19", "Trystero", "WebRTC", "Groq", "Vercel"],
    code: "",
    demo: "",
  },
  {
    id: "kherphi",
    title: "Kherphi",
    tagline: "Turn any web page into a design canvas",
    description:
      "A Manifest V3 browser extension that edits any website visually and locally, like a mini Figma for the page you are already on. It is in development, with a launch pack ready.",
    highlights: [
      "Drag, resize, insert and delete elements, and edit text and colors with a hex input",
      "Edits persist per website across refreshes and closed tabs",
      "A changes and layers panel, keyboard shortcuts, and a hardened HTML sanitizer",
      "Looks presets and a first-run guide for people who have never edited a site",
      "Tested on live sites such as X.com with a headless Chromium test harness",
      "Free and Pro plans, with a Cloudflare Worker and Stripe backend",
    ],
    stack: ["Manifest V3", "Cloudflare Workers", "Stripe", "Chromium tests"],
    code: "",
    demo: "",
  },
  {
    id: "resoary",
    title: "Resoary",
    tagline: "An internal resource library for teams",
    description:
      "A shared library where a team keeps its PDFs and code snippets in one place, protected by a team password.",
    highlights: [
      "Team password authentication",
      "Storage for PDFs and snippets",
      "Deployed across Render and Vercel",
    ],
    stack: ["Render", "Vercel"],
    code: "",
    demo: "",
  },
  {
    id: "momcare",
    title: "MomCare",
    tagline: "Pregnancy and vaccine reminders by SMS",
    description:
      "A maternal health MVP for Nigerian mothers that tracks pregnancy, keeps vaccination schedules, and sends reminders by text message.",
    highlights: [
      "Pregnancy tracking and vaccination schedules",
      "SMS reminders sent through Termii",
      "A cron-based reminder system that runs without anyone pressing a button",
      "Node.js and Express with ES modules, and Mongoose models",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Termii", "Cron"],
    code: "",
    demo: "",
  },
];

const clientWork = [
  {
    id: "rhema",
    title: "Rhema Chapel Oluyole",
    tagline: "A home on the web for a church in Ibadan",
    description:
      "A complete website for Rhema Chapel Oluyole, built around the church's motto, The Home of the Blessed People, and led by photography in its purple, red and near-black colors.",
    highlights: [
      "Home, About, Ministries, Sermons, Events, Gallery, Give, Visit and Contact pages",
      "An /admin workflow where the media team uploads and publishes gallery photos",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Lucide"],
    code: "",
    demo: "",
  },
  {
    id: "glow",
    title: "GLOW Concert",
    tagline: "One page for a night of worship",
    description:
      "A one-page website for GLOW (God Loves Our Worship), the annual praise concert of Rhema Chapel Oluyole, held on December 10.",
    highlights: [
      "A countdown to the concert",
      "Church colors as the accent, with some sections themed light",
      "A 3D GLOW logotype with a gold border",
    ],
    stack: [],
    code: "",
    demo: "",
  },
  {
    id: "glare",
    title: "Glare Solutions",
    tagline: "Events and an admin panel for a Lagos tech company",
    description:
      "Work on the website of Glare Solutions, a Lagos-based tech company: bug fixes, a new events feature, and a separate admin panel.",
    highlights: [
      "Bugs fixed across the existing site",
      "An events feature added",
      "A separate MongoDB-backed admin panel",
    ],
    stack: ["MongoDB"],
    code: "",
    demo: "",
  },
  {
    id: "attendance",
    title: "Attendance System Rescue",
    tagline: "A security and reliability overhaul",
    description:
      "A review and overhaul of a student attendance tracking system, delivered as 20 fixed files across the full stack.",
    highlights: [
      "Removed hardcoded Redis credentials and replaced authentication that only ran in the browser",
      "Repaired dead queue infrastructure",
      "Fixed timezone misalignment and schema bugs",
    ],
    stack: ["Redis", "Queues", "Auth"],
    code: "",
    demo: "",
  },
];

export const realGroups = [
  {
    id: "products",
    title: "Products",
    note: "Software I am building for people to use",
    projects: products,
  },
  {
    id: "client",
    title: "Client work",
    note: "Built for other people's goals",
    projects: clientWork,
  },
];

export const findProject = (id) =>
  realGroups.flatMap((group) => group.projects).find((project) => project.id === id);

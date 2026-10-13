// Skills grouped by what they do, each with the real project that proves it.

// Shown in the marquee on the home page, split across two rows.
export const marqueeTools = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "React Router",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "Redis",
  "JWT",
  "Git",
  "GitHub",
  "Vercel",
  "Render",
  "Cloudflare",
  "Stripe",
  "PostHog",
  "Claude API",
  "WebRTC",
  "Python",
  "Unity",
];

export const toolboxLayers = [
  {
    id: "interface",
    name: "Interface",
    blurb: "What people see and touch",
    skills: ["React", "Vite", "Tailwind CSS", "Framer Motion", "JavaScript", "TypeScript", "HTML"],
    proof:
      "Velastrux runs on React, Vite and Tailwind v4. Every demo project in my work section is React with Tailwind, built to hold up from small phones to wide desktops.",
  },
  {
    id: "server",
    name: "Server",
    blurb: "What answers the request",
    skills: ["Node.js", "Express", "REST APIs", "JWT authentication", "Webhooks", "Cron jobs", "Nodemailer"],
    proof:
      "Velastrux signs its webhooks with HMAC-SHA256 and discovers a site's endpoints from OpenAPI specs, and the contact form on this site sends mail through Nodemailer.",
  },
  {
    id: "data",
    name: "Data",
    blurb: "Where the records live",
    skills: ["MongoDB", "Mongoose", "MongoDB Atlas", "Data scraping", "Fuzzy matching"],
    proof:
      "MedVerify checks lookups against thousands of imported NAFDAC records with a multi-factor scoring engine. Velastrux pages through live data 50 records at a time.",
  },
  {
    id: "integrations",
    name: "AI and integrations",
    blurb: "Services I connect to",
    skills: ["Claude API", "Groq", "Termii SMS", "WebRTC", "PostHog", "GS1 barcodes"],
    proof:
      "MedVerify explains results with Claude Haiku through a backend proxy. Synerdio runs Llama 3.3 70B on Groq and connects people over serverless WebRTC.",
  },
  {
    id: "shipping",
    name: "Shipping",
    blurb: "How it gets to users",
    skills: ["Git", "Vercel", "Render", "Cloudflare Workers", "Service workers"],
    proof:
      "Frontends go to Vercel and APIs to Render. This site registers a service worker, and Kherphi's backend is planned as a Cloudflare Worker.",
  },
  {
    id: "branching",
    name: "Branching out",
    blurb: "Beyond the usual web app",
    skills: ["Manifest V3", "Unity", "C#", "Python", "Cybersecurity"],
    proof:
      "Kherphi is a Manifest V3 browser extension. My Football Career Simulator is a mobile game in Unity and C#. Python and cybersecurity are what I am studying now.",
  },
];

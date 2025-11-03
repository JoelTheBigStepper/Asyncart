import WorkProjectCard from "../components/WorkProjectCard";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio built with React, Express, and TailwindCSS to showcase my creative work and skills.",
    image: "/images/portfolio-preview.jpg",
    code: "https://github.com/username/portfolio",
    demo: "https://yourportfolio.com",
  },
  {
    title: "E-commerce UI",
    description:
      "Responsive and elegant shopping interface with React + Tailwind, focusing on user experience and layout balance.",
    image: "/images/ecommerce-ui.jpg",
    code: "https://github.com/username/ecommerce-ui",
    demo: "https://ecommerce-demo.com",
  },
  {
    title: "Blog Platform",
    description:
      "A sleek, modern blog built with clean UI and smooth interactions using React and Markdown rendering.",
    image: "/images/blog-platform.jpg",
    code: "https://github.com/username/blog-platform",
    demo: "https://blog-demo.com",
  },
];

export default function Works() {
  return (
    <section id="work" className="px-8 py-16 text-left bg-gray-50 dark:bg-stone-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-3 text-stone-900 dark:text-white">
        My Projects
      </h2>
      <p className="mb-10 text-stone-600 dark:text-gray-400 max-w-2xl">
        Below are some of the projects I’ve worked on — blending design, interaction, and performance with modern web technologies.
      </p>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <WorkProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio to showcase my work and skills with a refined, interactive interface.",
    image: "/images/portfolio.jpg",
    code: "#",
    live: "#",
  },
  {
    title: "E-commerce UI",
    description:
      "Responsive UI for an online store built with React and TailwindCSS.",
    image: "/images/ecommerce.jpg",
    code: "#",
    live: "#",
  },
  {
    title: "Blog Platform",
    description:
      "A clean and modern blog interface using React and modern web technologies.",
    image: "/images/blog.jpg",
    code: "#",
    live: "#",
  },
];

export default function Works() {
  return (
    <section
      id="work"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white text-stone-800 dark:bg-[#0d0d0d] dark:text-white transition-colors duration-500"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-stone-800 via-stone-500 to-stone-400 dark:from-white dark:via-stone-300 dark:to-stone-500 bg-clip-text text-transparent">
          My Projects
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
          Below are some of the projects I’ve worked on using modern web
          technologies such as React, Tailwind CSS, and Node.js.
        </p>
      </motion.div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10 backdrop-blur-md transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-300 mb-5">
                {project.description}
              </p>

              <div className="flex justify-between items-center">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-700 dark:text-white border border-stone-300 dark:border-stone-700 px-4 py-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-stone-900 text-white dark:bg-white dark:text-black px-4 py-2 rounded-md hover:opacity-90 transition"
                >
                  Visit Site
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <motion.hr
        className="mt-20 border-t border-stone-300 dark:border-stone-800 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ originX: 0 }}
        viewport={{ once: true }}
      />
    </section>
  );
}

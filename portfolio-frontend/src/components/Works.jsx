import { motion } from 'framer-motion';

const projects = [
  { title: "Portfolio Website", description: "A personal portfolio to showcase my work and skills." },
  { title: "E-commerce UI", description: "Responsive UI for an online store built with React and Tailwind." },
  { title: "Blog Platform", description: "A clean and modern blog interface using modern web tech." },
];

export default function Works() {
  return (
    <>
      <section id="work" className="p-10 text-left">
        <h2 className="text-3xl font-bold mb-3">My Projects</h2>
        <p className="mb-8 text-stone-600 dark:text-gray-400"> Below are some of the projects I have worked on using modern web technologies such as React, Tailwind CSS, and more.</p>

        {/* Grid layout for projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-stone-800 dark:bg-stone-800 p-6 rounded-lg shadow hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl text-white dark:text-white font-semibold mb-2">{project.title}</h3>
              <p className="text-stone-300 dark:text-white mb-4">{project.description}</p>
              <div className="flex flex-wrap justify-between gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm dark:bg-transparent text-white dark:text-white px-4 py-2 rounded border border-1 dark:border dark:border-stone-700 transition"
                >
                  Code
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-black text-white px-4 py-2 rounded dark:bg-black transition"
                >
                  Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.hr
        className="my-12 border-t-1 border-stone-300 dark:border-stone-800 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 4 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

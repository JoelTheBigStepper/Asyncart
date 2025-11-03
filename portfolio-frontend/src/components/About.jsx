import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: "Intermediate" },
  { name: "CSS", level: "Intermediate" },
  { name: "JavaScript", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Intermediate" },
  { name: "Git", level: "Beginner" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-white text-stone-800 dark:bg-[#0d0d0d] dark:text-white transition-colors duration-500"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-stone-800 via-stone-500 to-stone-400 dark:from-white dark:via-stone-300 dark:to-stone-500 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
          A creative front-end developer passionate about clean code, refined
          visuals, and user-first design. I build interactive, responsive, and
          visually polished experiences with modern web technologies.
        </p>
      </motion.div>

      {/* Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center mb-20"
      >
        <p className="text-stone-700 dark:text-stone-300 text-base md:text-lg leading-relaxed">
          I’m a dedicated Web Developer who loves crafting pixel-perfect,
          user-friendly interfaces with React, TailwindCSS, and modern
          JavaScript. On Upwork, I specialize in helping brands refine their
          visual presence — improving layout balance, visual spacing, and
          overall design consistency. Whether it’s optimizing a portfolio,
          modernizing a brand site, or creating elegant product pages, I aim to
          deliver design that feels intuitive, balanced, and beautiful.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-xl shadow-lg transition-all duration-300 border border-stone-200 dark:border-white/10 bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold text-stone-800 dark:text-white mb-1">
              {skill.name}
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Level: {skill.level}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider Animation */}
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

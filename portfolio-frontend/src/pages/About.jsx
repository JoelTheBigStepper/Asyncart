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
    <>
      <section
        id="about"
        className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-start justify-between gap-16 text-left bg-gray-50 dark:bg-stone-900 transition-colors duration-300"
      >
        {/* Left Side - Bio */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg text-stone-700 dark:text-gray-400 leading-relaxed max-w-xl">
            I'm a passionate <span className="text-amber-600 dark:text-amber-400 font-medium">Front-End Developer</span> 
            dedicated to crafting beautiful, functional, and responsive digital experiences. 
            I love bringing ideas to life through clean design, thoughtful UI, and interactive motion.
          </p>

          {/* Upwork Bio Integration */}
          <div className="border-l-4 border-amber-600 dark:border-amber-400 pl-4">
            <p className="text-stone-700 dark:text-gray-400 italic">
              “As a junior web designer and front-end developer, I focus on creating refined, balanced, and visually compelling interfaces. 
              I specialize in improving layout composition, spacing harmony, and typography alignment for luxury and creative brands.”
            </p>
          </div>
        </motion.div>

        {/* Right Side - Skills */}
        <motion.div
          className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-stone-800 p-5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform border border-stone-200 dark:border-stone-700"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-sm text-stone-600 dark:text-gray-400 mt-1">
                Level: {skill.level}
              </p>
              <div className="mt-3 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-600 dark:bg-amber-400"
                  initial={{ width: 0 }}
                  whileInView={{
                    width:
                      skill.level === "Beginner"
                        ? "40%"
                        : skill.level === "Intermediate"
                        ? "70%"
                        : "90%",
                  }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <motion.hr
        className="my-12 border-t-1 border-stone-300 dark:border-stone-800 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

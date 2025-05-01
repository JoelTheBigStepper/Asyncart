import { motion } from 'framer-motion';

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
        className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-start justify-between gap-10 text-left"
      >
        <hr className="my-8 border-t-2 border-gray-300 dark:border-gray-700" />
        {/* Left Side - Text */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-lg text-stone-600 dark:text-gray-400 max-w-xl">
            I'm a passionate Front-End Developer focused on creating interactive and visually appealing websites. Always eager to learn and improve.
          </p>
        </div>

        {/* Right Side - Skills */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-stone-800 dark:bg-stone-800 p-4 rounded-lg shadow hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold text-white dark:text-white">{skill.name}</h3>
              <p className="text-sm text-white dark:text-white">Level: {skill.level}</p>
            </div>
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

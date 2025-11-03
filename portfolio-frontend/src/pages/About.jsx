import { motion } from "framer-motion";
import myImage from "../assets/yh.png";

export default function About() {
  return (
    <motion.section
      id="about"
      className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Left - Image */}
      <motion.div
        className="flex-1 flex justify-center"
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={myImage}
          alt="Joel"
          className="rounded-2xl shadow-lg w-72 sm:w-80 md:w-96 object-cover border-4 border-stone-200 dark:border-stone-800"
        />
      </motion.div>

      {/* Right - Text */}
      <motion.div
        className="flex-1 text-left"
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-stone-800 dark:text-stone-200">
          About Me
        </h2>
        <p className="text-lg text-stone-600 dark:text-gray-400 mb-6 leading-relaxed">
          I’m Joel, a passionate Front-End Developer who enjoys transforming
          ideas into interactive and visually appealing web experiences. With a
          focus on clean design, performance, and usability, I build responsive
          interfaces that bring brands to life.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          {["React", "TailwindCSS", "JavaScript", "Node.js", "Framer Motion", "UI/UX"].map(
            (skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-center"
              >
                {skill}
              </motion.span>
            )
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}

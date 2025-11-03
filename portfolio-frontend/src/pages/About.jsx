import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const skills = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Git", icon: SiGit },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-24
                 bg-white text-stone-900 dark:bg-black dark:text-white transition-colors duration-500 font-outfit"
    >
      {/* LEFT - Text */}
      <motion.div
        className="flex-1 space-y-6"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          About <span className="text-amber-500">Me</span>
        </h2>

        <p className="text-lg text-stone-600 dark:text-gray-300 leading-relaxed max-w-xl">
          I’m Joel — a <span className="text-amber-500 font-semibold">Full-Stack Developer</span> passionate about crafting seamless digital experiences.
          I specialize in <span className="text-amber-500">React</span>, <span className="text-amber-500">Node.js</span>, <span className="text-amber-500">Express</span>, and <span className="text-amber-500">MongoDB</span>,
          blending functionality with refined design.  
          I also integrate email and verification flows using <span className="text-amber-500">Nodemailer</span> and <span className="text-amber-500">Mailboxlayer</span> APIs.
        </p>

        <blockquote className="border-l-4 border-amber-500 pl-4 italic text-stone-600 dark:text-gray-400 max-w-lg">
          “I aim for clarity, balance, and visual harmony in every project — from backend logic to elegant, responsive interfaces.”
        </blockquote>
      </motion.div>

      {/* RIGHT - Skills */}
      <motion.div
        className="flex-1 grid grid-cols-3 sm:grid-cols-3 gap-5 max-w-lg mt-12 md:mt-0"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {skills.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl
                       bg-gradient-to-br from-stone-100 to-stone-50 dark:from-stone-900 dark:to-stone-800
                       border border-stone-300/40 dark:border-stone-700/50
                       shadow-sm hover:shadow-md hover:border-amber-500/60 transition-all duration-300"
          >
            <div className="text-3xl text-amber-500 group-hover:text-amber-400 transition-colors">
              <Icon />
            </div>
            <p className="text-sm font-semibold tracking-wide">{name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

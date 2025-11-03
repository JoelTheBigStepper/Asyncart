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
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Git", icon: SiGit },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
];

export default function About() {
  return (
    <>
      <section
        id="about"
        className="px-6 py-20 flex flex-col md:flex-row items-start justify-between gap-16 bg-black text-white transition-colors duration-300"
      >
        {/* Left: Bio */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-outfit">
            About Me
          </h2>

          <p className="text-lg text-stone-300 leading-relaxed max-w-xl font-outfit">
            I’m Joel — a <span className="text-amber-400 font-semibold">Full-Stack Developer</span> who builds modern, scalable, and responsive web applications.  
            My typical stack includes <span className="text-amber-400 font-semibold">React</span>, <span className="text-amber-400 font-semibold">Node.js</span>, <span className="text-amber-400 font-semibold">Express</span>, and <span className="text-amber-400 font-semibold">MongoDB</span>.  
            I also integrate email/verification flows using <span className="text-amber-400 font-semibold">Nodemailer</span> and <span className="text-amber-400 font-semibold">Mailboxlayer</span>.
          </p>

          <div className="border-l-4 border-amber-500 pl-4">
            <p className="text-stone-300 italic max-w-lg">
              “I focus on improving layout balance, spacing, and visual consistency for brand and portfolio sites — delivering refined, accessible, and performance-minded interfaces.”
            </p>
          </div>
        </motion.div>

        {/* Right: Skills (icons) */}
        <motion.div
          className="flex-1 grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="relative p-5 rounded-xl border border-stone-800 bg-white/5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/6 dark:bg-white/6">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold">{skill.name}</h4>
                    <p className="text-sm text-stone-300">Experienced</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <motion.hr
        className="my-12 border-t w-[90%] mx-auto border-stone-700"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

// src/sections/About.jsx
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
      className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-[#0d0d0d] text-white"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-stone-400 text-lg leading-relaxed">
          A creative front-end developer passionate about clean code, refined
          visuals, and user-first design.
        </p>
      </motion.div>

      {/* Upwork-style Bio */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-3xl text-center mb-12"
      >
        <p className="text-stone-300 text-base md:text-lg leading-relaxed">
          I’m a dedicated Web Developer who loves crafting pixel-perfect,
          user-friendly interfaces with React, TailwindCSS, and modern
          JavaScript. On Upwork, I specialize in helping brands refine their
          visual presence — improving layout balance, spacing, and design
          consistency. I deliver polished portfolios, responsive landing pages,
          and elegant UI components that convert visitors into customers.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.08 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="relative p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg overflow-hidden"
          >
            {/* moving light overlay */}
            <motion.div
              aria-hidden
              initial={{ x: "-140%" }}
              animate={{ x: "140%" }}
              transition={{
                duration: 2.0 + (idx % 3) * 0.2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{
                position: "absolute",
                top: "-30%",
                left: 0,
                width: "45%",
                height: "200%",
                transform: "skewX(-20deg)",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%)",
                pointerEvents: "none",
                filter: "blur(6px)",
              }}
            />

            <h3 className="text-xl font-semibold text-white mb-1">
              {skill.name}
            </h3>
            <p className="text-stone-400 text-sm">Level: {skill.level}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA or profile link with sheen */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <a
          href="https://www.upwork.com/freelancers/~yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block overflow-hidden text-sm font-medium px-6 py-3 rounded-lg bg-white text-black"
        >
          <motion.span
            aria-hidden
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "40%",
              transform: "skewX(-18deg)",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
          View my Upwork profile
        </a>
      </motion.div>

      <motion.hr
        className="mt-20 border-t border-stone-800 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ originX: 0 }}
        viewport={{ once: true }}
      />
    </section>
  );
}

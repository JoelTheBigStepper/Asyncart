// src/sections/Works.jsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio to showcase my work, built with React, TailwindCSS, and Framer Motion.",
    code: "https://github.com/yourusername/asyncart",
    live: "https://asyncart.vercel.app/",
    image: "/images/portfolio-preview.jpg",
  },
  {
    title: "E-commerce UI",
    description:
      "A sleek, responsive e-commerce interface with product filters, cart logic, and modern transitions.",
    code: "https://github.com/yourusername/ecommerce-ui",
    live: "https://ecommerce-ui-demo.vercel.app/",
    image: "/images/ecommerce-preview.jpg",
  },
  {
    title: "Blog Platform",
    description:
      "A minimalist blog system with markdown support and smooth navigation, designed for content creators.",
    code: "https://github.com/yourusername/blog-platform",
    live: "https://blog-platform-demo.vercel.app/",
    image: "/images/blog-preview.jpg",
  },
];

export default function Works() {
  return (
    <section
      id="work"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-[#0d0d0d] text-white"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-stone-400 text-lg leading-relaxed">
          A curated selection of my favorite builds — blending functionality,
          motion, and minimal design.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            viewport={{ once: true }}
            className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-stone-900/40 transition-all duration-300 overflow-hidden"
          >
            {/* Moving light / sheen overlay for the whole card */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <motion.div
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{
                  width: "40%",
                  height: "220%",
                  transform: "skewX(-25deg)",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0) 100%)",
                  top: "-60%",
                  left: 0,
                  position: "absolute",
                  filter: "blur(10px)",
                }}
              />
            </motion.div>

            {/* Project Image */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
              <motion.img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6 }}
              />
              {/* subtle image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
              {/* small sheen specifically over the image for extra pop */}
              <motion.div
                aria-hidden
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                style={{
                  width: "30%",
                  height: "140%",
                  transform: "skewX(-20deg)",
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 100%)",
                  top: "-20%",
                  left: 0,
                  position: "absolute",
                }}
                className="pointer-events-none"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-stone-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden text-sm font-medium px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  {/* sheen on button */}
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{
                      duration: 1.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "45%",
                      transform: "skewX(-20deg)",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                      mixBlendMode: "screen",
                    }}
                  />
                  Code
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden text-sm font-medium px-4 py-2 rounded-lg bg-white text-black hover:bg-stone-200 transition-all duration-200"
                >
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{
                      duration: 1.5,
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
                  Visit Site
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
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

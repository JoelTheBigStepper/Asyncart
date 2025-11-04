import { motion } from "framer-motion";
import myImage from "../assets/yh.png";

export default function Home() {
  return (
    <>
      <motion.section
        id="hero"
        className="relative min-h-screen flex flex-col md:flex-row items-center justify-between gap-16 px-6 py-24 overflow-hidden 
                   bg-white text-stone-900 dark:bg-black dark:text-white transition-colors duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* ===== Mobile Background Image (Blurred) ===== */}
        <div
          className="absolute inset-0 md:hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${myImage})`,
            filter: "blur(12px) brightness(0.5)",
            transform: "scale(1.1)",
          }}
        ></div>
        <div className="absolute inset-0 md:hidden bg-black/50"></div>

        {/* ===== Left Side - Text ===== */}
        <div className="flex-1 z-10 space-y-6 text-center md:text-left">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight font-outfit text-stone-900 dark:text-white"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Hi, I’m{" "}
            <span className="text-amber-500 dark:text-amber-500">Joel</span>
            <br />
            A Full-Stack Developer
          </motion.h2>

          <p className="text-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-outfit text-stone-700 dark:text-gray-300">
            I build modern, scalable, and responsive web applications using{" "}
            <span className="text-amber-600 font-semibold">React</span>,{" "}
            <span className="text-amber-600 font-semibold">Node.js</span>, and{" "}
            <span className="text-amber-600 font-semibold">Express</span>. I integrate email and verification flows using{" "}
            <span className="text-amber-600 font-semibold">Nodemailer</span> and{" "}
            <span className="text-amber-600 font-semibold">Mailboxlayer</span>, and persist data with{" "}
            <span className="text-amber-600 font-semibold">MongoDB</span>.
          </p>

          <motion.a
            href="#contact"
            className="inline-block bg-amber-600 text-white px-7 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-amber-700 transition-all duration-300"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
          </motion.a>
        </div>

        {/* ===== Right Side (desktop only) ===== */}
        <motion.div
          className="hidden md:flex flex-1 justify-center relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Ambient Glow */}
          <motion.div
            className="absolute -inset-10 rounded-full blur-3xl -z-10
                       bg-gradient-to-tr from-amber-400/20 to-transparent
                       dark:from-amber-500/30 dark:to-transparent"
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={myImage}
            loading="lazy"
            alt="Joel portrait"
            className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl ring-1 ring-stone-200 dark:ring-stone-800 relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </motion.section>

      {/* Divider */}
      <motion.hr
        className="my-16 border-t w-[90%] mx-auto border-stone-300 dark:border-stone-700"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

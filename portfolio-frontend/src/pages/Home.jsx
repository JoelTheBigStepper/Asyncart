import { motion } from "framer-motion";
import myImage from "../assets/yh.png";

export default function Home() {
  return (
    <>
      <motion.section
        id="hero"
        className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16 text-left bg-gray-50 dark:bg-stone-900 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Text */}
        <div className="flex-1 space-y-6">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 dark:text-white leading-tight"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Hi, I'm <span className="text-amber-600 dark:text-amber-400">Joel</span> <br />
            A Front-End Developer
          </motion.h2>

          <p className="text-lg text-stone-700 dark:text-gray-400 leading-relaxed max-w-xl">
            I craft beautiful, interactive, and responsive web experiences using
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {" "}
              React, TailwindCSS,{" "}
            </span>
            and modern tools. Let’s bring your ideas to life with code that feels as good as it looks.
          </p>

          <motion.a
            href="#contact"
            className="inline-block bg-amber-600 text-white px-7 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-amber-700 transition-all duration-300 dark:bg-amber-500 dark:hover:bg-amber-400"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            Let’s Talk
          </motion.a>
        </div>

        {/* Right Side - Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <motion.img
              src={myImage}
              loading="lazy"
              alt="Joel illustration"
              className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg ring-1 ring-stone-200 dark:ring-stone-800"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            />

            {/* Gold glow accent behind image */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-transparent blur-2xl -z-10" />
          </div>
        </motion.div>
      </motion.section>

      {/* Divider */}
      <motion.hr
        className="my-16 border-t border-stone-300 dark:border-stone-800 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

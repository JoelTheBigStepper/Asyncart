import { motion } from 'framer-motion';
import myImage from '../assets/yh.png';

export default function Home() {
  return (
    <>
      <motion.section
        id="hero"
        className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10 text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Text */}
        <div className="flex-1">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-stone-800 dark:text-stone-300"
            whileHover={{ scale: 1.05 }}
          >
            Hi, I'm Joel<br /> A Front-End Developer
          </motion.h2>
          <p className="text-lg text-stone-600 dark:text-gray-400 mb-8 max-w-xl">
            I craft beautiful and responsive websites with modern tools like React and Tailwind CSS. Let's build something amazing.
          </p>
          <motion.a
            href="#contact"
            className="hover:bg-stone-800 dark:bg-black border border-1 border-stone-800 text-black hover:text-white dark:text-white px-6 py-3 rounded-md font-semibold hover:dark:bg-stone-700 hover:border-0"
            whileHover={{ scale: 1.05 }}
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Right Side - Image */}
        <motion.div
          className="flex-1 bg-white dark:bg-black"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={myImage}
            loading="lazy"
            alt="Joel illustration"
            className="rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
          />
        </motion.div>
      </motion.section>

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

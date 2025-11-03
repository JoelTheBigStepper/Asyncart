import { motion } from "framer-motion";
import myImage from "../assets/yh.png";

export default function Home() {
  return (
    <>
      <motion.section
        id="hero"
        className="min-h-screen bg-black text-white px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Text */}
        <div className="flex-1 space-y-6">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight font-outfit"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Hi, I’m <span className="text-amber-500">Joel</span>
            <br /> A Full-Stack Developer
          </motion.h2>

          <p className="text-lg text-gray-400 leading-relaxed max-w-xl font-outfit">
            I build modern, scalable, and responsive web applications using
            <span className="text-amber-500 font-semibold"> React, Node.js, Express, </span>
            and <span className="text-amber-500 font-semibold">MongoDB</span>.
            From frontend experiences to backend logic and integrations like
            <span className="text-amber-500 font-semibold"> Nodemailer</span> and
            <span className="text-amber-500 font-semibold"> Mailboxlayer</span>,
            I bring ideas to life through clean, performant code.
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

        {/* Right Side - Image + Glow */}
        <motion.div
          className="flex-1 flex justify-center relative"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Glow Background */}
          <motion.div
            className="absolute -inset-10 bg-gradient-to-tr from-amber-500/30 via-transparent to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src={myImage}
            loading="lazy"
            alt="Joel portrait"
            className="rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl ring-1 ring-stone-800 relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </motion.section>

      {/* Divider */}
      <motion.hr
        className="my-16 border-t border-stone-700 w-[90%] mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8 }}
        style={{ originX: 0.5 }}
      />
    </>
  );
}

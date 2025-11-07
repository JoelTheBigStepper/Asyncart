import { motion, AnimatePresence } from "framer-motion";

export default function AboutMoreModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-stone-900 text-stone-800 dark:text-gray-200 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative p-6 border border-stone-200 dark:border-stone-800"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl text-stone-600 dark:text-gray-300 hover:text-amber-500 transition"
          >
            ×
          </button>

          {/* Modal Title */}
          <h2 className="text-3xl font-bold mb-6 text-amber-500">More About Me</h2>

          {/* Content */}
          <div className="space-y-4 leading-relaxed text-[1rem]">
            <p>
              I’m <span className="font-semibold text-amber-600">Joel Ojo</span> — a passionate 
              <span className="text-amber-600 font-semibold"> Web Developer & Frontend Designer</span> 
              dedicated to building clean, responsive, and visually balanced digital experiences.
            </p>

            <p>
              My core stack includes 
              <span className="text-amber-600 font-semibold"> React</span>, 
              <span className="text-amber-600 font-semibold"> TailwindCSS</span>, and 
              <span className="text-amber-600 font-semibold"> Node.js</span>, where I focus on 
              creating modern, user-centered web applications that combine performance with elegance.
            </p>

            <p>
              I have hands-on experience integrating and managing APIs — including 
              <span className="text-amber-600 font-semibold"> MockAPI</span> — to handle real-world 
              data for dynamic, scalable applications.
            </p>

            <p>
              Beyond web development, I’m exploring 
              <span className="text-amber-600 font-semibold"> Python</span> as a beginner and 
              nurturing a growing interest in 
              <span className="text-amber-600 font-semibold"> cybersecurity</span>, learning how to 
              make systems both functional and secure.
            </p>

            <p>
              I value <span className="text-amber-600 font-semibold">attention to detail</span>, 
              <span className="text-amber-600 font-semibold"> consistency</span>, and 
              <span className="text-amber-600 font-semibold"> clarity in design</span> — ensuring 
              every project I build feels polished, reliable, and meaningful.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

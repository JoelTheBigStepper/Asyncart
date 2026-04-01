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
              I’m <span className="font-semibold text-amber-600">Joel Ojo</span>, a 
              <span className="text-amber-600 font-semibold"> Full-Stack Developer</span> focused on building 
              modern, scalable, and visually refined web applications.
            </p>

            <p>
              I work with 
              <span className="text-amber-600 font-semibold"> React</span>, 
              <span className="text-amber-600 font-semibold"> TailwindCSS</span>, 
              <span className="text-amber-600 font-semibold"> Node.js</span>, and 
              <span className="text-amber-600 font-semibold"> Express</span> to create 
              responsive, user-focused applications that balance performance with clean design.
            </p>

            <p>
              I build full-stack systems with real-world functionality, structuring applications 
              for scalability, maintainability, and efficient data handling using 
              <span className="text-amber-600 font-semibold"> MongoDB</span>.
            </p>

            <p>
              I also have experience working with APIs and backend services, integrating dynamic 
              data into applications and designing systems that handle real user interactions.
            </p>

            <p>
              Beyond development, I’m expanding my knowledge in 
              <span className="text-amber-600 font-semibold"> Python</span> and exploring 
              <span className="text-amber-600 font-semibold"> cybersecurity</span>, with a 
              focus on building secure and reliable systems.
            </p>

            <p>
              I prioritize 
              <span className="text-amber-600 font-semibold"> clarity</span>, 
              <span className="text-amber-600 font-semibold"> consistency</span>, and 
              <span className="text-amber-600 font-semibold"> attention to detail</span>,
              ensuring every project feels polished, functional, and impactful.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

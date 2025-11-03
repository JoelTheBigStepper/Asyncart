import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Modal({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-xl w-full mx-4 relative overflow-hidden border border-stone-200 dark:border-stone-800"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 text-xl hover:text-black dark:hover:text-white"
          >
            &times;
          </button>

          {/* Image */}
          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6 text-left">
            <h2 className="text-2xl font-semibold text-stone-900 dark:text-white mb-3">
              {project.title}
            </h2>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
              {project.description ||
                "A full-stack project built with modern technologies and best practices."}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium border border-stone-300 dark:border-stone-700 px-4 py-2 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                <FaGithub className="text-base" />
                View Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-all"
              >
                <FaExternalLinkAlt className="text-sm" />
                Visit Site
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

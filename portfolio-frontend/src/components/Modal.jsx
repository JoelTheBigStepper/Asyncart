import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, project }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-stone-900 rounded-xl shadow-xl max-w-lg w-full mx-4 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-600 dark:text-gray-300 text-xl hover:text-black dark:hover:text-white"
          >
            &times;
          </button>

          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover"
          />

          {/* Content */}
          <div className="p-6 text-left">
            <h2 className="text-2xl font-semibold text-stone-800 dark:text-white mb-3">
              {project.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {project.description}
            </p>

            <div className="flex gap-4">
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-gray-300 dark:border-stone-700 px-4 py-2 rounded hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                View Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-black text-white px-4 py-2 rounded dark:bg-white dark:text-black transition"
              >
                Visit Site
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

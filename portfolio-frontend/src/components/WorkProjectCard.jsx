import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function WorkProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative rounded-2xl overflow-hidden bg-white dark:bg-stone-900 shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300"
        whileHover={{ scale: 1.03, y: -3 }}
        onClick={() => setIsOpen(true)}
      >
        {/* Image with subtle gradient overlay */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
            {project.description || "A full-stack web project with modern tech."}
          </p>

          <div className="flex items-center justify-between mt-4 space-x-3">
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-lg hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="text-base" /> Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium bg-black text-white px-3 py-1.5 rounded-lg hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className="text-sm" /> Visit
            </a>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} />
    </>
  );
}

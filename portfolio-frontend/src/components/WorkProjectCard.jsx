import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";

export default function WorkProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-white dark:bg-stone-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative group cursor-pointer"
        whileHover={{ scale: 1.03 }}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
            {project.title}
          </h3>
          <div className="flex justify-between mt-4">
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm border border-gray-300 dark:border-stone-700 px-3 py-1 rounded hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-black text-white px-3 py-1 rounded dark:bg-white dark:text-black transition"
              onClick={(e) => e.stopPropagation()}
            >
              Visit
            </a>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} project={project} />
    </>
  );
}

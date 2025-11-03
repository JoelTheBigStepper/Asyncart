import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkProjectCard from "../components/WorkProjectCard";

export default function Works() {
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://asyncart.onrender.com/api/projects"); 
      const data = await res.json();

      if (data.success && data.projects?.length > 0) {
        setProjects(data.projects);
      } else {
        console.warn("No projects found, using fallback");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="work"
      className="min-h-screen px-6 md:px-16 py-24 text-left bg-white text-stone-900 dark:bg-black dark:text-white transition-colors duration-500 font-outfit"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Selected <span className="text-amber-500">Works</span>
        </h2>
        <p className="mb-12 text-stone-600 dark:text-gray-400 max-w-2xl">
          A curated selection of my most recent and impactful projects – blending design, interaction, and functionality.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-stone-600 dark:text-gray-400">Loading projects...</p>
        </div>
      ) : (
        <>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <WorkProjectCard
                  key={project._id || idx}
                  project={project}
                  onClick={() => setSelected(project)}
                />
              ))}
            </div>
          ) : (
            <p className="text-stone-600 dark:text-gray-400">
              No projects added yet.
            </p>
          )}

          {/* Modal */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-stone-900 rounded-2xl p-6 max-w-lg w-full relative text-stone-900 dark:text-white shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-4 text-stone-600 dark:text-gray-400 hover:text-amber-500 text-2xl font-bold"
                  >
                    ×
                  </button>

                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="rounded-xl mb-5 w-full object-cover max-h-64 border border-stone-200 dark:border-stone-700"
                  />
                  <h3 className="text-2xl font-bold mb-2 text-amber-500">{selected.title}</h3>
                  <p className="text-stone-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {selected.description}
                  </p>

                  <div className="flex gap-4">
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                    >
                      Live Site
                    </a>
                    <a
                      href={selected.code}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-amber-500 text-amber-500 px-5 py-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors font-semibold"
                    >
                      Code
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    demo: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch projects from MongoDB backend
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      if (data.success) setProjects(data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("code", formData.code);
    data.append("demo", formData.demo);
    if (image) data.append("image", image);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (result.success) {
        setProjects((prev) => [result.project, ...prev]);
        setFormData({ title: "", description: "", code: "", demo: "" });
        setImage(null);
      } else {
        alert("Error adding project");
      }
    } catch (err) {
      console.error("Error submitting project:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-black text-stone-900 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

        {/* Form Section */}
        <motion.form
          className="bg-white dark:bg-stone-900 p-6 rounded-xl shadow-md mb-10 space-y-4 border border-stone-200 dark:border-stone-800"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <label className="block mb-2 font-medium">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Code URL</label>
              <input
                type="url"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Demo URL</label>
              <input
                type="url"
                name="demo"
                value={formData.demo}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 transition-all"
          >
            {loading ? "Uploading..." : "Add Project"}
          </button>
        </motion.form>

        {/* Projects List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

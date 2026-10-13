import { useEffect, useState } from "react";
import ProjectForm from "../components/admin/ProjectForm";
import AdminProjectCard from "../components/admin/AdminProjectCard";

const API_URL = "https://asyncart.onrender.com/api/projects";
const emptyForm = { title: "", description: "", code: "", demo: "" };

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) setProjects(data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

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
      const res = await fetch(API_URL, { method: "POST", body: data });
      const result = await res.json();

      if (result.success) {
        setProjects((prev) => [result.project, ...prev]);
        setFormData(emptyForm);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <main className="min-h-screen bg-canvas px-6 py-14 text-ink md:px-12">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-semibold underline decoration-fill decoration-2 underline-offset-4">
          Back to portfolio
        </a>
        <h1 className="mb-10 mt-4 font-display text-5xl font-semibold tracking-tight">Admin</h1>

        <ProjectForm
          formData={formData}
          onChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {projects.length === 0 ? (
          <p className="text-soft">No projects yet. Add your first one above.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <AdminProjectCard key={project._id} project={project} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

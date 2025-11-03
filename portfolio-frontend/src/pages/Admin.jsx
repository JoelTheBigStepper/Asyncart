import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_PASSWORD = 'admin123'; // Change this to your secure password
const STORAGE_KEY = 'portfolio-projects';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    code: '',
    demo: ''
  });

  // Load projects from storage
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const result = await window.storage.get(STORAGE_KEY);
      if (result && result.value) {
        setProjects(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No existing projects found, starting fresh');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProjects = async (updatedProjects) => {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      return true;
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('Error saving projects. Please try again.');
      return false;
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      code: '',
      demo: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.description || !formData.image || !formData.code || !formData.demo) {
      alert('All fields are required!');
      return;
    }

    let updatedProjects;
    
    if (editingId !== null) {
      // Edit existing project
      updatedProjects = projects.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      );
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Date.now()
      };
      updatedProjects = [...projects, newProject];
    }

    const success = await saveProjects(updatedProjects);
    if (success) {
      resetForm();
      alert(editingId !== null ? 'Project updated successfully!' : 'Project added successfully!');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      code: project.code,
      demo: project.demo
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      const success = await saveProjects(updatedProjects);
      if (success) {
        alert('Project deleted successfully!');
      }
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Admin Panel</h1>
          <p className="text-stone-600 mb-6">Enter password to manage projects</p>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleLogin)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-stone-900">Portfolio Admin</h1>
            <p className="text-stone-600 mt-1">Manage your projects</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add Project Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
          >
            + Add New Project
          </button>
        )}

        {/* Project Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                {editingId !== null ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-stone-700 font-medium mb-2">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Asyncart Portfolio"
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the project..."
                    rows="3"
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />
                  )}
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    name="demo"
                    value={formData.demo}
                    onChange={handleInputChange}
                    placeholder="https://project-demo.com"
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  >
                    {editingId !== null ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-stone-200 text-stone-700 py-3 rounded-lg font-semibold hover:bg-stone-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            All Projects ({projects.length})
          </h2>
          
          {isLoading ? (
            <p className="text-stone-600 text-center py-8">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-stone-600 text-center py-8">No projects yet. Add your first project!</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-stone-900">{project.title}</h3>
                      <p className="text-stone-600 text-sm mt-1 line-clamp-2">{project.description}</p>
                      <div className="flex gap-2 mt-3">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-600 hover:underline"
                        >
                          Live Demo
                        </a>
                        <span className="text-stone-400">•</span>
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-600 hover:underline"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
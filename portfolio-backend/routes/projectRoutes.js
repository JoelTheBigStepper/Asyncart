import express from "express";
import Project from "../models/Projects.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching projects" });
  }
});

// Add new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, code, demo } = req.body;
    const image = req.file?.path; // Cloudinary image URL
    const project = await Project.create({ title, description, image, code, demo });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding project" });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting project" });
  }
});

export default router;

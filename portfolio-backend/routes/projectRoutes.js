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
    const image = req.file?.path;
    const project = await Project.create({ title, description, image, code, demo });
    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding project" });
  }
});

// Update project (called by Velastrux dashboard)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, code, demo, image } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (code !== undefined) updates.code = code;
    if (demo !== undefined) updates.demo = demo;
    if (image !== undefined) updates.image = image;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating project" });
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
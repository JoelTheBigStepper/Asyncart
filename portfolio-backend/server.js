// ============================
// 📦 IMPORTS & CONFIG
// ============================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import projectRoutes from "./routes/projectRoutes.js";
import velastrux from "./middleware/velastrux.js";
import upload from "./middleware/upload.js";

dotenv.config();

const app = express();



// ============================
// 🌍 MIDDLEWARE - CRITICAL ORDER
// ============================
// 1. CORS must be first to handle cross-origin requests
app.use(
  cors({
    origin: [
      "https://asyncart.vercel.app", // Production
      "http://localhost:3000",
      "http://localhost:5173",       // Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Velastrux-Token"],
    credentials: true,
  })
);

// 2. Body parsing middleware
app.use(express.json());

// 3. Authentication/Validation middleware BEFORE routes
app.use(velastrux); // ✅ Validates X-Velastrux-Token header

// ============================
// ⚡ CONNECT TO MONGODB
// ============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================
// 📡 ROUTES
// ============================
// All routes are protected by velastrux middleware (registered above)

// Projects API (MongoDB + Cloudinary)
app.use("/api/projects", projectRoutes);

// Health check (public endpoint - no auth required)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});



// ============================
// 🚀 START SERVER
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("\n");
  console.log("╔════════════════════════════════════╗");
  console.log("║  🚀 SERVER STARTED SUCCESSFULLY   ║");
  console.log("╠════════════════════════════════════╣");
  console.log(`║  Port: ${PORT}`.padEnd(36) + "║");
  console.log(`║  Env: ${process.env.NODE_ENV || "development"}`.padEnd(36) + "║");
  console.log("║  Middleware: CORS → JSON → Auth    ║");
  console.log("╚════════════════════════════════════╝");
  console.log("\n");
});

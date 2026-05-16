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
// 🌍 MIDDLEWARE
// ============================
app.use(cors({
  origin: [
    "https://asyncart.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Velastrux-Token"],
  credentials: true,
}));

app.use(express.json());

// ============================
// 🏥 HEALTH CHECK (public — no auth, no DB needed)
// ============================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "connecting"
  });
});

// ============================
// 🔐 VELASTRUX AUTH MIDDLEWARE
// Only applies to /api routes — not /health
// ============================
app.use("/api", velastrux);

// ============================
// 📡 ROUTES
// ============================
app.use("/api/projects", projectRoutes);

// ============================
// ⚡ START — connect DB first, then listen
// ============================
const PORT = process.env.PORT || 5000;
const rawMongoUri = process.env.MONGODB_URI?.trim();

if (!rawMongoUri) {
  console.error("❌ MongoDB connection error: MONGODB_URI is not defined");
  process.exit(1);
}

const normalizedMongoUri = rawMongoUri.startsWith("mongodb+srv://")
  ? rawMongoUri.replace(/^(mongodb\+srv:\/\/)([^:/?#]+):\d+(@)/, "$1$2$3")
  : rawMongoUri;

if (normalizedMongoUri !== rawMongoUri) {
  console.warn("⚠️ Normalized MongoDB URI by removing unsupported port from mongodb+srv connection string.");
}

mongoose
  .connect(normalizedMongoUri)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
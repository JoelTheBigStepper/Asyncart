// ============================
// 📦 IMPORTS & CONFIG
// ============================
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

// ============================
// 🌍 MIDDLEWARE
// ============================
app.use(
  cors({
    origin: [
      "https://asyncart.vercel.app", // Production
      "http://localhost:3000",       // Local dev
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// ============================
// ⚡ CONNECT TO MONGODB
// ============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================
// ☁️ ROUTES
// ============================

// --- Projects API (MongoDB + Cloudinary)
app.use("/api/projects", projectRoutes);

// --- Email Contact Route ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Simple email validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Mailboxlayer verification
async function verifyEmailExists(email) {
  const accessKey = process.env.MAILBOXLAYER_API_KEY;
  const url = `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    const { smtp_check, format_valid, score, domain } = response.data;

    console.log(`Mailboxlayer response for ${email}:`, response.data);

    if (
      smtp_check ||
      domain === "gmail.com" ||
      (format_valid && score > 0.65)
    ) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Verification error:", error.message);
    return true; // Allow email if verification fails
  }
}

// ============================
// ✉️ EMAIL ENDPOINT
// ============================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "All fields are required." });

  if (!validateEmail(email))
    return res.status(400).json({ success: false, message: "Invalid email format." });

  let isRealEmail = false;
  try {
    isRealEmail = await verifyEmailExists(email);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error verifying email." });
  }

  if (!isRealEmail)
    return res.status(400).json({ success: false, message: "Email does not appear valid or reachable." });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

// ============================
// ✅ SERVER
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

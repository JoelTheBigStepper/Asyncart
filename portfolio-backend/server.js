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
// 📧 EMAIL CONFIGURATION
// ============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter ready");
  }
});

// Email validation helper
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ============================
// ✉️ EMAIL VERIFICATION (Mailboxlayer API)
// ============================
async function verifyEmailExists(email) {
  const accessKey = process.env.MAILBOXLAYER_API_KEY;
  
  if (!accessKey) {
    console.warn("⚠️ MAILBOXLAYER_API_KEY not set - skipping email verification");
    return true;
  }
  
  const url = `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    const { smtp_check, format_valid, score, domain } = response.data;

    console.log(`📧 Mailboxlayer verification for ${email}:`, response.data);

    // Accept if: SMTP check passes, is Gmail, or has good format score
    if (smtp_check || domain === "gmail.com" || (format_valid && score > 0.65)) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("⚠️ Email verification error:", error.message);
    return true; // Allow if verification service fails
  }
}

// ============================
// ✉️ SEND EMAIL ENDPOINT
// ============================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, email, message) are required.",
    });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  // Verify email actually exists
  try {
    const isRealEmail = await verifyEmailExists(email);
    if (!isRealEmail) {
      return res.status(400).json({
        success: false,
        message: "Email does not appear valid or reachable.",
      });
    }
  } catch (error) {
    console.error("❌ Email verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying email.",
    });
  }

  // Prepare email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `📧 Portfolio Message from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent from ${email}`);
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("❌ Email send error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending email. Please try again later.",
    });
  }
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

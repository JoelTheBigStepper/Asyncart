const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://asyncart.vercel.app/",// Replace with your actual deployed Vercel URL
    "http://localhost:3000" // Allow local development
  ],
  methods: ["POST"],
  credentials: true
}));
app.use(express.json());

// Create a transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Validate email format
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Verify email existence using Mailboxlayer API
async function verifyEmailExists(email) {
  const accessKey = process.env.MAILBOXLAYER_API_KEY;
  const url = `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    return response.data.smtp_check; // true if email is likely deliverable
  } catch (error) {
    console.error("Verification error:", error.message);
    return false;
  }
}

// Endpoint to handle email sending
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Request body:", req.body);

  if (!name || !email || !message) {
    console.log("Validation failed");
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (!validateEmail(email)) {
    console.log("Invalid email format");
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  const isRealEmail = await verifyEmailExists(email);
  console.log("Email check result:", isRealEmail);
  if (!isRealEmail) {
    return res.status(400).json({ success: false, message: "Email does not appear to be valid or reachable." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});


// For Render or Vercel compatibility
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

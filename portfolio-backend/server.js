const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config(); // Make sure to load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create a transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail", // Change to your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password
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

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  // Verify actual email deliverability
  const isRealEmail = await verifyEmailExists(email);
  if (!isRealEmail) {
    return res.status(400).json({ success: false, message: "Email does not appear to be valid or reachable." });
  }

  // Setup mail options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Replace with your email
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

// Server running
app.listen(5000, () => {
  console.log("Backend is running on port 5000.");
});

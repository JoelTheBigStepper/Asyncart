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
    "https://asyncart.vercel.app", // Corrected the trailing slash issue
    "http://localhost:3000" // Allow local development
  ],
  methods: ["GET", "POST", "OPTIONS"], // Allow OPTIONS preflight requests as well
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

// Improved Mailboxlayer email verification
async function verifyEmailExists(email) {
  const accessKey = process.env.MAILBOXLAYER_API_KEY;
  const url = `http://apilayer.net/api/check?access_key=${accessKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await axios.get(url);
    const { smtp_check, format_valid, score, domain } = response.data;

    console.log(`Mailboxlayer response for ${email}:`, response.data);

    // Accept if:
    // - SMTP check passes
    // - OR domain is known to block SMTP (like Gmail)
    // - OR score is high and format is valid
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
    return true; // Don't block user just because verification failed
  }
}

// Endpoint to handle email sending
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Check if all required fields are present
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  // Verify email existence
  let isRealEmail = false;
  try {
    isRealEmail = await verifyEmailExists(email);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error verifying email." });
  }

  // If email is invalid or unreachable, return an error
  if (!isRealEmail) {
    return res.status(400).json({ success: false, message: "Email does not appear to be valid or reachable." });
  }

  // Prepare the email to send
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your authenticated email
    to: process.env.EMAIL_USER,   // Same email to receive messages
    replyTo: email,               // Allows you to "Reply" to the user's email directly
    subject: `Message from ${name}`,
    text: message,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

// For Render or Vercel compatibility
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});

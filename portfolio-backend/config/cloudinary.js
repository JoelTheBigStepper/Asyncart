// ============================
// ☁️ CLOUDINARY CONFIGURATION
// ============================
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verify configuration
const isConfigured =
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isConfigured) {
  console.log("✅ Cloudinary configured successfully");
} else {
  console.error("❌ Cloudinary configuration incomplete - check .env file");
  console.error("   Missing: ", {
    cloud_name: !process.env.CLOUDINARY_CLOUD_NAME ? "CLOUDINARY_CLOUD_NAME" : null,
    api_key: !process.env.CLOUDINARY_API_KEY ? "CLOUDINARY_API_KEY" : null,
    api_secret: !process.env.CLOUDINARY_API_SECRET ? "CLOUDINARY_API_SECRET" : null,
  });
}

export default cloudinary;

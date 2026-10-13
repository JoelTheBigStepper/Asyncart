import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { RESUME } from "../data/site";

const looks = {
  glass: "glass text-ink hover:bg-canvas",
  solid: "bg-ink text-canvas hover:bg-link",
};

// A real file download: the PDF in /public is served from the site root.
export default function ResumeButton({ variant = "solid", className = "" }) {
  return (
    <motion.a
      href={RESUME.href}
      download={RESUME.filename}
      aria-label="Download resume as a PDF"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 font-semibold transition-colors ${looks[variant]} ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      Download resume
      <span className="rounded-full bg-fill/30 px-2 py-0.5 text-xs">PDF</span>
    </motion.a>
  );
}

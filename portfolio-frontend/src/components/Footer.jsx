import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Github, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="relative bg-black dark:bg-stone-900 text-white dark:text-white pt-12 pb-6 mt-24 border-t border-stone-800 transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left - Text */}
        <p className="text-stone-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} <span className="text-amber-500 font-semibold">Asyncart</span>. All rights reserved.
        </p>

        {/* Center - Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JoelTheBigStepper"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/JoelDaBigSteppa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-500 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

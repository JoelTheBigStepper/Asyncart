import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Github, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="bg-black dark:bg-stone-900 text-white pt-8 pb-4 mt-20 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left - Text */}
        <p className="text-center md:text-left text-sm">
          © {new Date().getFullYear()} AsyncArt. All rights reserved.
        </p>

        {/* Center - Social Icons */}
        <div className="flex space-x-6 mt-4 mr-4 md:mt-0">
          <a href="https://github.com/JoelTheBigStepper" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <Github />
          </a>
          <a href="https://x.com/JoelDaBigSteppa" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <Twitter />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <Linkedin />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <Facebook />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

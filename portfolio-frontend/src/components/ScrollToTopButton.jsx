import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-black dark:bg-white text-white dark:text-black p-3 rounded-full shadow-md hover:scale-110 transition-all z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    )
  );
}

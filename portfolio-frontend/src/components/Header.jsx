import { Sun, Moon, Home, User, Briefcase, Mail, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="shadow-md sticky top-0 z-30 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Site Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">AsyncArt</h1>
           {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4">
            <a href="#home" className="text-black dark:text-white hover:text-blue-400">Home</a>
            <a href="#about" className="text-black dark:text-white hover:text-blue-400">About</a>
            <a href="#work" className="text-black dark:text-white hover:text-blue-400">Work</a>
            <a href="#contact" className="text-black dark:text-white hover:text-blue-400">Contact</a>
          </nav>
          {/* Theme Toggle + Hamburger */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-black dark:text-white">
              {theme === "dark" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>

            <button onClick={() => setIsOpen(true)} className="text-black dark:text-white">
              <Menu className="w-7 h-7 lg:hidden" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white dark:bg-black text-black dark:text-white rounded-lg p-8 w-[90%] space-y-8"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-black dark:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Links */}
              <div className="flex flex-col items-start space-y-6">
                <a href="#home" onClick={handleLinkClick} className="flex items-center space-x-2 hover:text-blue-400">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a href="#about" onClick={handleLinkClick} className="flex items-center space-x-2 hover:text-blue-400">
                  <User className="w-5 h-5" />
                  <span>About</span>
                </a>
                <a href="#work" onClick={handleLinkClick} className="flex items-center space-x-2 hover:text-blue-400">
                  <Briefcase className="w-5 h-5" />
                  <span>Work</span>
                </a>
                <a href="#contact" onClick={handleLinkClick} className="flex items-center space-x-2 hover:text-blue-400">
                  <Mail className="w-5 h-5" />
                  <span>Contact</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

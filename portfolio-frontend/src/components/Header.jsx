import { Sun, Moon, Home, User, Briefcase, Mail, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      {/* HEADER */}
      <motion.header
        className="sticky top-0 z-30 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-stone-200 dark:border-stone-800 shadow-sm transition-colors duration-300"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            Async<span className="text-amber-500">Art</span>
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 font-medium">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#work", label: "Work" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-stone-700 dark:text-gray-300 hover:text-amber-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme + Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-stone-800 dark:text-white hover:text-amber-500 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-stone-800 dark:text-white hover:text-amber-500 transition-colors"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-start pt-24 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded-2xl p-10 w-[85%] max-w-md shadow-xl border border-stone-200 dark:border-stone-800"
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-stone-700 dark:text-gray-300 hover:text-amber-500"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Nav Links */}
              <div className="flex flex-col items-start space-y-8 mt-6 text-lg font-medium">
                {[
                  { href: "#home", label: "Home", icon: <Home /> },
                  { href: "#about", label: "About", icon: <User /> },
                  { href: "#work", label: "Work", icon: <Briefcase /> },
                  { href: "#contact", label: "Contact", icon: <Mail /> },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 hover:text-amber-500 transition-colors"
                  >
                    <span className="text-amber-500">{link.icon}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

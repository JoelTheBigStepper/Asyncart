import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import useActiveSection from "../hooks/useActiveSection";
import useLockBodyScroll from "../hooks/useLockBodyScroll";

const links = [
  { id: "work", label: "Work" },
  { id: "toolbox", label: "Toolbox" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
const sectionIds = ["home", ...links.map((link) => link.id)];

export default function Header({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <motion.header
        className="glass-bar sticky top-0 z-40 px-6 md:px-12"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between py-3">
          <a href="#home" className="font-display text-2xl font-extrabold tracking-tight">
            Async<span className="text-link">Art</span>
          </a>

          <div className="flex items-center gap-3">
            <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
              {links.map((link) => {
                const isCurrent = active === link.id;
                const isContact = link.id === "contact";
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isCurrent ? "true" : undefined}
                    className={
                      isContact
                        ? "rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-link"
                        : `text-sm font-semibold underline decoration-2 underline-offset-8 transition-colors hover:decoration-fill ${
                            isCurrent ? "decoration-fill" : "decoration-transparent"
                          }`
                    }
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="glass-strong fixed inset-0 z-50 flex flex-col px-6 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold tracking-tight">
                Async<span className="text-link">Art</span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-14 flex flex-col">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-line py-4 font-display text-5xl font-semibold tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + index * 0.07 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

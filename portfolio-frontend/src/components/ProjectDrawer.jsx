import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import ProjectDetail from "./ProjectDetail";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import useMediaQuery from "../hooks/useMediaQuery";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Side panel on desktop, bottom sheet on phones. Opens from any project in the page.
export default function ProjectDrawer({ project, onClose }) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const isOpen = Boolean(project);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    const opener = document.activeElement;
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  const hidden = reduce ? { opacity: 0 } : isDesktop ? { x: "100%" } : { y: "100%" };
  const shown = reduce ? { opacity: 1 } : isDesktop ? { x: 0 } : { y: 0 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-forest/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            className="absolute bottom-0 left-0 right-0 flex max-h-[92vh] flex-col glass-strong rounded-t-2xl text-ink shadow-2xl sm:left-auto sm:top-0 sm:max-h-none sm:max-w-xl sm:rounded-none"
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex justify-end p-3">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-panel"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <ProjectDetail project={project} />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

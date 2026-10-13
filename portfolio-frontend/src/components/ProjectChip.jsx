import { motion, useReducedMotion } from "framer-motion";

const tones = {
  sage: "bg-panel2",
  blush: "bg-panel",
};

// A project name set inline inside a sentence. Opens that project's detail.
export default function ProjectChip({ icon: Icon, tone = "sage", onClick, children }) {
  const reduce = useReducedMotion();
  const variants = reduce
    ? undefined
    : {
        hidden: { opacity: 0, scale: 0.85 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
      };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={variants}
      aria-haspopup="dialog"
      className={`inline-flex items-center gap-[0.3em] rounded-full px-[0.55em] py-[0.02em] align-baseline text-[0.86em] font-semibold text-ink transition-transform hover:-translate-y-0.5 ${tones[tone]}`}
    >
      <Icon className="h-[0.75em] w-[0.75em]" aria-hidden="true" />
      {children}
    </motion.button>
  );
}

import { motion } from "framer-motion";

// Fades and lifts its children into view once, the first time they scroll in.
export default function Reveal({ as = "div", delay = 0, y = 24, className = "", children }) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

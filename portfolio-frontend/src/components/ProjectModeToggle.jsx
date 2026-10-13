import { motion } from "framer-motion";

const options = [
  { key: "real", label: "Real-world projects" },
  { key: "demo", label: "Demo projects" },
];

export default function ProjectModeToggle({ mode, setMode, counts }) {
  const onKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = mode === "real" ? "demo" : "real";
    setMode(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Project type"
      onKeyDown={onKeyDown}
      className="glass inline-flex w-full rounded-full p-1 md:w-auto"
    >
      {options.map((option) => {
        const selected = mode === option.key;
        return (
          <button
            key={option.key}
            id={`tab-${option.key}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${option.key}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => setMode(option.key)}
            className="relative min-w-0 flex-1 rounded-full px-4 py-2.5 text-sm font-semibold md:flex-none md:px-6"
          >
            {selected && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-full bg-panel2"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">
              {option.label} <span className="font-normal">({counts[option.key]})</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

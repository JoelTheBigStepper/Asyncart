import { Eye } from "lucide-react";

export default function DemoTile({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="group block w-full text-left"
    >
      <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-panel">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} website preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <span className="flex h-full items-end bg-panel2 p-4 font-display text-xl font-semibold">
            {project.title}
          </span>
        )}
        <span className="glass-dark absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <Eye className="h-3.5 w-3.5" aria-hidden="true" /> View details
        </span>
      </span>
      <span className="mt-3 block font-display text-xl font-semibold tracking-tight">
        {project.title}
      </span>
      <span className="mt-1 line-clamp-2 block text-sm text-soft">{project.tagline}</span>
    </button>
  );
}

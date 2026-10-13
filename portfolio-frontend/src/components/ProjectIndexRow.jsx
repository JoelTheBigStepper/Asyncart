import { ArrowUpRight } from "lucide-react";

export default function ProjectIndexRow({ project, onOpen }) {
  const summary = project.tagline || project.description;
  const stack = project.stack?.slice(0, 3).join(", ");

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="group grid w-full gap-2 px-3 py-6 text-left transition-colors hover:bg-panel md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center md:gap-8"
    >
      <span className="font-display text-3xl font-semibold tracking-tight">{project.title}</span>

      <span className="flex flex-col gap-1">
        <span className="line-clamp-2">{summary}</span>
        {stack && <span className="text-sm text-soft">{stack}</span>}
      </span>

      <ArrowUpRight
        className="hidden h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block"
        aria-hidden="true"
      />
    </button>
  );
}

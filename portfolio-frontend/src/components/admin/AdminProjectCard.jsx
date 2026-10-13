import { Trash2 } from "lucide-react";

export default function AdminProjectCard({ project, onDelete }) {
  return (
    <li className="overflow-hidden rounded-xl border border-line bg-canvas">
      {project.image && (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="h-40 w-full object-cover object-top"
        />
      )}
      <div className="p-4">
        <h3 className="font-display text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-soft">{project.description}</p>
        <button
          type="button"
          onClick={() => onDelete(project._id)}
          className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-danger px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger hover:text-canvas"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
        </button>
      </div>
    </li>
  );
}

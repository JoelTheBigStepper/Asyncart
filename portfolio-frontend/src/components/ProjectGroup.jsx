import ProjectIndexRow from "./ProjectIndexRow";
import Reveal from "./Reveal";

export default function ProjectGroup({ group, onOpen }) {
  return (
    <div className="mb-16 last:mb-0">
      <Reveal className="flex flex-col gap-1 border-b-2 border-ink pb-3 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-display text-xl font-semibold">{group.title}</h3>
        {group.note && <p className="text-sm text-soft">{group.note}</p>}
      </Reveal>

      <ul>
        {group.projects.map((project, index) => (
          <Reveal
            as="li"
            key={project._id || project.id}
            delay={Math.min(index, 5) * 0.05}
            y={16}
            className="border-b border-line"
          >
            <ProjectIndexRow project={project} onOpen={onOpen} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

import SkillChip from "./SkillChip";

export default function ToolboxRow({ layer }) {
  return (
    <div className="grid gap-5 border-t border-ink/40 py-9 md:grid-cols-[15rem_1fr] md:gap-12">
      <div>
        <h3 className="font-display text-3xl font-semibold tracking-tight">{layer.name}</h3>
        <p className="mt-1">{layer.blurb}</p>
      </div>

      <div>
        <ul className="flex flex-wrap gap-2">
          {layer.skills.map((skill) => (
            <li key={skill}>
              <SkillChip name={skill} />
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed">{layer.proof}</p>
      </div>
    </div>
  );
}

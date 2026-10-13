import skillIcons from "../data/skillIcons";

export default function SkillChip({ name }) {
  const Icon = skillIcons[name];

  return (
    <span className="glass-tint inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
      {Icon ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <span className="h-2 w-2 rounded-full bg-fill" aria-hidden="true" />
      )}
      {name}
    </span>
  );
}

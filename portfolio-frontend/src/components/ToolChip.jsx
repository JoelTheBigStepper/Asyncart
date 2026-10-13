import skillIcons from "../data/skillIcons";

export default function ToolChip({ name }) {
  const Icon = skillIcons[name];

  return (
    <li className="glass-tint flex shrink-0 items-center gap-3 rounded-full px-6 py-3.5 text-lg font-semibold text-ink md:gap-4 md:px-8 md:py-4 md:text-2xl">
      {Icon ? (
        <Icon className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
      ) : (
        <span className="h-3 w-3 rounded-full bg-fill" aria-hidden="true" />
      )}
      {name}
    </li>
  );
}

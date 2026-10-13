import { dailyTools } from "../data/toolbox";
import skillIcons from "../data/skillIcons";

export default function QuickStack() {
  return (
    <div className="mt-16 border-t border-line pt-6">
      <p className="text-sm text-soft">Tools I reach for every day</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {dailyTools.map((name) => {
          const Icon = skillIcons[name];
          return (
            <li key={name} className="flex items-center gap-2 text-sm font-semibold">
              {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

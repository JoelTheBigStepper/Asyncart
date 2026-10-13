import ToolChip from "./ToolChip";

// One endless row. The list is rendered twice so the loop has no gap.
export default function MarqueeRow({ tools, reverse = false }) {
  return (
    <div className="marquee-mask overflow-hidden motion-reduce:overflow-x-auto">
      <div
        className={`flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <ul className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4">
          {tools.map((name) => (
            <ToolChip key={name} name={name} />
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 gap-3 pr-3 motion-reduce:hidden md:gap-4 md:pr-4">
          {tools.map((name) => (
            <ToolChip key={name} name={name} />
          ))}
        </ul>
      </div>
    </div>
  );
}

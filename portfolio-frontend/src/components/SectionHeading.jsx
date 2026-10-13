import Reveal from "./Reveal";

export default function SectionHeading({ id, title, intro }) {
  return (
    <Reveal>
      <h2 id={id} className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed">{intro}</p>}
    </Reveal>
  );
}

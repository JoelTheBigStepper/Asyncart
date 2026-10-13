// Soft drifting color behind a section, so glass surfaces above it have something to blur.
const palettes = {
  onSage: ["bg-panel", "bg-fill/60", "bg-cream/70"],
  onCanvas: ["bg-panel2", "bg-panel", "bg-fill/40"],
};

export default function AmbientOrbs({ tone = "onSage" }) {
  const [a, b, c] = palettes[tone];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className={`absolute -left-20 top-12 h-64 w-64 rounded-full blur-3xl animate-drift md:h-96 md:w-96 ${a}`} />
      <span className={`absolute -right-16 top-1/3 h-56 w-56 rounded-full blur-3xl animate-drift [animation-delay:-6s] md:h-80 md:w-80 ${b}`} />
      <span className={`absolute bottom-0 left-1/3 h-52 w-52 rounded-full blur-3xl animate-drift [animation-delay:-12s] md:h-72 md:w-72 ${c}`} />
    </div>
  );
}

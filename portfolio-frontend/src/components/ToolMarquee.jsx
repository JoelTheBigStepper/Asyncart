import AmbientOrbs from "./AmbientOrbs";
import MarqueeRow from "./MarqueeRow";
import Reveal from "./Reveal";
import { marqueeTools } from "../data/toolbox";

const rowOne = marqueeTools.filter((_, index) => index % 2 === 0);
const rowTwo = marqueeTools.filter((_, index) => index % 2 === 1);

export default function ToolMarquee() {
  return (
    <section
      aria-labelledby="tools-title"
      className="relative overflow-hidden bg-panel py-14 md:py-20"
    >
      <AmbientOrbs tone="onCanvas" />

      <div className="relative">
        <Reveal className="mx-auto mb-8 max-w-6xl px-6 md:mb-12 md:px-12">
          <h2
            id="tools-title"
            className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Tools I use every day
          </h2>
          <p className="mt-2 text-soft">And the rest of what I have shipped with.</p>
        </Reveal>

        <div className="space-y-3 md:space-y-4">
          <MarqueeRow tools={rowOne} />
          <MarqueeRow tools={rowTwo} reverse />
        </div>
      </div>
    </section>
  );
}

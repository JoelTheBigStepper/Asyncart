import SectionHeading from "../components/SectionHeading";
import ToolboxRow from "../components/ToolboxRow";
import AmbientOrbs from "../components/AmbientOrbs";
import Reveal from "../components/Reveal";
import { toolboxLayers } from "../data/toolbox";

export default function Toolbox() {
  return (
    <section
      id="toolbox"
      aria-labelledby="toolbox-title"
      className="relative scroll-mt-16 overflow-hidden bg-panel2 px-6 py-20 md:px-12 md:py-28"
    >
      <AmbientOrbs tone="onSage" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="toolbox-title"
          title="Toolbox"
          intro="My skills grouped by what they do, each with the real project where I used it."
        />

        <div className="mt-14">
          {toolboxLayers.map((layer, index) => (
            <Reveal key={layer.id} delay={index * 0.04}>
              <ToolboxRow layer={layer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

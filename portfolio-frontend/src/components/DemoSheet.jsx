import { useState } from "react";
import DemoTile from "./DemoTile";
import Reveal from "./Reveal";

const INITIAL_COUNT = 8;

export default function DemoSheet({ projects, onOpen }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  if (projects.length === 0) {
    return <p className="text-soft">No demo projects yet. New concept sites will appear here.</p>;
  }

  return (
    <>
      <p className="mb-8 max-w-2xl text-soft">
        Concept sites from a daily web project challenge. Each one is a full responsive build for a
        different kind of business.
      </p>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((project, index) => (
          <Reveal as="li" key={project.id} delay={(index % 4) * 0.07} y={18}>
            <DemoTile project={project} onOpen={onOpen} />
          </Reveal>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className="mt-10 rounded-full border-2 border-ink px-6 py-3 font-semibold transition-colors hover:bg-panel2"
        >
          {showAll ? "Show fewer" : `Show all ${projects.length} demos`}
        </button>
      )}
    </>
  );
}

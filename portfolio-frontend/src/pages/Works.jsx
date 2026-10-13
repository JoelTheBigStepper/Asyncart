import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ProjectModeToggle from "../components/ProjectModeToggle";
import ProjectGroup from "../components/ProjectGroup";
import DemoSheet from "../components/DemoSheet";

export default function Works({ groups, demoProjects, onOpen }) {
  const [mode, setMode] = useState("real");
  const realCount = groups.reduce((total, group) => total + group.projects.length, 0);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-16 px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-title"
            title="Work"
            intro="Real-world projects have real users or clients behind them. Demo projects are concept builds I make to practise."
          />
          <ProjectModeToggle
            mode={mode}
            setMode={setMode}
            counts={{ real: realCount, demo: demoProjects.length }}
          />
        </div>

        <div
          role="tabpanel"
          id={`panel-${mode}`}
          aria-labelledby={`tab-${mode}`}
          className="mt-14"
        >
          {mode === "real" ? (
            groups.map((group) => (
              <ProjectGroup key={group.id} group={group} onOpen={onOpen} />
            ))
          ) : (
            <DemoSheet projects={demoProjects} onOpen={onOpen} />
          )}
        </div>
      </div>
    </section>
  );
}

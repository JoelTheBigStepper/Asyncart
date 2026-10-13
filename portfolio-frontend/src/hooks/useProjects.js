import { useEffect, useMemo, useState } from "react";
import { realGroups } from "../data/realProjects";
import demoProjects from "../data/demoProjects";

const API_URL = "https://asyncart.onrender.com/api/projects";

// Real-world projects are curated in data/realProjects.js. Anything added
// through the Admin panel is merged in underneath, skipping duplicates by title.
export default function useProjects() {
  const [remote, setRemote] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) setRemote(data.projects);
      } catch (error) {
        if (error.name !== "AbortError") console.error("Error fetching projects:", error);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const groups = useMemo(() => {
    const known = new Set(
      realGroups.flatMap((group) => group.projects.map((p) => p.title.toLowerCase()))
    );
    const extra = remote.filter((p) => p.title && !known.has(p.title.toLowerCase()));
    if (extra.length === 0) return realGroups;
    return [
      ...realGroups,
      { id: "more", title: "More real-world projects", note: "", projects: extra },
    ];
  }, [remote]);

  return { groups, demoProjects };
}

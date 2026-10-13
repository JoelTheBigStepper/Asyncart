import { Check, Code, ExternalLink } from "lucide-react";

export default function ProjectDetail({ project }) {
  const { title, tagline, description, highlights, stack, image, demo, code } = project;
  const hasLinks = Boolean(demo || code);

  return (
    <article className="px-6 pb-10">
      {image && (
        <img
          src={image}
          alt={`${title} website preview`}
          className="mb-6 aspect-[4/3] w-full rounded-lg border border-line object-cover object-top"
        />
      )}

      <h2 id="drawer-title" className="font-display text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {tagline && <p className="mt-2 text-lg text-soft">{tagline}</p>}
      <p className="mt-6 leading-relaxed">{description}</p>

      {highlights?.length > 0 && (
        <>
          <h3 className="mt-8 font-display text-lg font-semibold">What it does</h3>
          <ul className="mt-3 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed">
                <Check className="mt-1 h-4 w-4 shrink-0 text-link" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {stack?.length > 0 && (
        <>
          <h3 className="mt-8 font-display text-lg font-semibold">Built with</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
                {tech}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-canvas transition-colors hover:bg-link"
          >
            Visit site <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
        {code && (
          <a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-semibold transition-colors hover:bg-panel2"
          >
            <Code className="h-4 w-4" aria-hidden="true" /> View code
          </a>
        )}
        {!hasLinks && <p className="text-sm text-soft">No public links for this one yet.</p>}
      </div>
    </article>
  );
}

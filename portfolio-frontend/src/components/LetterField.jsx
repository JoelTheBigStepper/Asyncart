// A fill-in-the-blank line for the contact letter. The lead text is the visible label.
export default function LetterField({
  id,
  lead,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
  autoComplete,
}) {
  const shared = {
    id,
    value,
    onChange: (event) => onChange(event.target.value),
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? `${id}-error` : undefined,
    autoComplete,
    className:
      "min-w-0 flex-1 border-b-2 border-ink bg-transparent pb-1 text-ink focus:border-link focus:outline-none",
  };

  return (
    <div>
      <div className={multiline ? "" : "flex flex-wrap items-baseline gap-x-3 gap-y-2"}>
        <label htmlFor={id} className="font-display text-2xl font-medium leading-snug sm:text-3xl">
          {lead}
        </label>
        {multiline ? (
          <textarea
            {...shared}
            rows={4}
            className={`${shared.className} mt-3 block w-full resize-y font-body text-xl leading-relaxed`}
          />
        ) : (
          <input
            {...shared}
            type={type}
            className={`${shared.className} basis-60 font-body text-xl`}
          />
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

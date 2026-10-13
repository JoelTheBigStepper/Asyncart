const inputClass =
  "w-full rounded-lg border border-ink bg-canvas p-3 text-ink focus:border-link focus:outline-none";

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ProjectForm({ formData, onChange, onImageChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="mb-14 space-y-5 rounded-2xl bg-panel p-6 md:p-8">
      <Field id="admin-title" label="Project title">
        <input id="admin-title" type="text" name="title" value={formData.title} onChange={onChange} className={inputClass} />
      </Field>

      <Field id="admin-description" label="Description">
        <textarea id="admin-description" name="description" value={formData.description} onChange={onChange} rows="4" className={inputClass} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="admin-code" label="Code URL">
          <input id="admin-code" type="url" name="code" value={formData.code} onChange={onChange} className={inputClass} />
        </Field>
        <Field id="admin-demo" label="Demo URL">
          <input id="admin-demo" type="url" name="demo" value={formData.demo} onChange={onChange} className={inputClass} />
        </Field>
      </div>

      <Field id="admin-image" label="Project image">
        <input id="admin-image" type="file" accept="image/*" onChange={onImageChange} className={inputClass} />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ink px-7 py-3 font-semibold text-canvas transition-colors hover:bg-link disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Add project"}
      </button>
    </form>
  );
}

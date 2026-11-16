import { SiteHeader } from "@/components/site-header";
import {
  createProject,
  deleteProject,
  listProjects,
  unlockAdmin,
  updateProject,
  type PortfolioProject,
} from "@/lib/projects";
import {
  deletePage,
  getContact,
  listPages,
  savePage,
  updateContact,
  type SiteContact,
  type SitePage,
} from "@/lib/site";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const [projects, contact, pages] = await Promise.all([listProjects(), getContact(), listPages()]);
    return { projects, contact, pages };
  },
  head: () => ({ meta: [{ title: "Admin | Mahmoud Nagib" }] }),
  component: AdminPage,
});

const empty = { title: "", summary: "", tools: "", tags: "", link: "" };

function AdminPage() {
  const data = Route.useLoaderData();
  const saved = data.projects;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [section, setSection] = useState<"projects" | "pages" | "contact">("projects");
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onUnlock(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await unlockAdmin({ data: password });
      setUnlocked(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Wrong password.");
    } finally {
      setPending(false);
    }
  }

  function fill(project: PortfolioProject) {
    setEditing(project.id);
    setForm({
      title: project.title,
      summary: project.summary,
      tools: project.tools,
      tags: project.tags,
      link: project.link,
    });
    setError("");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const payload = { ...form, password };
      if (editing) await updateProject({ data: { id: editing, ...payload } });
      else await createProject({ data: payload });
      setForm(empty);
      setEditing(null);
      await router.invalidate();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save that project.");
    } finally {
      setPending(false);
    }
  }

  async function onDelete(id: number) {
    setPending(true);
    setError("");
    try {
      await deleteProject({ data: { id, password } });
      if (editing === id) {
        setEditing(null);
        setForm(empty);
      }
      await router.invalidate();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not remove that project.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">Site admin</h1>
        <p className="mt-3 text-muted">
          Add projects and pages, or update the contact details visitors see.
        </p>

        {unlocked ? null : (
          <form onSubmit={onUnlock} className="panel mt-8 space-y-4 rounded-2xl p-6">
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Owner password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                placeholder="Password"
              />
            </label>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60"
            >
              Open admin
            </button>
          </form>
        )}

        {unlocked ? (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {(
                [
                  ["projects", "Projects"],
                  ["pages", "Pages"],
                  ["contact", "Contact"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSection(id);
                    setError("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm ${section === id ? "bg-teal text-white" : "border border-line text-ink"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {section === "projects" ? (
          <>
            <form onSubmit={onSubmit} className="panel mt-8 space-y-4 rounded-2xl p-6">
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                  placeholder="Sales dashboard for a cafe"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Tools</span>
                <input
                  value={form.tools}
                  onChange={(event) => setForm({ ...form, tools: event.target.value })}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                  placeholder="Excel • SQL • Power BI"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Description</span>
                <textarea
                  required
                  rows={4}
                  value={form.summary}
                  onChange={(event) => setForm({ ...form, summary: event.target.value })}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                  placeholder="What you analyzed and what you found."
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Tags, separated by commas</span>
                <input
                  value={form.tags}
                  onChange={(event) => setForm({ ...form, tags: event.target.value })}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                  placeholder="Cleaning, KPIs, Charts"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm text-muted">Link (optional)</span>
                <input
                  value={form.link}
                  onChange={(event) => setForm({ ...form, link: event.target.value })}
                  className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal"
                  placeholder="https://"
                />
              </label>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60"
                >
                  {editing ? "Save changes" : "Add project"}
                </button>
                {editing ? (
                  <button
                    type="button"
                    className="rounded-full border border-line px-6 py-3 text-ink"
                    onClick={() => {
                      setEditing(null);
                      setForm(empty);
                      setError("");
                    }}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>

            <ul className="mt-8 space-y-4">
              {saved.length === 0 ? (
                <li className="text-muted">No extra projects yet.</li>
              ) : (
                saved.map((project) => (
                  <li key={project.id} className="panel rounded-2xl p-5">
                    <h2 className="text-xl font-bold">{project.title}</h2>
                    {project.tools ? <p className="mt-1 text-sm text-muted">{project.tools}</p> : null}
                    <p className="mt-2 text-slate-300">{project.summary}</p>
                    <div className="mt-4 flex gap-3">
                      <button type="button" className="text-teal hover:underline" onClick={() => fill(project)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-danger hover:underline"
                        onClick={() => onDelete(project.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
            </>
            ) : null}
            {section === "pages" ? (
              <PagesEditor
                pages={data.pages}
                password={password}
                onSaved={async () => {
                  await router.invalidate();
                }}
              />
            ) : null}
            {section === "contact" ? (
              <ContactEditor
                contact={data.contact}
                password={password}
                onSaved={async () => {
                  await router.invalidate();
                }}
              />
            ) : null}
          </>
        ) : null}
      </main>
    </>
  );
}

function fieldClass() {
  return "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal";
}

function PagesEditor({
  pages,
  password,
  onSaved,
}: {
  pages: SitePage[];
  password: string;
  onSaved: () => Promise<void>;
}) {
  const empty = { title: "", slug: "", body: "" };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await savePage({ data: { id: editing ?? undefined, ...form, password } });
      setForm(empty);
      setEditing(null);
      await onSaved();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save that page.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="panel mt-8 space-y-4 rounded-2xl p-6">
        <p className="text-muted">
          A new page is added to the menu. The address is the short link, like notes or services.
        </p>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Title</span>
          <input
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Address</span>
          <input
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            className={fieldClass()}
            placeholder="my-page"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Page text</span>
          <textarea
            required
            rows={8}
            value={form.body}
            onChange={(event) => setForm({ ...form, body: event.target.value })}
            className={fieldClass()}
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60"
          >
            {editing ? "Save page" : "Add page"}
          </button>
          {editing ? (
            <button
              type="button"
              className="rounded-full border border-line px-6 py-3"
              onClick={() => {
                setEditing(null);
                setForm(empty);
              }}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
      <ul className="mt-8 space-y-4">
        {pages.length === 0 ? <li className="text-muted">No extra pages yet.</li> : null}
        {pages.map((page) => (
          <li key={page.id} className="panel rounded-2xl p-5">
            <h2 className="text-xl font-bold">{page.title}</h2>
            <p className="mt-1 text-sm text-muted">/{page.slug}</p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="text-teal hover:underline"
                onClick={() => {
                  setEditing(page.id);
                  setForm({ title: page.title, slug: page.slug, body: page.body });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-danger hover:underline"
                onClick={() => {
                  void deletePage({ data: { id: page.id, password } })
                    .then(onSaved)
                    .catch((cause: unknown) => {
                      setError(cause instanceof Error ? cause.message : "Could not remove that page.");
                    });
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function ContactEditor({
  contact,
  password,
  onSaved,
}: {
  contact: SiteContact;
  password: string;
  onSaved: () => Promise<void>;
}) {
  const [form, setForm] = useState(contact);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [savedNote, setSavedNote] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    setSavedNote(false);
    try {
      const next = await updateContact({ data: { ...form, password } });
      setForm(next);
      setSavedNote(true);
      await onSaved();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save contact details.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel mt-8 space-y-4 rounded-2xl p-6">
      <p className="text-muted">These details show in the header and the contact section.</p>
      {(
        [
          ["email", "Email"],
          ["phone", "Phone"],
          ["linkedin", "LinkedIn"],
          ["location", "Location"],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block">
          <span className="mb-1 block text-sm text-muted">{label}</span>
          <input
            required={key !== "linkedin"}
            value={form[key]}
            onChange={(event) => setForm({ ...form, [key]: event.target.value })}
            className={fieldClass()}
          />
        </label>
      ))}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {savedNote ? <p className="text-sm text-teal">Contact details saved.</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60"
      >
        Save contact
      </button>
    </form>
  );
}


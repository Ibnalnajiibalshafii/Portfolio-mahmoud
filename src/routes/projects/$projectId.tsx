import { SiteHeader } from "@/components/site-header";
import { getProject } from "@/lib/projects";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params }) => {
    const project = await getProject({ data: Number(params.projectId) });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} | Mahmoud Nagib` : "Project" }],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/" className="mt-4 inline-block text-teal hover:underline">
          Back home
        </Link>
      </main>
    </>
  ),
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const tags = project.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" hash="projects" className="text-sm text-teal hover:underline">
          All projects
        </Link>
        <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>
        {project.tools ? <p className="mt-3 text-muted">{project.tools}</p> : null}
        <p className="mt-6 text-lg leading-relaxed text-slate-300">{project.summary}</p>
        {tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-teal/20 px-3 py-1 text-xs text-teal">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper"
          >
            Open link
          </a>
        ) : null}
      </main>
    </>
  );
}

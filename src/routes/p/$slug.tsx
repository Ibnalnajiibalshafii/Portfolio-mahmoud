import { SiteHeader } from "@/components/site-header";
import { getPage } from "@/lib/site";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/p/$slug")({
  loader: async ({ params }) => {
    const page = await getPage({ data: params.slug });
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} | Mahmoud Nagib` : "Page" }],
  }),
  component: CustomPage,
  notFoundComponent: () => (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link to="/" className="mt-4 inline-block text-teal hover:underline">
          Back home
        </Link>
      </main>
    </>
  ),
});

function CustomPage() {
  const page = Route.useLoaderData();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="text-sm text-teal hover:underline">
          Home
        </Link>
        <h1 className="mt-4 text-4xl font-bold">{page.title}</h1>
        <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-slate-300">{page.body}</p>
      </main>
    </>
  );
}

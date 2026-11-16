import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

const OWNER_PASSWORD = "Swabra12_";

export type PortfolioProject = {
  id: number;
  title: string;
  summary: string;
  tools: string;
  tags: string;
  link: string;
};

type ProjectInput = {
  title: string;
  summary: string;
  tools: string;
  tags: string;
  link: string;
  password: string;
};

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function readProject(input: Partial<ProjectInput>): ProjectInput {
  const title = clean(input.title, 120);
  const summary = clean(input.summary, 800);
  const tools = clean(input.tools, 160);
  const tags = clean(input.tags, 200);
  const link = clean(input.link, 300);
  const password = String(input.password ?? "");
  if (!title) throw new Error("Add a project title.");
  if (!summary) throw new Error("Add a short description.");
  if (link && !/^https?:\/\/\S+$/i.test(link)) {
    throw new Error("Link must start with http:// or https://");
  }
  return { title, summary, tools, tags, link, password };
}

export function assertOwner(password: string) {
  if (password !== OWNER_PASSWORD) throw new Error("Wrong password.");
}

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<PortfolioProject>`
    select id, title, summary, tools, tags, link
    from projects
    order by id desc
  `;
});

export const getProject = createServerFn({ method: "GET" })
  .validator((id: number) => {
    const parsed = Number(id);
    if (!Number.isInteger(parsed) || parsed < 1) throw new Error("Unknown project.");
    return parsed;
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<PortfolioProject>`
      select id, title, summary, tools, tags, link
      from projects
      where id = ${data}
    `;
    return rows[0] ?? null;
  });

export const unlockAdmin = createServerFn({ method: "POST" })
  .validator((password: string) => String(password ?? ""))
  .handler(async ({ data }) => {
    assertOwner(data);
    return { ok: true as const };
  });

export const createProject = createServerFn({ method: "POST" })
  .validator((input: ProjectInput) => readProject(input))
  .handler(async ({ data }) => {
    assertOwner(data.password);
    const sql = await getSql();
    const rows = await sql<PortfolioProject>`
      insert into projects (title, summary, tools, tags, link)
      values (${data.title}, ${data.summary}, ${data.tools}, ${data.tags}, ${data.link})
      returning id, title, summary, tools, tags, link
    `;
    return rows[0];
  });

export const updateProject = createServerFn({ method: "POST" })
  .validator((input: ProjectInput & { id: number }) => {
    const id = Number(input.id);
    if (!Number.isInteger(id) || id < 1) throw new Error("Unknown project.");
    return { id, ...readProject(input) };
  })
  .handler(async ({ data }) => {
    assertOwner(data.password);
    const sql = await getSql();
    const rows = await sql<PortfolioProject>`
      update projects
      set title = ${data.title},
          summary = ${data.summary},
          tools = ${data.tools},
          tags = ${data.tags},
          link = ${data.link}
      where id = ${data.id}
      returning id, title, summary, tools, tags, link
    `;
    if (!rows[0]) throw new Error("That project is no longer there.");
    return rows[0];
  });

export const deleteProject = createServerFn({ method: "POST" })
  .validator((input: { id: number; password: string }) => {
    const parsed = Number(input?.id);
    if (!Number.isInteger(parsed) || parsed < 1) throw new Error("Unknown project.");
    return { id: parsed, password: String(input?.password ?? "") };
  })
  .handler(async ({ data }) => {
    assertOwner(data.password);
    const sql = await getSql();
    await sql`delete from projects where id = ${data.id}`;
    return { ok: true };
  });

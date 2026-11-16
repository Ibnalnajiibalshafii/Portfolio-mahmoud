import { assertOwner } from "@/lib/projects";
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

export type SiteContact = {
  email: string;
  phone: string;
  linkedin: string;
  location: string;
};

export type SitePage = {
  id: number;
  slug: string;
  title: string;
  body: string;
};

const fallbackContact: SiteContact = {
  email: "mahmuodnagib9@gmail.com",
  phone: "+254 745 791 267",
  linkedin: "https://www.linkedin.com/in/mahmoudnagib001",
  location: "Nairobi, Kenya",
};

const reserved = new Set(["admin", "api", "work", "login", "p", "projects"]);

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function readSlug(value: unknown): string {
  const slug = clean(value, 60)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!slug) throw new Error("Add a page address, like services-extra.");
  if (reserved.has(slug)) throw new Error("That page address is reserved.");
  return slug;
}

export const getContact = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<SiteContact>`
    select email, phone, linkedin, location from site_contact where id = 1
  `;
  return rows[0] ?? fallbackContact;
});

export const updateContact = createServerFn({ method: "POST" })
  .validator((input: SiteContact & { password: string }) => ({
    email: clean(input.email, 160),
    phone: clean(input.phone, 40),
    linkedin: clean(input.linkedin, 200),
    location: clean(input.location, 80),
    password: String(input.password ?? ""),
  }))
  .handler(async ({ data }) => {
    assertOwner(data.password);
    if (!data.email.includes("@")) throw new Error("Enter a valid email.");
    if (!data.phone) throw new Error("Enter a phone number.");
    if (!data.location) throw new Error("Enter a location.");
    let linkedin = data.linkedin;
    if (linkedin && !/^https?:\/\//i.test(linkedin)) linkedin = `https://${linkedin}`;
    const sql = await getSql();
    const rows = await sql<SiteContact>`
      insert into site_contact (id, email, phone, linkedin, location)
      values (1, ${data.email}, ${data.phone}, ${linkedin}, ${data.location})
      on conflict (id) do update
      set email = excluded.email,
          phone = excluded.phone,
          linkedin = excluded.linkedin,
          location = excluded.location
      returning email, phone, linkedin, location
    `;
    return rows[0] ?? fallbackContact;
  });

export const listPages = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<SitePage>`select id, slug, title, body from site_pages order by id desc`;
});

export const getPage = createServerFn({ method: "GET" })
  .validator((slug: string) => readSlug(slug))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<SitePage>`
      select id, slug, title, body from site_pages where slug = ${data}
    `;
    return rows[0] ?? null;
  });

type PageInput = { id?: number; title: string; slug: string; body: string; password: string };

function readPage(input: Partial<PageInput>) {
  const title = clean(input.title, 120);
  const body = clean(input.body, 8000);
  const slug = readSlug(input.slug || title);
  if (!title) throw new Error("Add a page title.");
  if (!body) throw new Error("Write the page text.");
  return { title, slug, body, password: String(input.password ?? "") };
}

export const savePage = createServerFn({ method: "POST" })
  .validator((input: PageInput) => {
    const page = readPage(input);
    const id = input.id == null || input.id === 0 ? null : Number(input.id);
    if (id != null && (!Number.isInteger(id) || id < 1)) throw new Error("Unknown page.");
    return { ...page, id };
  })
  .handler(async ({ data }) => {
    assertOwner(data.password);
    const sql = await getSql();
    const clash = await sql<{ id: number }>`select id from site_pages where slug = ${data.slug}`;
    if (clash[0] && clash[0].id !== data.id) throw new Error("That page address is already used.");
    if (data.id) {
      const rows = await sql<SitePage>`
        update site_pages
        set title = ${data.title}, slug = ${data.slug}, body = ${data.body}
        where id = ${data.id}
        returning id, slug, title, body
      `;
      if (!rows[0]) throw new Error("That page is no longer there.");
      return rows[0];
    }
    const rows = await sql<SitePage>`
      insert into site_pages (slug, title, body)
      values (${data.slug}, ${data.title}, ${data.body})
      returning id, slug, title, body
    `;
    return rows[0];
  });

export const deletePage = createServerFn({ method: "POST" })
  .validator((input: { id: number; password: string }) => ({
    id: Number(input.id),
    password: String(input.password ?? ""),
  }))
  .handler(async ({ data }) => {
    assertOwner(data.password);
    if (!Number.isInteger(data.id) || data.id < 1) throw new Error("Unknown page.");
    const sql = await getSql();
    await sql`delete from site_pages where id = ${data.id}`;
    return { ok: true as const };
  });

import { n as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CUSAjtMI.mjs";
import { t as assertOwner } from "./projects-CgIS0XqX.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-SR-dokpV.js
var fallbackContact = {
	email: "mahmuodnagib9@gmail.com",
	phone: "+254 745 791 267",
	linkedin: "https://www.linkedin.com/in/mahmoudnagib001",
	location: "Nairobi, Kenya"
};
var reserved = /* @__PURE__ */ new Set([
	"admin",
	"api",
	"work",
	"login",
	"p",
	"projects"
]);
function clean(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
function readSlug(value) {
	const slug = clean(value, 60).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
	if (!slug) throw new Error("Add a page address, like services-extra.");
	if (reserved.has(slug)) throw new Error("That page address is reserved.");
	return slug;
}
var getContact_createServerFn_handler = createServerRpc({
	id: "05227a15742113eeebd4ee7e297dc3eebb684a9b08ca1352c615f61cd8ff7b04",
	name: "getContact",
	filename: "src/lib/site.ts"
}, (opts) => getContact.__executeServer(opts));
var getContact = createServerFn({ method: "GET" }).handler(getContact_createServerFn_handler, async () => {
	return (await (await getSql())`
    select email, phone, linkedin, location from site_contact where id = 1
  `)[0] ?? fallbackContact;
});
var updateContact_createServerFn_handler = createServerRpc({
	id: "d5543ab6ab66b1c792dfa21af4caf169839ae0d708d3f08e2e8a59d41079083c",
	name: "updateContact",
	filename: "src/lib/site.ts"
}, (opts) => updateContact.__executeServer(opts));
var updateContact = createServerFn({ method: "POST" }).validator((input) => ({
	email: clean(input.email, 160),
	phone: clean(input.phone, 40),
	linkedin: clean(input.linkedin, 200),
	location: clean(input.location, 80),
	password: String(input.password ?? "")
})).handler(updateContact_createServerFn_handler, async ({ data }) => {
	assertOwner(data.password);
	if (!data.email.includes("@")) throw new Error("Enter a valid email.");
	if (!data.phone) throw new Error("Enter a phone number.");
	if (!data.location) throw new Error("Enter a location.");
	let linkedin = data.linkedin;
	if (linkedin && !/^https?:\/\//i.test(linkedin)) linkedin = `https://${linkedin}`;
	return (await (await getSql())`
      insert into site_contact (id, email, phone, linkedin, location)
      values (1, ${data.email}, ${data.phone}, ${linkedin}, ${data.location})
      on conflict (id) do update
      set email = excluded.email,
          phone = excluded.phone,
          linkedin = excluded.linkedin,
          location = excluded.location
      returning email, phone, linkedin, location
    `)[0] ?? fallbackContact;
});
var listPages_createServerFn_handler = createServerRpc({
	id: "9cbfe932944e37b0692cde3ad424a759068c06ecb8b8966f43f8fb4ca654ea4c",
	name: "listPages",
	filename: "src/lib/site.ts"
}, (opts) => listPages.__executeServer(opts));
var listPages = createServerFn({ method: "GET" }).handler(listPages_createServerFn_handler, async () => {
	return (await getSql())`select id, slug, title, body from site_pages order by id desc`;
});
var getPage_createServerFn_handler = createServerRpc({
	id: "c885eed991fbd1f67948582cee981ae2587c59208eae6e80acec565666e57a6c",
	name: "getPage",
	filename: "src/lib/site.ts"
}, (opts) => getPage.__executeServer(opts));
var getPage = createServerFn({ method: "GET" }).validator((slug) => readSlug(slug)).handler(getPage_createServerFn_handler, async ({ data }) => {
	return (await (await getSql())`
      select id, slug, title, body from site_pages where slug = ${data}
    `)[0] ?? null;
});
function readPage(input) {
	const title = clean(input.title, 120);
	const body = clean(input.body, 8e3);
	const slug = readSlug(input.slug || title);
	if (!title) throw new Error("Add a page title.");
	if (!body) throw new Error("Write the page text.");
	return {
		title,
		slug,
		body,
		password: String(input.password ?? "")
	};
}
var savePage_createServerFn_handler = createServerRpc({
	id: "371178daf4db2c58018d816a08785d2b5fb4e6ce9b5573d382e4b05dd9c05014",
	name: "savePage",
	filename: "src/lib/site.ts"
}, (opts) => savePage.__executeServer(opts));
var savePage = createServerFn({ method: "POST" }).validator((input) => {
	const page = readPage(input);
	const id = input.id == null || input.id === 0 ? null : Number(input.id);
	if (id != null && (!Number.isInteger(id) || id < 1)) throw new Error("Unknown page.");
	return {
		...page,
		id
	};
}).handler(savePage_createServerFn_handler, async ({ data }) => {
	assertOwner(data.password);
	const sql = await getSql();
	const clash = await sql`select id from site_pages where slug = ${data.slug}`;
	if (clash[0] && clash[0].id !== data.id) throw new Error("That page address is already used.");
	if (data.id) {
		const rows = await sql`
        update site_pages
        set title = ${data.title}, slug = ${data.slug}, body = ${data.body}
        where id = ${data.id}
        returning id, slug, title, body
      `;
		if (!rows[0]) throw new Error("That page is no longer there.");
		return rows[0];
	}
	return (await sql`
      insert into site_pages (slug, title, body)
      values (${data.slug}, ${data.title}, ${data.body})
      returning id, slug, title, body
    `)[0];
});
var deletePage_createServerFn_handler = createServerRpc({
	id: "06ff4630317c492c8f93960414b719df66e82234df77963ffa4427cfe4e5e4e6",
	name: "deletePage",
	filename: "src/lib/site.ts"
}, (opts) => deletePage.__executeServer(opts));
var deletePage = createServerFn({ method: "POST" }).validator((input) => ({
	id: Number(input.id),
	password: String(input.password ?? "")
})).handler(deletePage_createServerFn_handler, async ({ data }) => {
	assertOwner(data.password);
	if (!Number.isInteger(data.id) || data.id < 1) throw new Error("Unknown page.");
	await (await getSql())`delete from site_pages where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { deletePage_createServerFn_handler, getContact_createServerFn_handler, getPage_createServerFn_handler, listPages_createServerFn_handler, savePage_createServerFn_handler, updateContact_createServerFn_handler };

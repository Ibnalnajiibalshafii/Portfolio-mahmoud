import { n as createServerFn } from "./ssr.mjs";
import { r as createSsrRpc } from "./projects-CgIS0XqX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-CYjer33e.js
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
var getContact = createServerFn({ method: "GET" }).handler(createSsrRpc("05227a15742113eeebd4ee7e297dc3eebb684a9b08ca1352c615f61cd8ff7b04"));
var updateContact = createServerFn({ method: "POST" }).validator((input) => ({
	email: clean(input.email, 160),
	phone: clean(input.phone, 40),
	linkedin: clean(input.linkedin, 200),
	location: clean(input.location, 80),
	password: String(input.password ?? "")
})).handler(createSsrRpc("d5543ab6ab66b1c792dfa21af4caf169839ae0d708d3f08e2e8a59d41079083c"));
var listPages = createServerFn({ method: "GET" }).handler(createSsrRpc("9cbfe932944e37b0692cde3ad424a759068c06ecb8b8966f43f8fb4ca654ea4c"));
var getPage = createServerFn({ method: "GET" }).validator((slug) => readSlug(slug)).handler(createSsrRpc("c885eed991fbd1f67948582cee981ae2587c59208eae6e80acec565666e57a6c"));
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
var savePage = createServerFn({ method: "POST" }).validator((input) => {
	const page = readPage(input);
	const id = input.id == null || input.id === 0 ? null : Number(input.id);
	if (id != null && (!Number.isInteger(id) || id < 1)) throw new Error("Unknown page.");
	return {
		...page,
		id
	};
}).handler(createSsrRpc("371178daf4db2c58018d816a08785d2b5fb4e6ce9b5573d382e4b05dd9c05014"));
var deletePage = createServerFn({ method: "POST" }).validator((input) => ({
	id: Number(input.id),
	password: String(input.password ?? "")
})).handler(createSsrRpc("06ff4630317c492c8f93960414b719df66e82234df77963ffa4427cfe4e5e4e6"));
//#endregion
export { savePage as a, listPages as i, getContact as n, updateContact as o, getPage as r, deletePage as t };

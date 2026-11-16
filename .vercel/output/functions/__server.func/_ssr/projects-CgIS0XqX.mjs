import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CgIS0XqX.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var OWNER_PASSWORD = "Swabra12_";
function clean(value, max) {
	return String(value ?? "").trim().slice(0, max);
}
function readProject(input) {
	const title = clean(input.title, 120);
	const summary = clean(input.summary, 800);
	const tools = clean(input.tools, 160);
	const tags = clean(input.tags, 200);
	const link = clean(input.link, 300);
	const password = String(input.password ?? "");
	if (!title) throw new Error("Add a project title.");
	if (!summary) throw new Error("Add a short description.");
	if (link && !/^https?:\/\/\S+$/i.test(link)) throw new Error("Link must start with http:// or https://");
	return {
		title,
		summary,
		tools,
		tags,
		link,
		password
	};
}
function assertOwner(password) {
	if (password !== OWNER_PASSWORD) throw new Error("Wrong password.");
}
var listProjects = createServerFn({ method: "GET" }).handler(createSsrRpc("7a36febddc9c6499f718dd1f453e12d6ddb7cb35acf28a1f093f8c07a3d87f15"));
var getProject = createServerFn({ method: "GET" }).validator((id) => {
	const parsed = Number(id);
	if (!Number.isInteger(parsed) || parsed < 1) throw new Error("Unknown project.");
	return parsed;
}).handler(createSsrRpc("ba33d18021e14ba744ba54115823a27d329833aada496be5b94b37b0893f8f63"));
var unlockAdmin = createServerFn({ method: "POST" }).validator((password) => String(password ?? "")).handler(createSsrRpc("0292ed52df1b9f98c8887892dbcbaedc792a1fe75fdfcd7d1c0563f9df8f5ec3"));
var createProject = createServerFn({ method: "POST" }).validator((input) => readProject(input)).handler(createSsrRpc("a6d5feb012adb5e1b78c5e5a1f48ac73acebfc31889e747de658667c78699547"));
var updateProject = createServerFn({ method: "POST" }).validator((input) => {
	const id = Number(input.id);
	if (!Number.isInteger(id) || id < 1) throw new Error("Unknown project.");
	return {
		id,
		...readProject(input)
	};
}).handler(createSsrRpc("6ae565c05b0d7e05a10ebb3ae962b787cb8b045cffd5d9dc618f0911f361e385"));
var deleteProject = createServerFn({ method: "POST" }).validator((input) => {
	const parsed = Number(input?.id);
	if (!Number.isInteger(parsed) || parsed < 1) throw new Error("Unknown project.");
	return {
		id: parsed,
		password: String(input?.password ?? "")
	};
}).handler(createSsrRpc("e5259a3f97b222e9c12cfe9f11677c1f931633be180e1058bfaeac07ecdc81e5"));
//#endregion
export { getProject as a, updateProject as c, deleteProject as i, createProject as n, listProjects as o, createSsrRpc as r, unlockAdmin as s, assertOwner as t };

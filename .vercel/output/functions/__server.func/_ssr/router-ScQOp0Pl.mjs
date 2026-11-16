import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ScQOp0Pl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	if (typeof error === "object" && error !== null && "message" in error) {
		const message = error.message;
		if (typeof message === "string" && message) return message;
	}
	return "Something went wrong.";
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
			className: "size-8 text-danger",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-lg text-center text-muted",
			children: errorMessage(error)
		})]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-C-L8hiy9.css";
var APP_NAME = "Mahmoud Nagib";
var FONT = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,560;0,9..144,640;1,9..144,560&family=Outfit:wght@400;500;600&display=swap";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Mahmoud Nagib, junior data analyst in Nairobi. Excel and Python dashboards for sales, bank branches, and student scores."
			},
			{
				name: "theme-color",
				content: "#0e6b54"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: FONT
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-BZRV5eTJ.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Mahmoud Nagib · Data analyst" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var employees = [
	{
		id: "EMP001",
		name: "Amina Otieno",
		branch: "Nairobi Central",
		position: "Branch Manager",
		hireDate: "2024-02-01",
		salary: 164e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP002",
		name: "Brian Mwangi",
		branch: "Nairobi Central",
		position: "Operations Officer",
		hireDate: "2024-05-08",
		salary: 112e3,
		type: "Permanent",
		status: "On Leave"
	},
	{
		id: "EMP003",
		name: "Carol Wanjiku",
		branch: "Nairobi Central",
		position: "Relationship Manager",
		hireDate: "2020-03-24",
		salary: 114e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP004",
		name: "David Kiptoo",
		branch: "Nairobi Central",
		position: "Credit Analyst",
		hireDate: "2019-11-24",
		salary: 115e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP005",
		name: "Esther Njeri",
		branch: "Nairobi Central",
		position: "Customer Service Officer",
		hireDate: "2023-02-19",
		salary: 69e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP006",
		name: "Felix Ouma",
		branch: "Nairobi Central",
		position: "Teller",
		hireDate: "2022-01-01",
		salary: 41e3,
		type: "Contract",
		status: "On Leave"
	},
	{
		id: "EMP007",
		name: "Grace Achieng",
		branch: "Nairobi Central",
		position: "Sales Officer",
		hireDate: "2019-04-08",
		salary: 55e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP008",
		name: "Hassan Ali",
		branch: "Nairobi Central",
		position: "Loan Officer",
		hireDate: "2023-10-01",
		salary: 85e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP009",
		name: "Irene Chebet",
		branch: "Nairobi Central",
		position: "Accountant",
		hireDate: "2023-04-23",
		salary: 102e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP010",
		name: "James Kariuki",
		branch: "Nairobi Central",
		position: "Digital Banking Officer",
		hireDate: "2024-12-18",
		salary: 97e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP011",
		name: "Kevin Mutua",
		branch: "Mombasa",
		position: "Branch Manager",
		hireDate: "2022-04-15",
		salary: 197e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP012",
		name: "Lydia Muthoni",
		branch: "Mombasa",
		position: "Operations Officer",
		hireDate: "2023-05-26",
		salary: 123e3,
		type: "Contract",
		status: "On Leave"
	},
	{
		id: "EMP013",
		name: "Martin Barasa",
		branch: "Mombasa",
		position: "Relationship Manager",
		hireDate: "2019-03-23",
		salary: 91e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP014",
		name: "Nancy Atieno",
		branch: "Mombasa",
		position: "Credit Analyst",
		hireDate: "2022-06-09",
		salary: 99e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP015",
		name: "Oscar Maina",
		branch: "Mombasa",
		position: "Customer Service Officer",
		hireDate: "2020-04-25",
		salary: 55e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP016",
		name: "Patricia Wairimu",
		branch: "Mombasa",
		position: "Teller",
		hireDate: "2021-02-03",
		salary: 53e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP017",
		name: "Quincy Omondi",
		branch: "Mombasa",
		position: "Sales Officer",
		hireDate: "2022-02-12",
		salary: 54e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP018",
		name: "Ruth Jepkosgei",
		branch: "Mombasa",
		position: "Loan Officer",
		hireDate: "2021-10-09",
		salary: 63e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP019",
		name: "Samuel Karanja",
		branch: "Mombasa",
		position: "Accountant",
		hireDate: "2019-12-15",
		salary: 104e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP020",
		name: "Teresia Wambui",
		branch: "Mombasa",
		position: "Digital Banking Officer",
		hireDate: "2023-02-13",
		salary: 9e4,
		type: "Contract",
		status: "On Leave"
	},
	{
		id: "EMP021",
		name: "Victor Were",
		branch: "Kisumu",
		position: "Branch Manager",
		hireDate: "2019-09-10",
		salary: 216e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP022",
		name: "Winnie Adhiambo",
		branch: "Kisumu",
		position: "Operations Officer",
		hireDate: "2024-10-28",
		salary: 1e5,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP023",
		name: "Xavier Kamau",
		branch: "Kisumu",
		position: "Relationship Manager",
		hireDate: "2021-10-07",
		salary: 111e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP024",
		name: "Yvonne Nyambura",
		branch: "Kisumu",
		position: "Credit Analyst",
		hireDate: "2024-02-02",
		salary: 117e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP025",
		name: "Zachary Kiprotich",
		branch: "Kisumu",
		position: "Customer Service Officer",
		hireDate: "2024-04-25",
		salary: 5e4,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP026",
		name: "Alice Muli",
		branch: "Kisumu",
		position: "Teller",
		hireDate: "2021-02-28",
		salary: 4e4,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP027",
		name: "Benard Otieno",
		branch: "Kisumu",
		position: "Sales Officer",
		hireDate: "2020-02-13",
		salary: 52e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP028",
		name: "Cynthia Wekesa",
		branch: "Kisumu",
		position: "Loan Officer",
		hireDate: "2021-08-21",
		salary: 76e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP029",
		name: "Dennis Kibet",
		branch: "Kisumu",
		position: "Accountant",
		hireDate: "2021-03-12",
		salary: 104e3,
		type: "Permanent",
		status: "On Leave"
	},
	{
		id: "EMP030",
		name: "Eunice Mumbi",
		branch: "Kisumu",
		position: "Digital Banking Officer",
		hireDate: "2021-04-22",
		salary: 8e4,
		type: "Contract",
		status: "On Leave"
	},
	{
		id: "EMP031",
		name: "Francis Juma",
		branch: "Nakuru",
		position: "Branch Manager",
		hireDate: "2021-12-22",
		salary: 174e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP032",
		name: "Gladys Akinyi",
		branch: "Nakuru",
		position: "Operations Officer",
		hireDate: "2024-02-20",
		salary: 112e3,
		type: "Contract",
		status: "On Leave"
	},
	{
		id: "EMP033",
		name: "Henry Kimani",
		branch: "Nakuru",
		position: "Relationship Manager",
		hireDate: "2024-03-18",
		salary: 116e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP034",
		name: "Isabel Chepkirui",
		branch: "Nakuru",
		position: "Credit Analyst",
		hireDate: "2024-04-06",
		salary: 86e3,
		type: "Permanent",
		status: "On Leave"
	},
	{
		id: "EMP035",
		name: "Joseph Ndegwa",
		branch: "Nakuru",
		position: "Customer Service Officer",
		hireDate: "2022-07-09",
		salary: 71e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP036",
		name: "Kelly Anyango",
		branch: "Nakuru",
		position: "Teller",
		hireDate: "2024-12-18",
		salary: 45e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP037",
		name: "Leonard Muriuki",
		branch: "Nakuru",
		position: "Sales Officer",
		hireDate: "2020-11-11",
		salary: 67e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP038",
		name: "Mercy Wafula",
		branch: "Nakuru",
		position: "Loan Officer",
		hireDate: "2019-04-27",
		salary: 68e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP039",
		name: "Noah Kiprono",
		branch: "Nakuru",
		position: "Accountant",
		hireDate: "2019-06-13",
		salary: 99e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP040",
		name: "Olive Wanjiru",
		branch: "Nakuru",
		position: "Digital Banking Officer",
		hireDate: "2021-02-07",
		salary: 93e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP041",
		name: "Peter Odhiambo",
		branch: "Nyeri",
		position: "Branch Manager",
		hireDate: "2023-12-11",
		salary: 219e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP042",
		name: "Queen Wambui",
		branch: "Nyeri",
		position: "Operations Officer",
		hireDate: "2020-11-16",
		salary: 1e5,
		type: "Permanent",
		status: "On Leave"
	},
	{
		id: "EMP043",
		name: "Robert Kiplagat",
		branch: "Nyeri",
		position: "Relationship Manager",
		hireDate: "2022-11-15",
		salary: 121e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP044",
		name: "Sheila Auma",
		branch: "Nyeri",
		position: "Credit Analyst",
		hireDate: "2020-05-05",
		salary: 105e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP045",
		name: "Tom Mbugua",
		branch: "Nyeri",
		position: "Customer Service Officer",
		hireDate: "2020-12-18",
		salary: 6e4,
		type: "Permanent",
		status: "On Leave"
	},
	{
		id: "EMP046",
		name: "Ursula Chebet",
		branch: "Nyeri",
		position: "Teller",
		hireDate: "2023-05-24",
		salary: 46e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP047",
		name: "Vincent Ochieng",
		branch: "Nyeri",
		position: "Sales Officer",
		hireDate: "2023-07-19",
		salary: 63e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP048",
		name: "Wendy Naliaka",
		branch: "Nyeri",
		position: "Loan Officer",
		hireDate: "2022-06-08",
		salary: 61e3,
		type: "Contract",
		status: "Active"
	},
	{
		id: "EMP049",
		name: "Yusuf Abdalla",
		branch: "Nyeri",
		position: "Accountant",
		hireDate: "2020-09-16",
		salary: 73e3,
		type: "Permanent",
		status: "Active"
	},
	{
		id: "EMP050",
		name: "Zena Muthoni",
		branch: "Nyeri",
		position: "Digital Banking Officer",
		hireDate: "2019-01-28",
		salary: 68e3,
		type: "Permanent",
		status: "On Leave"
	}
];
var branchPerf = [
	{
		branch: "Nairobi Central",
		sales: 185e5,
		profit: 425e4,
		target: 175e5,
		payrollBudget: 82e4,
		csat: 948
	},
	{
		branch: "Mombasa",
		sales: 148e5,
		profit: 312e4,
		target: 15e6,
		payrollBudget: 74e4,
		csat: 955
	},
	{
		branch: "Nakuru",
		sales: 139e5,
		profit: 245e4,
		target: 145e5,
		payrollBudget: 71e4,
		csat: 834
	},
	{
		branch: "Kisumu",
		sales: 126e5,
		profit: 286e4,
		target: 12e6,
		payrollBudget: 68e4,
		csat: 860
	},
	{
		branch: "Nyeri",
		sales: 109e5,
		profit: 251e4,
		target: 105e5,
		payrollBudget: 62e4,
		csat: 950
	}
];
var $$splitComponentImporter$2 = () => import("./bank-AxSj3IsX.mjs");
var Route$2 = createFileRoute("/work/bank")({
	head: () => ({ meta: [{ title: "Bank branches · Mahmoud Nagib" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var hireYears = [
	"2019",
	"2020",
	"2021",
	"2022",
	"2023",
	"2024"
];
function maxBy(rows, pick) {
	return rows.reduce((best, row) => pick(row) > pick(best) ? row : best);
}
var peakYear = maxBy(hireYears.map((year) => ({
	year,
	hires: employees.filter((employee) => employee.hireDate.startsWith(year)).length
})), (row) => row.hires);
var peakHires = employees.filter((employee) => employee.hireDate.startsWith(peakYear.year));
var peakBranchCounts = /* @__PURE__ */ new Map();
for (const employee of peakHires) peakBranchCounts.set(employee.branch, (peakBranchCounts.get(employee.branch) ?? 0) + 1);
var peakHireCount = 0;
for (const [branch, count] of peakBranchCounts) if (count > peakHireCount) peakHireCount = count;
var $$splitComponentImporter$1 = () => import("./students-DqKKAiV2.mjs");
var Route$1 = createFileRoute("/work/students")({
	head: () => ({ meta: [{ title: "Student scores · Mahmoud Nagib" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./supermarket-BT_ToewY.mjs");
var Route = createFileRoute("/work/supermarket")({
	head: () => ({ meta: [{ title: "Supermarket sales · Mahmoud Nagib" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	WorkBankRoute: Route$2.update({
		id: "/work/bank",
		path: "/work/bank",
		getParentRoute: () => Route$4
	}),
	WorkStudentsRoute: Route$1.update({
		id: "/work/students",
		path: "/work/students",
		getParentRoute: () => Route$4
	}),
	WorkSupermarketRoute: Route.update({
		id: "/work/supermarket",
		path: "/work/supermarket",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { branchPerf as n, employees as r, router_exports as t };

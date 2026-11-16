import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Menu, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-QvN00WLU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/",
		label: "Portfolio"
	},
	{
		to: "/work/supermarket",
		label: "Supermarket"
	},
	{
		to: "/work/bank",
		label: "Branches"
	},
	{
		to: "/work/students",
		label: "Students"
	}
];
function normalize(pathname) {
	if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
	return pathname;
}
function SiteHeader() {
	const current = normalize(useRouterState({ select: (state) => state.location.pathname }));
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [current]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-3 px-5 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-display text-lg text-ink",
					children: "Mahmoud Nagib"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 md:ml-auto md:flex",
					children: links.map((link) => {
						const active = current === link.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							"aria-current": active ? "page" : void 0,
							className: `inline-flex min-h-11 items-center ${active ? "text-ink" : "text-muted"}`,
							children: link.label
						}, link.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:mahmuodnagib9@gmail.com",
					className: "ml-auto inline-flex min-h-11 items-center rounded-full bg-teal px-4 text-sm text-paper md:ml-0",
					children: "Email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex min-h-11 min-w-11 items-center justify-center text-ink md:hidden",
					"aria-expanded": open,
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((value) => !value),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
						"aria-hidden": "true",
						className: "size-5"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
						"aria-hidden": "true",
						className: "size-5"
					})
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex flex-col border-t border-line px-5 py-2 md:hidden",
			children: links.map((link) => {
				const active = current === link.to;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					"aria-current": active ? "page" : void 0,
					className: `inline-flex min-h-11 items-center ${active ? "text-ink" : "text-muted"}`,
					onClick: () => setOpen(false),
					children: link.label
				}, link.to);
			})
		}) : null]
	});
}
//#endregion
export { SiteHeader as t };

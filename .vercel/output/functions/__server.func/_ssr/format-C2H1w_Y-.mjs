import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-C2H1w_Y-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AfterMount({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 w-full rounded-card bg-paper-2" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full",
		children
	});
}
function Kpi({ label, value, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-card border border-line bg-card px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl tabular-nums text-ink",
				children: value
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: note
			}) : null
		]
	});
}
function kes(n, digits = 0) {
	return `${n < 0 ? "−" : ""}KES ${Math.abs(n).toLocaleString("en-KE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	})}`;
}
function pct(n, digits = 1) {
	return `${n.toFixed(digits)}%`;
}
function num(n, digits = 1) {
	return n.toLocaleString("en-KE", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
//#endregion
export { pct as a, num as i, Kpi as n, kes as r, AfterMount as t };

import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteHeader } from "./site-header-QvN00WLU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZRV5eTJ.js
var import_jsx_runtime = require_jsx_runtime();
var work = [
	{
		to: "/work/supermarket",
		kicker: "01",
		title: "Supermarket sales",
		meta: "Python · pandas · seaborn",
		copy: "Eldoret led five branches. Household was the largest category.",
		figure: "KES 190,122"
	},
	{
		to: "/work/bank",
		kicker: "02",
		title: "Bank branches",
		meta: "Excel",
		copy: "Nakuru missed its sales target and carries the heaviest payroll relative to profit.",
		figure: "−KES 600,000"
	},
	{
		to: "/work/students",
		kicker: "03",
		title: "Student scores",
		meta: "Cleaning · grades",
		copy: "Eighty records, four subjects, and a gender field that contradicts itself.",
		figure: "80 students"
	}
];
var services = [
	{
		n: "01",
		title: "Clean the file",
		copy: "Missing values, types, and fields you should not trust."
	},
	{
		n: "02",
		title: "Compare the groups",
		copy: "Branches, categories, forms, targets."
	},
	{
		n: "03",
		title: "Write the action",
		copy: "One recommendation, the figures behind it, and what is still missing."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 pb-24 pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-teal",
				children: "Nairobi · Junior data analyst"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-5xl leading-none text-ink sm:text-7xl",
				children: ["I turn a spreadsheet ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-teal",
					children: "into a decision."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-xl text-muted",
				children: "Freelance analysis in Excel and Python. The dashboards below are graded assignments and an exam — the workings stay visible, not just the chart."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#work",
					className: "inline-flex min-h-11 items-center rounded-full bg-teal px-6 text-paper",
					children: "See the work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:mahmuodnagib9@gmail.com",
					className: "inline-flex min-h-11 items-center rounded-full border border-line px-6 text-ink",
					children: "Email Mahmoud"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: "tel:+254745791267",
						children: "+254 745 791 267"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: "https://www.linkedin.com/in/mahmoudnagib001",
						target: "_blank",
						rel: "noreferrer",
						children: "LinkedIn"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: "mailto:mahmuodnagib9@gmail.com",
						children: "mahmuodnagib9@gmail.com"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "work",
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-ink",
					children: "Selected work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: work.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "grid gap-3 border-t border-line py-6 hover:bg-card sm:grid-cols-[8rem_1fr_auto] sm:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-muted",
								children: item.kicker
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-ink",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-teal",
									children: item.meta
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-muted",
									children: item.copy
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl tabular-nums text-ink",
								children: item.figure
							})
						]
					}, item.to))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "services",
				className: "mt-8 border-t border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display text-3xl text-ink",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-8 sm:grid-cols-3",
					children: services.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl text-ink",
							children: item.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl text-ink",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: item.copy
						})
					] }, item.n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-12 max-w-2xl text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mahmoud Nagib is a junior data analyst in Nairobi. These projects are assignment and exam work. He is taking freelance jobs at that same standard." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "contact",
				className: "mt-12 rounded-card bg-teal-deep px-6 py-8 text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl",
						children: "Start with the file."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-paper/80",
						children: "Send the spreadsheet. You get a cleaned view, the comparison, and a written recommendation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-paper underline",
								href: "mailto:mahmuodnagib9@gmail.com",
								children: "mahmuodnagib9@gmail.com"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-paper underline",
								href: "tel:+254745791267",
								children: "+254 745 791 267"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "text-paper underline",
								href: "https://www.linkedin.com/in/mahmoudnagib001",
								target: "_blank",
								rel: "noreferrer",
								children: "LinkedIn"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-10 text-sm text-muted",
				children: "© 2026 Mahmoud Nagib · Nairobi"
			})
		]
	})] });
}
//#endregion
export { Home as component };

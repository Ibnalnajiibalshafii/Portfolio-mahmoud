import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as updateProject, i as deleteProject, n as createProject, s as unlockAdmin } from "./projects-CgIS0XqX.mjs";
import { a as savePage, o as updateContact, t as deletePage } from "./site-CYjer33e.mjs";
import { u as Route$7 } from "./router-BA_YWymM.mjs";
import { t as SiteHeader } from "./site-header-CZ728cjU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DFESYt3_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	title: "",
	summary: "",
	tools: "",
	tags: "",
	link: ""
};
function AdminPage() {
	const data = Route$7.useLoaderData();
	const saved = data.projects;
	const router = useRouter();
	const [password, setPassword] = (0, import_react.useState)("");
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [section, setSection] = (0, import_react.useState)("projects");
	const [form, setForm] = (0, import_react.useState)(empty);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onUnlock(event) {
		event.preventDefault();
		setPending(true);
		setError("");
		try {
			await unlockAdmin({ data: password });
			setUnlocked(true);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Wrong password.");
		} finally {
			setPending(false);
		}
	}
	function fill(project) {
		setEditing(project.id);
		setForm({
			title: project.title,
			summary: project.summary,
			tools: project.tools,
			tags: project.tags,
			link: project.link
		});
		setError("");
	}
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError("");
		try {
			const payload = {
				...form,
				password
			};
			if (editing) await updateProject({ data: {
				id: editing,
				...payload
			} });
			else await createProject({ data: payload });
			setForm(empty);
			setEditing(null);
			await router.invalidate();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not save that project.");
		} finally {
			setPending(false);
		}
	}
	async function onDelete(id) {
		setPending(true);
		setError("");
		try {
			await deleteProject({ data: {
				id,
				password
			} });
			if (editing === id) {
				setEditing(null);
				setForm(empty);
			}
			await router.invalidate();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not remove that project.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium uppercase tracking-[0.2em] text-teal",
				children: "Admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-bold",
				children: "Site admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Add projects and pages, or update the contact details visitors see."
			}),
			unlocked ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onUnlock,
				className: "panel mt-8 space-y-4 rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-sm text-muted",
							children: "Owner password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (event) => setPassword(event.target.value),
							className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
							placeholder: "Password"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: pending,
						className: "rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60",
						children: "Open admin"
					})
				]
			}),
			unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: [
						["projects", "Projects"],
						["pages", "Pages"],
						["contact", "Contact"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setSection(id);
							setError("");
						},
						className: `rounded-full px-4 py-2 text-sm ${section === id ? "bg-teal text-white" : "border border-line text-ink"}`,
						children: label
					}, id))
				}),
				section === "projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "panel mt-8 space-y-4 rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: form.title,
								onChange: (event) => setForm({
									...form,
									title: event.target.value
								}),
								className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
								placeholder: "Sales dashboard for a cafe"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Tools"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.tools,
								onChange: (event) => setForm({
									...form,
									tools: event.target.value
								}),
								className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
								placeholder: "Excel • SQL • Power BI"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								rows: 4,
								value: form.summary,
								onChange: (event) => setForm({
									...form,
									summary: event.target.value
								}),
								className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
								placeholder: "What you analyzed and what you found."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Tags, separated by commas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.tags,
								onChange: (event) => setForm({
									...form,
									tags: event.target.value
								}),
								className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
								placeholder: "Cleaning, KPIs, Charts"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-sm text-muted",
								children: "Link (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: form.link,
								onChange: (event) => setForm({
									...form,
									link: event.target.value
								}),
								className: "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal",
								placeholder: "https://"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pending,
								className: "rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60",
								children: editing ? "Save changes" : "Add project"
							}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full border border-line px-6 py-3 text-ink",
								onClick: () => {
									setEditing(null);
									setForm(empty);
									setError("");
								},
								children: "Cancel"
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-4",
					children: saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted",
						children: "No extra projects yet."
					}) : saved.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "panel rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: project.title
							}),
							project.tools ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: project.tools
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-slate-300",
								children: project.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-teal hover:underline",
									onClick: () => fill(project),
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-danger hover:underline",
									onClick: () => onDelete(project.id),
									children: "Remove"
								})]
							})
						]
					}, project.id))
				})] }) : null,
				section === "pages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagesEditor, {
					pages: data.pages,
					password,
					onSaved: async () => {
						await router.invalidate();
					}
				}) : null,
				section === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactEditor, {
					contact: data.contact,
					password,
					onSaved: async () => {
						await router.invalidate();
					}
				}) : null
			] }) : null
		]
	})] });
}
function fieldClass() {
	return "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-teal";
}
function PagesEditor({ pages, password, onSaved }) {
	const empty = {
		title: "",
		slug: "",
		body: ""
	};
	const [form, setForm] = (0, import_react.useState)(empty);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError("");
		try {
			await savePage({ data: {
				id: editing ?? void 0,
				...form,
				password
			} });
			setForm(empty);
			setEditing(null);
			await onSaved();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not save that page.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "panel mt-8 space-y-4 rounded-2xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "A new page is added to the menu. The address is the short link, like notes or services."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: form.title,
					onChange: (event) => setForm({
						...form,
						title: event.target.value
					}),
					className: fieldClass()
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.slug,
					onChange: (event) => setForm({
						...form,
						slug: event.target.value
					}),
					className: fieldClass(),
					placeholder: "my-page"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: "Page text"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					rows: 8,
					value: form.body,
					onChange: (event) => setForm({
						...form,
						body: event.target.value
					}),
					className: fieldClass()
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: pending,
					className: "rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60",
					children: editing ? "Save page" : "Add page"
				}), editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-full border border-line px-6 py-3",
					onClick: () => {
						setEditing(null);
						setForm(empty);
					},
					children: "Cancel"
				}) : null]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-8 space-y-4",
		children: [pages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "text-muted",
			children: "No extra pages yet."
		}) : null, pages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "panel rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: page.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: ["/", page.slug]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-teal hover:underline",
						onClick: () => {
							setEditing(page.id);
							setForm({
								title: page.title,
								slug: page.slug,
								body: page.body
							});
						},
						children: "Edit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-danger hover:underline",
						onClick: () => {
							deletePage({ data: {
								id: page.id,
								password
							} }).then(onSaved).catch((cause) => {
								setError(cause instanceof Error ? cause.message : "Could not remove that page.");
							});
						},
						children: "Remove"
					})]
				})
			]
		}, page.id))]
	})] });
}
function ContactEditor({ contact, password, onSaved }) {
	const [form, setForm] = (0, import_react.useState)(contact);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [savedNote, setSavedNote] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setPending(true);
		setError("");
		setSavedNote(false);
		try {
			const next = await updateContact({ data: {
				...form,
				password
			} });
			setForm(next);
			setSavedNote(true);
			await onSaved();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Could not save contact details.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "panel mt-8 space-y-4 rounded-2xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "These details show in the header and the contact section."
			}),
			[
				["email", "Email"],
				["phone", "Phone"],
				["linkedin", "LinkedIn"],
				["location", "Location"]
			].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-sm text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: key !== "linkedin",
					value: form[key],
					onChange: (event) => setForm({
						...form,
						[key]: event.target.value
					}),
					className: fieldClass()
				})]
			}, key)),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			savedNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-teal",
				children: "Contact details saved."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: pending,
				className: "rounded-full bg-teal px-6 py-3 font-medium text-white transition hover:bg-copper disabled:opacity-60",
				children: "Save contact"
			})
		]
	});
}
//#endregion
export { AdminPage as component };

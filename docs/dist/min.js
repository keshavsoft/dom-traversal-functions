// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, r = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: n,
		runInstructions: e
	});
}, i = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, a = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, o = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: o }) => {
	let s = i({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), c = a(n, r), l = o[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof l != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return l(s, c, r);
}, s = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, c = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, l = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, u = /* @__PURE__ */ t({
	closest: () => s,
	querySelector: () => c,
	querySelectorAll: () => l
}), d = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, f = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, p = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? f(e, {}, n) : d(e, {}, n);
		o[r] = s;
	}), o;
}, m = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = f(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, h = /* @__PURE__ */ t({
	mapNamedValues: () => m,
	mapValues: () => p,
	readText: () => d,
	readValue: () => f
}), g = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, _ = /* @__PURE__ */ t({ isKey: () => g }), v = {
	...u,
	...h,
	..._
}, y = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = o({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: v
		});
	}
	return r;
}, b = y;
r(y);
// src/v3/table/header/instructions.json
var x = [{
	narration: "Find search input control if event came from within header container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "input, form, div" }
}, {
	narration: "Read search query value from input",
	sourcePath: { fileName: "previous" },
	func: "readValue"
}], S = (e) => e ? (b(e.target || e, x) || "").trim().toLowerCase() : "", C = /* @__PURE__ */ t({
	default: () => S,
	getSearchQuery: () => S,
	instructions: () => x
}), w = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, T = (e, t = "") => {
	let n = w(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, E = (e, t = "table-primary", n = "") => {
	let r = w(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, D = [
	{
		narration: "Find closest body table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	},
	{
		narration: "Collect all data cells from row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "td" }
	},
	{
		narration: "Map collected cell values to columns using clientData",
		sourcePath: { fileName: "previous" },
		func: "mapValues",
		arguments: { read: "text" }
	}
], O = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = w(e);
	if (!i) return null;
	let a = T(i, r);
	return n && Array.isArray(n) && a >= 0 && a < n.length ? n[a] : b(i, D, { columns: t.map((e) => typeof e == "string" ? e : e.columnName || e.field) }) || {};
}, k = /* @__PURE__ */ t({
	getRowData: () => O,
	getRowElement: () => w,
	getRowIndex: () => T,
	highlightRow: () => E,
	instructions: () => D
}), A = [
	{
		narration: "Find closest footer table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tfoot tr" }
	},
	{
		narration: "Collect all input and select controls in footer row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "input, select" }
	},
	{
		narration: "Map named control values into object",
		sourcePath: { fileName: "previous" },
		func: "mapNamedValues"
	}
], j = (e, t = []) => {
	let n = w(e);
	if (!n) return {};
	let r = b(n, A);
	if (r && typeof r == "object" && Object.keys(r).length > 0) return r;
	let i = {};
	return t && t.length > 0 && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.columnName || e.field, r = n.querySelector(`input[name="${t}"], select[name="${t}"]`) || n.querySelector(`input#${t}, select#${t}`);
		r && (i[t] = r.value.trim());
	}), i;
}, M = (e) => {
	let t = w(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, N = {
	header: C,
	body: k,
	footer: /* @__PURE__ */ t({
		clearRowInputs: () => M,
		getFooterData: () => j,
		instructions: () => A
	})
}, P = {
	name: "dom-traversal-functions",
	version: "1.3.1"
};
// src/v3/index.js
((e) => {
	let t = e;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal = {
		meta: P,
		...t
	});
})({ table: N });
var F = N;
export { F as default, N as table };

// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = {
	version: "1.2.0",
	description: "Standardized, zero-dependency DOM traversal utilities organized by semantic concerns"
}, r = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal.table = {
		meta: n,
		header: e.header,
		body: e.body,
		footer: e.footer
	});
}, i = (e) => e ? ((e.target || e).value || "").trim().toLowerCase() : "", a = /* @__PURE__ */ t({
	default: () => o,
	getSearchQuery: () => i
}), o = { getSearchQuery: i }, s = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, c = (e, t = "") => {
	let n = s(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, l = (e, t = "table-primary", n = "") => {
	let r = s(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, u = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = s(e);
	if (!i) return null;
	let a = c(i, r);
	if (n && Array.isArray(n) && a >= 0 && a < n.length) return n[a];
	let o = {}, l = Array.from(i.querySelectorAll(":scope > td, :scope > th"));
	if (t && t.length > 0) {
		let e = 0;
		l.forEach((n) => {
			let r = n.getAttribute("data-name") || n.getAttribute("data-column");
			if (r) o[r] = n.textContent.trim();
			else if (e < t.length) {
				let r = t[e].columnName;
				o[r] = n.textContent.trim(), e++;
			}
		});
	} else l.forEach((e, t) => {
		let n = e.getAttribute("data-name") || e.getAttribute("data-column") || `col_${t}`;
		o[n] = e.textContent.trim();
	});
	return o;
}, d = /* @__PURE__ */ t({
	default: () => f,
	getRowData: () => u,
	getRowElement: () => s,
	getRowIndex: () => c,
	highlightRow: () => l
}), f = {
	getRowElement: s,
	getRowIndex: c,
	highlightRow: l,
	getRowData: u
}, p = (e, t = []) => {
	let n = s(e);
	if (!n) return {};
	let r = {};
	return t && t.length > 0 ? t.forEach((e) => {
		let t = n.querySelector(`input[name="${e.columnName}"]`) || n.querySelector(`input#${e.columnName}`);
		t && (r[e.columnName] = t.value.trim());
	}) : Array.from(n.querySelectorAll("input")).forEach((e) => {
		let t = e.getAttribute("name") || e.id;
		t && (r[t] = e.value.trim());
	}), r;
}, m = (e) => {
	let t = s(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, h = /* @__PURE__ */ t({
	clearRowInputs: () => m,
	default: () => g,
	getFooterData: () => p
}), g = {
	getFooterData: p,
	clearRowInputs: m
}, _ = /* @__PURE__ */ t({
	body: () => d,
	default: () => v,
	footer: () => h,
	header: () => a,
	table: () => v
}), v = {
	header: o,
	body: f,
	footer: g
};
// src/v2/index.js
r(v);
var y = { table: v };
export { y as default, _ as table };

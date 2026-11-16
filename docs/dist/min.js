// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = (e) => e ? ((e.target || e).value || "").trim().toLowerCase() : "", r = /* @__PURE__ */ t({
	default: () => i,
	getSearchQuery: () => n
}), i = { getSearchQuery: n }, a = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, o = (e, t = "") => {
	let n = a(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, s = (e, t = "table-primary", n = "") => {
	let r = a(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, c = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = a(e);
	if (!i) return null;
	let s = o(i, r);
	if (n && Array.isArray(n) && s >= 0 && s < n.length) return n[s];
	let c = {}, l = Array.from(i.querySelectorAll(":scope > td, :scope > th"));
	if (t && t.length > 0) {
		let e = 0;
		l.forEach((n) => {
			let r = n.getAttribute("data-name") || n.getAttribute("data-column");
			if (r) c[r] = n.textContent.trim();
			else if (e < t.length) {
				let r = t[e].columnName;
				c[r] = n.textContent.trim(), e++;
			}
		});
	} else l.forEach((e, t) => {
		let n = e.getAttribute("data-name") || e.getAttribute("data-column") || `col_${t}`;
		c[n] = e.textContent.trim();
	});
	return c;
}, l = /* @__PURE__ */ t({
	default: () => u,
	getRowData: () => c,
	getRowElement: () => a,
	getRowIndex: () => o,
	highlightRow: () => s
}), u = {
	getRowElement: a,
	getRowIndex: o,
	highlightRow: s,
	getRowData: c
}, d = (e, t = []) => {
	let n = a(e);
	if (!n) return {};
	let r = {};
	return t && t.length > 0 ? t.forEach((e) => {
		let t = n.querySelector(`input[name="${e.columnName}"]`) || n.querySelector(`input#${e.columnName}`);
		t && (r[e.columnName] = t.value.trim());
	}) : Array.from(n.querySelectorAll("input")).forEach((e) => {
		let t = e.getAttribute("name") || e.id;
		t && (r[t] = e.value.trim());
	}), r;
}, f = (e) => {
	let t = a(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, p = /* @__PURE__ */ t({
	clearRowInputs: () => f,
	default: () => m,
	getFooterData: () => d
}), m = {
	getFooterData: d,
	clearRowInputs: f
}, h = /* @__PURE__ */ t({
	body: () => l,
	clearRowInputs: () => f,
	default: () => g,
	footer: () => p,
	getFooterData: () => d,
	getRowData: () => c,
	getRowElement: () => a,
	getRowIndex: () => o,
	getSearchQuery: () => n,
	header: () => r,
	highlightRow: () => s
}), g = {
	header: i,
	body: u,
	footer: m,
	getSearchQuery: n,
	getRowElement: a,
	getRowIndex: o,
	highlightRow: s,
	getRowData: c,
	getFooterData: d,
	clearRowInputs: f
}, _ = { table: g };
export { l as body, f as clearRowInputs, _ as default, p as footer, d as getFooterData, c as getRowData, a as getRowElement, o as getRowIndex, n as getSearchQuery, r as header, s as highlightRow, h as table };

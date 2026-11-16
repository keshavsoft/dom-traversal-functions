// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, r = (e, t = "") => {
	let r = n(e);
	if (!r) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(r);
	let i = r.closest("tbody");
	if (i) return Array.from(i.querySelectorAll(":scope > tr")).indexOf(r);
	let a = r.parentElement;
	return a ? Array.from(a.children).filter((e) => e.tagName === "TR").indexOf(r) : -1;
}, i = (e, t = "table-primary", r = "") => {
	let i = n(e);
	if (!i) return null;
	let a = [];
	if (r) a = Array.from(document.querySelectorAll(r));
	else {
		let e = i.closest("tbody") || i.parentElement;
		e && (a = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return a.forEach((e) => e.classList.remove(t)), i.classList.add(t), i;
}, a = (e, { columns: t = [], dataset: i = [], bodySelector: a = "" } = {}) => {
	let o = n(e);
	if (!o) return null;
	let s = r(o, a);
	if (i && Array.isArray(i) && s >= 0 && s < i.length) return i[s];
	let c = {}, l = Array.from(o.querySelectorAll(":scope > td, :scope > th"));
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
}, o = (e, t = []) => {
	let r = n(e);
	if (!r) return {};
	let i = {};
	return t && t.length > 0 ? t.forEach((e) => {
		let t = r.querySelector(`input[name="${e.columnName}"]`) || r.querySelector(`input#${e.columnName}`);
		t && (i[e.columnName] = t.value.trim());
	}) : Array.from(r.querySelectorAll("input")).forEach((e) => {
		let t = e.getAttribute("name") || e.id;
		t && (i[t] = e.value.trim());
	}), i;
}, s = (e) => {
	let t = n(e);
	if (!t) return 0;
	let r = Array.from(t.querySelectorAll("input"));
	return r.forEach((e) => {
		e.value = "";
	}), r.length;
}, c = (e) => e ? ((e.target || e).value || "").trim().toLowerCase() : "", l = /* @__PURE__ */ t({
	clearRowInputs: () => s,
	default: () => u,
	getFooterData: () => o,
	getRowData: () => a,
	getRowElement: () => n,
	getRowIndex: () => r,
	getSearchQuery: () => c,
	highlightRow: () => i
}), u = {
	getRowElement: n,
	getRowIndex: r,
	highlightRow: i,
	getRowData: a,
	getFooterData: o,
	clearRowInputs: s,
	getSearchQuery: c
}, d = { table: u };
export { s as clearRowInputs, d as default, o as getFooterData, a as getRowData, n as getRowElement, r as getRowIndex, c as getSearchQuery, i as highlightRow, l as table };

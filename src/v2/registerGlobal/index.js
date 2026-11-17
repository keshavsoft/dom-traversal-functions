import meta from "./meta.js";

export const registerGlobal = (table) => {
    if (typeof globalThis === "undefined" || !table) return;

    globalThis.ks ??= {};
    globalThis.ks.domTraversal ??= {};

    globalThis.ks.domTraversal.table = {
        meta,
        header: table.header,
        body: table.body,
        footer: table.footer
    };
};

export default registerGlobal;

import meta from "./meta.js";

export const registerGlobal = (inDefinition) => {
    const localDefinition = inDefinition;

    if (typeof globalThis === "undefined" || !localDefinition) return;

    globalThis.ks ??= {};
    globalThis.ks.domTraversal ??= {};

    globalThis.ks.domTraversal = {
        meta,
        ...localDefinition
    };
};

export default registerGlobal;

import getRowElement from "./getRowElement.js";

/**
 * Returns the 0-based index of a table row within its parent `<tbody>` (or custom selector).
 *
 * @param {HTMLElement} element - Match element, button, or `<tr>`.
 * @param {string} [bodySelector] - Optional custom selector for body rows (e.g. "#table-simple-body-id tr").
 * @returns {number} - 0-based index, or -1 if not found.
 */
export const getRowIndex = (element, bodySelector = "") => {
    const row = getRowElement(element);
    if (!row) return -1;

    if (bodySelector) {
        const rows = Array.from(document.querySelectorAll(bodySelector));
        return rows.indexOf(row);
    }

    const tbody = row.closest("tbody");
    if (tbody) {
        const rows = Array.from(tbody.querySelectorAll(":scope > tr"));
        return rows.indexOf(row);
    }

    const parent = row.parentElement;
    if (parent) {
        const rows = Array.from(parent.children).filter(el => el.tagName === "TR");
        return rows.indexOf(row);
    }

    return -1;
};

export default getRowIndex;

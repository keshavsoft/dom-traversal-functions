/**
 * Finds and returns the closest `<tr>` element for a given target.
 *
 * @param {HTMLElement} element - Event target or match element.
 * @returns {HTMLTableRowElement|null} - The enclosing <tr> or null.
 */
export const getRowElement = (element) => {
    if (!element) return null;
    if (element.tagName === "TR") return element;
    return element.closest("tr") || null;
};

export default getRowElement;

/**
 * Finds and returns the closest `<tr>` element for a given target.
 *
 * @param {HTMLElement} element - Event target, match element, or cell.
 * @returns {HTMLTableRowElement|null} - The enclosing <tr> or null.
 *
 * @example
 * const tr = getRowElement(event.target);
 */
export const getRowElement = (element) => {
    if (!element) return null;
    if (element.tagName === "TR") return element;
    return element.closest("tr") || null;
};

export default getRowElement;

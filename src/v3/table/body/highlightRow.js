import getRowElement from "./getRowElement.js";

/**
 * Highlights a table row by adding an active class to it and removing that class from all sibling rows.
 *
 * @param {HTMLElement} element - Match element, button, or `<tr>`.
 * @param {string} [className="table-primary"] - The highlight CSS class name.
 * @param {string} [bodySelector=""] - Optional custom selector for body rows.
 * @returns {HTMLTableRowElement|null} - The highlighted row element.
 *
 * @example
 * highlightRow(matchElement, "table-primary");
 */
export const highlightRow = (element, className = "table-primary", bodySelector = "") => {
    const row = getRowElement(element);
    if (!row) return null;

    let rows = [];
    if (bodySelector) {
        rows = Array.from(document.querySelectorAll(bodySelector));
    } else {
        const tbody = row.closest("tbody") || row.parentElement;
        if (tbody) {
            rows = Array.from(tbody.querySelectorAll(":scope > tr"));
        }
    }

    rows.forEach(r => r.classList.remove(className));
    row.classList.add(className);

    return row;
};

export default highlightRow;

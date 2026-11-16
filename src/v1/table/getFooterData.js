import getRowElement from "./getRowElement.js";

/**
 * Extracts values from all `<input>` elements inside a table footer row.
 *
 * @param {HTMLElement} element - Match element (e.g. Save button) or footer `<tr>`.
 * @param {Array<object>} [columns=[]] - Optional column definitions.
 * @returns {object} - Extracted key-value record object.
 */
export const getFooterData = (element, columns = []) => {
    const row = getRowElement(element);
    if (!row) return {};

    const record = {};

    if (columns && columns.length > 0) {
        columns.forEach(col => {
            const input = row.querySelector(`input[name="${col.columnName}"]`) ||
                          row.querySelector(`input#${col.columnName}`);
            if (input) {
                record[col.columnName] = input.value.trim();
            }
        });
    } else {
        const inputs = Array.from(row.querySelectorAll("input"));
        inputs.forEach(input => {
            const key = input.getAttribute("name") || input.id;
            if (key) {
                record[key] = input.value.trim();
            }
        });
    }

    return record;
};

export default getFooterData;

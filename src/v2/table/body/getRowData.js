import getRowElement from "./getRowElement.js";
import getRowIndex from "./getRowIndex.js";

/**
 * Extracts a row's values into a plain JavaScript object.
 *
 * @param {HTMLElement} element - Match element, button, or `<tr>`.
 * @param {object} [options]
 * @param {Array<object>} [options.columns] - Column definitions with `columnName`.
 * @param {Array<object>} [options.dataset] - Optional backing array to look up by rowIndex.
 * @param {string} [options.bodySelector] - Optional body rows selector.
 * @returns {object|null} - Plain JavaScript object with column values.
 *
 * @example
 * const record = getRowData(matchElement, { dataset: state.dataset });
 */
export const getRowData = (element, { columns = [], dataset = [], bodySelector = "" } = {}) => {
    const row = getRowElement(element);
    if (!row) return null;

    const rowIndex = getRowIndex(row, bodySelector);

    // If dataset is provided and rowIndex is valid, return dataset object
    if (dataset && Array.isArray(dataset) && rowIndex >= 0 && rowIndex < dataset.length) {
        return dataset[rowIndex];
    }

    // Otherwise extract directly from DOM cells
    const result = {};
    const cells = Array.from(row.querySelectorAll(":scope > td, :scope > th"));

    if (columns && columns.length > 0) {
        let colIdx = 0;
        cells.forEach(cell => {
            const dataName = cell.getAttribute("data-name") || cell.getAttribute("data-column");
            if (dataName) {
                result[dataName] = cell.textContent.trim();
            } else if (colIdx < columns.length) {
                const colName = columns[colIdx].columnName;
                result[colName] = cell.textContent.trim();
                colIdx++;
            }
        });
    } else {
        cells.forEach((cell, idx) => {
            const key = cell.getAttribute("data-name") || cell.getAttribute("data-column") || `col_${idx}`;
            result[key] = cell.textContent.trim();
        });
    }

    return result;
};

export default getRowData;

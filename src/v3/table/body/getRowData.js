import runInstructions from "dom-primitive-engine";
import getRowElement from "./getRowElement.js";
import getRowIndex from "./getRowIndex.js";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Extracts a row's values into a plain JavaScript object using declarative instructions.json.
 *
 * @param {HTMLElement} element - Match element, button, or `<tr>`.
 * @param {object} [options]
 * @param {Array<object>} [options.columns] - Column definitions with `columnName`.
 * @param {Array<object>} [options.dataset] - Optional backing array to look up by rowIndex.
 * @param {string} [options.bodySelector] - Optional body rows selector.
 * @returns {object|null} - Plain JavaScript object with column values.
 */
export const getRowData = (element, { columns = [], dataset = [], bodySelector = "" } = {}) => {
    const row = getRowElement(element);
    if (!row) return null;

    const rowIndex = getRowIndex(row, bodySelector);

    // If dataset is provided and rowIndex is valid, return dataset object
    if (dataset && Array.isArray(dataset) && rowIndex >= 0 && rowIndex < dataset.length) {
        return dataset[rowIndex];
    }

    // Execute declarative JSON instructions via dom-primitive-engine
    const columnNames = columns.map(c => typeof c === "string" ? c : (c.columnName || c.field));
    const extracted = runInstructions(row, instructions, { columns: columnNames });

    return extracted || {};
};

export default getRowData;
export { instructions };

import runInstructions from "dom-primitive-engine";
import { getRowElement } from "../body/getRowElement.js";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Extracts values from all `<input>` and `<select>` elements inside a table footer row
 * using declarative instructions.json.
 *
 * @param {HTMLElement} element - Match element (e.g. Save button) or footer `<tr>`.
 * @param {Array<object>} [columns=[]] - Optional column definitions.
 * @returns {object} - Extracted key-value record object.
 */
export const getFooterData = (element, columns = []) => {
    const row = getRowElement(element);
    if (!row) return {};

    // Execute declarative instructions via dom-primitive-engine
    const extracted = runInstructions(row, instructions);
    if (extracted && typeof extracted === "object" && Object.keys(extracted).length > 0) {
        return extracted;
    }

    // Fallback: match by configured columns
    const record = {};
    if (columns && columns.length > 0) {
        columns.forEach(col => {
            const colName = typeof col === "string" ? col : (col.columnName || col.field);
            const input = row.querySelector(`input[name="${colName}"], select[name="${colName}"]`) ||
                          row.querySelector(`input#${colName}, select#${colName}`);
            if (input) {
                record[colName] = input.value.trim();
            }
        });
    }

    return record;
};

export default getFooterData;
export { instructions };

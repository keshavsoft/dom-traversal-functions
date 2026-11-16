import { getRowElement } from "../body/getRowElement.js";

/**
 * Resets/clears the `.value` of all `<input>` elements within a given table row.
 *
 * @param {HTMLElement} element - Match element or `<tr>`.
 * @returns {number} - Count of inputs cleared.
 *
 * @example
 * clearRowInputs(matchElement);
 */
export const clearRowInputs = (element) => {
    const row = getRowElement(element);
    if (!row) return 0;

    const inputs = Array.from(row.querySelectorAll("input"));
    inputs.forEach(input => {
        input.value = "";
    });

    return inputs.length;
};

export default clearRowInputs;

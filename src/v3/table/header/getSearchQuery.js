import runInstructions from "dom-primitive-engine";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Extracts and normalizes (trims, lowercases) the search string from an input element or event
 * using declarative instructions.json executed by dom-primitive-engine.
 *
 * @param {HTMLInputElement|Event} target - Search input element or input event.
 * @returns {string} - Clean search query string.
 */
export const getSearchQuery = (target) => {
    if (!target) return "";
    const el = target.target || target;

    // Run the declarative JSON instruction pipeline:
    const rawValue = runInstructions(el, instructions);

    return (rawValue || "").trim().toLowerCase();
};

export default getSearchQuery;
export { instructions };

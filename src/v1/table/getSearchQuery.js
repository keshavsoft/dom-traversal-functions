/**
 * Extracts and normalizes (trims, lowercases) the search string from an input element or event.
 *
 * @param {HTMLInputElement|Event} target - Search input element or input event.
 * @returns {string} - Clean search query string.
 */
export const getSearchQuery = (target) => {
    if (!target) return "";
    const el = target.target || target;
    return (el.value || "").trim().toLowerCase();
};

export default getSearchQuery;

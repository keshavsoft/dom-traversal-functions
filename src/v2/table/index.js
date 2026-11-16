export * as header from "./header/index.js";
export * as body from "./body/index.js";
export * as footer from "./footer/index.js";

// Flat direct exports
export { getSearchQuery } from "./header/index.js";
export { getRowElement, getRowIndex, highlightRow, getRowData } from "./body/index.js";
export { getFooterData, clearRowInputs } from "./footer/index.js";

import header from "./header/index.js";
import body from "./body/index.js";
import footer from "./footer/index.js";

import { getSearchQuery } from "./header/index.js";
import { getRowElement, getRowIndex, highlightRow, getRowData } from "./body/index.js";
import { getFooterData, clearRowInputs } from "./footer/index.js";

export default {
    header,
    body,
    footer,
    getSearchQuery,
    getRowElement,
    getRowIndex,
    highlightRow,
    getRowData,
    getFooterData,
    clearRowInputs
};

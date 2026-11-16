# dom-traversal-functions

Standardized, zero-dependency DOM traversal and data extraction utilities for component event architectures.

## Table Traversals (`/table`)

Granular, single-responsibility functions for table event handlers:

```javascript
import { 
    getRowElement, 
    getRowIndex, 
    highlightRow, 
    getRowData, 
    getFooterData, 
    clearRowInputs, 
    getSearchQuery 
} from "dom-traversal-functions/table";
```

### API Reference

| Function | Description |
|---|---|
| `getRowElement(element)` | Finds and returns the closest `<tr>` element. |
| `getRowIndex(element, [bodySelector])` | Calculates the 0-based index of a row within `<tbody>`. |
| `highlightRow(element, [className="table-primary"])` | Clears active class from siblings and applies to target row. |
| `getRowData(element, { columns, dataset })` | Extracts row values into a plain JS object (or looks up from dataset). |
| `getFooterData(element, [columns])` | Extracts all input values inside a footer `<tr>` into a plain JS object. |
| `clearRowInputs(element)` | Resets `.value = ""` for all input elements inside a row. |
| `getSearchQuery(elementOrEvent)` | Normalizes and returns a trimmed, lowercase search string. |

## Usage with Event Handlers (`actions.js`)

```javascript
import { 
    getRowIndex, 
    highlightRow, 
    getFooterData, 
    clearRowInputs,
    getSearchQuery
} from "dom-traversal-functions/table";

export const actions = {
    onRowSelect: (event, matchElement) => {
        const rowIndex = getRowIndex(matchElement);
        highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        console.log("Selected:", record);
    },

    onFooterSave: (event, matchElement) => {
        const newRecord = getFooterData(matchElement);
        clearRowInputs(matchElement);
        state.dataset.push(newRecord);
        renderTable(state.dataset);
    },

    onSearch: (event, matchElement) => {
        const query = getSearchQuery(matchElement);
        const filtered = state.dataset.filter(...);
        renderTable(filtered);
    }
};
```

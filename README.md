# dom-traversal-functions

<p align="left">
  <img src="https://img.shields.io/badge/version-1.2.0-blue.svg" alt="Version 1.2.0" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen.svg" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/module-ESM-orange.svg" alt="ES Modules" />
</p>

**Standardized, zero-dependency DOM traversal and data extraction utilities for component event architectures.**

Extracting rows, reading input values, and traversing the DOM in application handlers leads to brittle, tangled code. `dom-traversal-functions` isolates all DOM querying mechanics into granular, single-responsibility functions organized around the **narrative story of the UI control**.

---

## 📖 The Architecture Story: Semantic Concerns

Every complex data control tells a story from top to bottom. For a Table, its operations are divided cleanly across its three structural zones:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TABLE COMPONENT STORY                           │
└────────────────────────────────────────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
[ 1. HEADER CONCERN ]      [ 2. BODY CONCERN ]        [ 3. FOOTER CONCERN ]
Search & Top Controls      Rows, Data & Actions       Data Entry & New Rows
─────────────────────      ────────────────────       ─────────────────────
• getSearchQuery           • getRowElement            • getFooterData
                           • getRowIndex              • clearRowInputs
                           • highlightRow
                           • getRowData
```

---

## 📦 Installation & Imports

```bash
npm install dom-traversal-functions
```

### 1. Concern-Based Imports (Recommended)

Import only the specific section of the table you are working with:

```javascript
// Header Controls
import { getSearchQuery } from "dom-traversal-functions/table/header";

// Body Rows & Selection
import { getRowIndex, highlightRow, getRowData } from "dom-traversal-functions/table/body";

// Footer Data Entry
import { getFooterData, clearRowInputs } from "dom-traversal-functions/table/footer";
```

### 2. Namespaced Import

```javascript
import { header, body, footer } from "dom-traversal-functions/table";

const query = header.getSearchQuery(inputEl);
const index = body.getRowIndex(clickedEl);
const record = footer.getFooterData(saveBtnEl);
```

### 3. Flat Direct Import

```javascript
import { 
    getSearchQuery, 
    getRowIndex, 
    highlightRow, 
    getFooterData, 
    clearRowInputs 
} from "dom-traversal-functions/table";
```

---

## 📚 API Reference

### 1. Header Traversal (`/table/header`)

#### `getSearchQuery(target)`
Extracts and normalizes (trims, converts to lowercase) the query text from an `<input>` element or an `InputEvent`.

```javascript
import { getSearchQuery } from "dom-traversal-functions/table/header";

const query = getSearchQuery(matchElement);
// Returns: "fasteners" (trimmed, lowercased, safe string)
```

---

### 2. Body Traversal (`/table/body`)

#### `getRowElement(element)`
Finds and returns the closest enclosing `<tr>` element for any child node (button, icon, cell) or the row itself.

```javascript
import { getRowElement } from "dom-traversal-functions/table/body";

const tr = getRowElement(event.target);
// Returns: HTMLTableRowElement | null
```

#### `getRowIndex(element, [bodySelector])`
Calculates the 0-based index of a table row within its enclosing `<tbody>` (or within a custom selector list).

```javascript
import { getRowIndex } from "dom-traversal-functions/table/body";

const rowIndex = getRowIndex(matchElement);
// Returns: 2 (number, or -1 if not found)
```

#### `highlightRow(element, [className="table-primary"], [bodySelector])`
Removes the specified highlight class from all sibling rows in the `<tbody>` and applies it to the target row.

```javascript
import { highlightRow } from "dom-traversal-functions/table/body";

highlightRow(matchElement, "table-primary");
// Sibling <tr> elements have "table-primary" removed; target <tr> receives "table-primary".
```

#### `getRowData(element, { columns, dataset, bodySelector })`
Converts a table row into a plain JavaScript data object. Supports two extraction modes:
1. Direct index lookup from an in-memory `dataset` array.
2. Direct DOM cell extraction mapped against column definitions.

```javascript
import { getRowData } from "dom-traversal-functions/table/body";

const record = getRowData(matchElement, { 
    dataset: state.dataset,
    columns: state.columns 
});
// Returns: { itemName: "0.11-30 Stainless Steel Rod", category: "Raw Materials", baseUnit: "pcs" }
```

---

### 3. Footer Traversal (`/table/footer`)

#### `getFooterData(element, [columns])`
Extracts all values from `<input>` elements inside the footer row into a key-value record object.

```javascript
import { getFooterData } from "dom-traversal-functions/table/footer";

const newRecord = getFooterData(matchElement, state.columns);
// Returns: { itemName: "M8 Flange Nut", category: "Fasteners", baseUnit: "boxes" }
```

#### `clearRowInputs(element)`
Resets `.value = ""` for all `<input>` elements located inside the specified row.

```javascript
import { clearRowInputs } from "dom-traversal-functions/table/footer";

clearRowInputs(matchElement);
// Clears all input elements in the footer row; returns count of cleared inputs.
```

---

## 🛠️ Complete Integration Example (`actions.js`)

Below is how clean an application's `actions.js` looks when paired with `dom-primitive-bindings`:

```javascript
import { getSearchQuery } from "dom-traversal-functions/table/header";
import { getRowIndex, highlightRow } from "dom-traversal-functions/table/body";
import { getFooterData, clearRowInputs } from "dom-traversal-functions/table/footer";

export const actions = {
    // 1. Search Bar Filter
    onSearchInput: (event, matchElement) => {
        const query = getSearchQuery(matchElement);
        const filtered = query
            ? state.dataset.filter(item =>
                Object.values(item).some(val =>
                    String(val ?? "").toLowerCase().includes(query)
                )
            )
            : state.dataset;

        renderTable(filtered);
    },

    // 2. Row Selection & Highlight
    onRowSelect: (event, matchElement) => {
        const rowIndex = getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        console.log("Selected Record:", record);
    },

    // 3. Row Action Button ("show")
    onRowShow: (event, matchElement) => {
        event.stopPropagation();
        const rowIndex = getRowIndex(matchElement);
        highlightRow(matchElement, "table-primary");
        
        const record = state.dataset[rowIndex];
        displayRecordInDetailPanel(record);
    },

    // 4. Footer Save New Record
    onFooterSave: (event, matchElement) => {
        const newRecord = getFooterData(matchElement, state.columns);

        if (Object.values(newRecord).some(val => val.length > 0)) {
            clearRowInputs(matchElement);
            state.dataset.push(newRecord);
            renderTable(state.dataset);
        }
    }
};
```

---

## 🎯 Design Principles

1. **Zero Raw DOM in Business Logic**: Handlers never need to invoke `closest()`, `querySelectorAll()`, or manual loop counters.
2. **Zero Dependencies**: Pure, modern, lightweight ES Modules designed to work directly in the browser or via bundlers (Vite, Rollup, Webpack).
3. **Fail-Safe**: Gracefully handles missing elements, null targets, and bounds checking.
4. **Story-Driven Organization**: Grouped strictly by semantic concerns (`header/`, `body/`, `footer/`).

---

## 📄 License

MIT © [KeshavSoft](https://github.com/keshavsoft)

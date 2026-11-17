# dom-traversal-functions

<p align="left">
  <img src="https://img.shields.io/badge/version-1.2.0-blue.svg" alt="Version 1.2.0" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen.svg" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/module-ESM%20%2B%20Global%20ks-orange.svg" alt="ES Modules & Global ks" />
</p>

**Standardized, zero-dependency DOM traversal and data extraction utilities for component event architectures.**

Extracting rows, reading input values, and traversing the DOM in application handlers leads to brittle, tangled code. `dom-traversal-functions` isolates all DOM querying mechanics into granular, single-responsibility functions organized strictly around the **3-part narrative story of the UI control**.

---

## 📖 The Architecture Story: Semantic Concerns

Every complex data control tells a story from top to bottom. For a Table, its operations are divided strictly across its three structural zones:

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

## 🚀 Quick Start: Global Script (Zero-Import Workflow)

Load the bundle once via a standard `<script>` tag or CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/dom-traversal-functions/docs/dist/min.js"></script>
```

It automatically attaches to `window.ks.domTraversal.table`:

```javascript
// Zero import statements needed in your application or actions.js!
const { header, body, footer } = ks.domTraversal.table;

// 1. Header query
const query = header.getSearchQuery(inputEl);

// 2. Body selection & highlight
body.highlightRow(clickedEl, "table-primary");
const rowIndex = body.getRowIndex(clickedEl);
const rowData = body.getRowData(clickedEl);

// 3. Footer extraction & reset
const newRow = footer.getFooterData(saveButtonEl);
footer.clearRowInputs(saveButtonEl);
```

---

## 📦 Modular ES Module Imports

If you are using a bundler (Vite, Rollup, Webpack):

```bash
npm install dom-traversal-functions
```

```javascript
// Import the table story
import { header, body, footer } from "dom-traversal-functions/table";

// Or import specific subpath
import * as body from "dom-traversal-functions/table/body";
import * as footer from "dom-traversal-functions/table/footer";
```

---

## 📚 API Reference

### 1. Header Traversal (`header.*`)

#### `getSearchQuery(target)`
Extracts and normalizes (trims, converts to lowercase) the query text from an `<input>` element or an `InputEvent`.

```javascript
const query = ks.domTraversal.table.header.getSearchQuery(matchElement);
// Returns: "fasteners" (trimmed, lowercased, safe string)
```

---

### 2. Body Traversal (`body.*`)

#### `getRowElement(element)`
Finds and returns the closest enclosing `<tr>` element for any child node (button, icon, cell) or the row itself.

```javascript
const tr = ks.domTraversal.table.body.getRowElement(event.target);
// Returns: HTMLTableRowElement | null
```

#### `getRowIndex(element, [bodySelector])`
Calculates the 0-based index of a table row within its enclosing `<tbody>` (or within a custom selector list).

```javascript
const rowIndex = ks.domTraversal.table.body.getRowIndex(matchElement);
// Returns: 2 (number, or -1 if not found)
```

#### `highlightRow(element, [className="table-primary"], [bodySelector])`
Removes the specified highlight class from all sibling rows in the `<tbody>` and applies it to the target row.

```javascript
ks.domTraversal.table.body.highlightRow(matchElement, "table-primary");
// Sibling <tr> elements have "table-primary" removed; target <tr> receives "table-primary".
```

#### `getRowData(element, { columns, dataset, bodySelector })`
Converts a table row into a plain JavaScript data object. Supports two extraction modes:
1. Direct index lookup from an in-memory `dataset` array.
2. Direct DOM cell extraction mapped against column definitions.

```javascript
const record = ks.domTraversal.table.body.getRowData(matchElement, { 
    dataset: state.dataset,
    columns: state.columns 
});
// Returns: { itemName: "0.11-30 Stainless Steel Rod", category: "Raw Materials", baseUnit: "pcs" }
```

---

### 3. Footer Traversal (`footer.*`)

#### `getFooterData(element, [columns])`
Extracts all values from `<input>` elements inside the footer row into a key-value record object.

```javascript
const newRecord = ks.domTraversal.table.footer.getFooterData(matchElement, state.columns);
// Returns: { itemName: "M8 Flange Nut", category: "Fasteners", baseUnit: "boxes" }
```

#### `clearRowInputs(element)`
Resets `.value = ""` for all `<input>` elements located inside the specified row.

```javascript
ks.domTraversal.table.footer.clearRowInputs(matchElement);
// Clears all input elements in the footer row; returns count of cleared inputs.
```

---

## 🛠️ Complete Integration Example (`actions.js`)

Below is how clean an application's `actions.js` looks when paired with `dom-primitive-bindings`:

```javascript
export const actions = {
    // 1. Search Bar Filter
    onSearchInput: (event, matchElement) => {
        const { header } = ks.domTraversal.table;
        const query = header.getSearchQuery(matchElement);

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
        const { body } = ks.domTraversal.table;
        const rowIndex = body.getRowIndex(matchElement);
        if (rowIndex < 0 || rowIndex >= state.dataset.length) return;

        body.highlightRow(matchElement, "table-primary");
        const record = state.dataset[rowIndex];
        console.log("Selected Record:", record);
    },

    // 3. Row Action Button ("show")
    onRowShow: (event, matchElement) => {
        event.stopPropagation();
        const { body } = ks.domTraversal.table;
        const rowIndex = body.getRowIndex(matchElement);
        body.highlightRow(matchElement, "table-primary");
        
        const record = state.dataset[rowIndex];
        displayRecordInDetailPanel(record);
    },

    // 4. Footer Save New Record
    onFooterSave: (event, matchElement) => {
        const { footer } = ks.domTraversal.table;
        const newRecord = footer.getFooterData(matchElement, state.columns);

        if (Object.values(newRecord).some(val => val.length > 0)) {
            footer.clearRowInputs(matchElement);
            state.dataset.push(newRecord);
            renderTable(state.dataset);
        }
    }
};
```

---

## 🎯 Design Principles

1. **Zero Raw DOM in Business Logic**: Handlers never need to invoke `closest()`, `querySelectorAll()`, or manual loop counters.
2. **Zero-Import Option**: Works out-of-the-box via `window.ks.domTraversal.table` with zero build configuration.
3. **Fail-Safe**: Gracefully handles missing elements, null targets, and bounds checking.
4. **Story-Driven Organization**: Grouped strictly by semantic concerns (`header`, `body`, `footer`).

---

## 📄 License

MIT © [KeshavSoft](https://github.com/keshavsoft)

# dom-traversal-functions

<p align="left">
  <img src="https://img.shields.io/badge/version-1.3.0-blue.svg" alt="Version 1.3.0" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/dependencies-dom--primitive--engine-brightgreen.svg" alt="Powered by dom-primitive-engine" />
  <img src="https://img.shields.io/badge/module-ESM%20%2B%20Global%20ks-orange.svg" alt="ES Modules & Global ks" />
</p>

> **Standardized, instruction-driven DOM traversal and data extraction utilities for table component architectures.**

Extracting rows, reading input values, and navigating table structures in application handlers leads to brittle, tangled DOM code. `dom-traversal-functions` isolates all DOM querying mechanics into granular, single-responsibility functions organized strictly around the **3-part narrative story of the table control**.

In **V3**, every traversal operation is powered by declarative `instructions.json` executed through `dom-primitive-engine`.

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
• instructions.json        • getRowIndex              • clearRowInputs
                           • highlightRow             • instructions.json
                           • getRowData
                           • instructions.json
```

---

## 🚀 Quick Start

### 1. Modern ESM Import
```javascript
import { table } from "dom-traversal-functions";

// 1. Header: Extract search query from input or event
const query = table.header.getSearchQuery(searchInput);

// 2. Body: Extract row data or highlight selected row
const rowData = table.body.getRowData(clickedElement, { columns });
table.body.highlightRow(rowElement, "table-primary");

// 3. Footer: Extract inputs from footer row & clear inputs
const newRecord = table.footer.getFooterData(saveButton, columns);
table.footer.clearRowInputs(saveButton);
```

### 2. Global Script (Zero-Import Workflow)
Load the bundle via CDN or script tag:
```html
<script src="https://cdn.jsdelivr.net/npm/dom-traversal-functions/docs/dist/v3/min.js"></script>
```

It automatically registers on `window.ks.domTraversal.table`:
```javascript
const { header, body, footer } = ks.domTraversal.table;
```

---

## 🧩 Declarative Traversal (`instructions.json`)

Each semantic area exports its own serializable `instructions.json` recipe executed by `dom-primitive-engine`:

```javascript
import { table } from "dom-traversal-functions";

// Inspect or reuse the declarative JSON traversal recipes:
console.log(table.header.instructions);
console.log(table.body.instructions);
console.log(table.footer.instructions);
```

### Example: Body Traversal (`src/v3/table/body/instructions.json`)
```json
[
  {
    "narration": "Find closest body table row",
    "sourcePath": { "fileName": "root" },
    "func": "closest",
    "arguments": { "selector": "tr" }
  },
  {
    "narration": "Collect all data cells from row",
    "sourcePath": { "fileName": "previous" },
    "func": "querySelectorAll",
    "arguments": { "selector": "td" }
  },
  {
    "narration": "Map collected cell values to columns using clientData",
    "sourcePath": { "fileName": "previous" },
    "func": "mapValues",
    "arguments": { "read": "text" }
  }
]
```

---

## 📦 Companion Ecosystem

- [**json-renderers-build-table**](https://github.com/keshavsoft/json-renderers-build-table): Pure declarative table rendering.
- [**json-renderers-build-table-events**](https://github.com/keshavsoft/json-renderers-build-table-events): High-level table interactivity and event orchestration.
- [**dom-primitive-engine**](https://github.com/keshavsoft/dom-primitive-engine): The underlying declarative JSON instruction execution engine.

---

## License

MIT &copy; [KeshavSoft](https://github.com/keshavsoft)

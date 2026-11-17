import registerGlobal from "./registerGlobal/index.js";
import table from "./table/index.js";

export * as table from "./table/index.js";

registerGlobal(table);

export default {
    table
};

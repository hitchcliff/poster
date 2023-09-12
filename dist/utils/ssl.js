"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssl = void 0;
const constants_1 = require("./constants");
const ssl = () => {
    return constants_1.isProd ? (process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0") : null;
};
exports.ssl = ssl;
//# sourceMappingURL=ssl.js.map
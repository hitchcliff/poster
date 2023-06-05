"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameFile = void 0;
const uuid_1 = require("uuid");
const RenameFile = (filename) => {
    const name = new Date().getTime() + "-" + (0, uuid_1.v4)() + "_" + filename;
    return name.toLowerCase().replace(/\s+/g, `-`);
};
exports.RenameFile = RenameFile;
//# sourceMappingURL=RenameFile.js.map
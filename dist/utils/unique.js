"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = void 0;
const unique = (code, detail) => {
    const errors = [];
    if (code === "23505" || detail.includes("already exists.")) {
        errors.push({
            field: "username",
            message: "username already exists",
        });
    }
    return errors;
};
exports.unique = unique;
//# sourceMappingURL=unique.js.map
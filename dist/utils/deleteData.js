"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = void 0;
const Like_1 = __importDefault(require("../entities/Like"));
const deleteData = async () => {
    await Like_1.default.delete({});
};
exports.deleteData = deleteData;
//# sourceMappingURL=deleteData.js.map
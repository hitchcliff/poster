"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const getUser = async ({ id }) => {
    const post = await User_1.default.findOne({
        where: {
            id,
        },
    });
    return post;
};
exports.default = getUser;
//# sourceMappingURL=getUser.js.map
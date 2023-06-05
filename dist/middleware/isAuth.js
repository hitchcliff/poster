"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../entities/User"));
const isAuth = async ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }
    const user = await User_1.default.findOne({
        where: {
            id: context.req.session.userId,
        },
    });
    if (!user) {
        throw new Error("no user found");
    }
    return next();
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map
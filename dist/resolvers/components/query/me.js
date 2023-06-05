"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
async function MeQuery({ req }) {
    if (!req.session.userId)
        return null;
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
        relations: {
            posts: true,
            photo: true,
        },
    });
    return user;
}
exports.default = MeQuery;
//# sourceMappingURL=me.js.map
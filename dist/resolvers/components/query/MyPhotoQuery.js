"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
async function MyPhotoQuery({ req }) {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!(user === null || user === void 0 ? void 0 : user.photo)) {
        return null;
    }
    return user.photo;
}
exports.default = MyPhotoQuery;
//# sourceMappingURL=MyPhotoQuery.js.map
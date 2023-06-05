"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = __importDefault(require("../../../entities/Photo"));
const User_1 = __importDefault(require("../../../entities/User"));
async function MyPhotoQuery({ req }) {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    const photo = await Photo_1.default.findOne({
        where: {
            id: user === null || user === void 0 ? void 0 : user.photoId,
        },
        relations: {
            user: true,
        },
    });
    if (!photo) {
        return null;
    }
    return photo;
}
exports.default = MyPhotoQuery;
//# sourceMappingURL=MyPhotoQuery.js.map
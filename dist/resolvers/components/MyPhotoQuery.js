"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = __importDefault(require("../../entities/Photo"));
async function MyPhotoQuery(id) {
    const photo = await Photo_1.default.findOne({
        where: {
            id,
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
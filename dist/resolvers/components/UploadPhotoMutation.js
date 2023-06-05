"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const Photo_1 = __importDefault(require("../../entities/Photo"));
const User_1 = __importDefault(require("../../entities/User"));
async function UploadPhotoMutation(options, { req }) {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!user) {
        throw new Error("no user found");
    }
    if (user.photoId) {
        const photo = await Photo_1.default.findOne({
            where: {
                id: user.photoId,
            },
        });
        if (!photo)
            return {
                error: {
                    message: "there is something wrong in the backend",
                },
            };
        const { url, signedRequest } = await (0, utils_1.s3)({
            ...options,
            foldername: "profile-picture",
        });
        photo.src = url;
        await photo.save();
        user.photo = photo;
        await user.save();
        return {
            photo,
            signedRequest,
        };
    }
    const { url, signedRequest } = await (0, utils_1.s3)({
        ...options,
        foldername: process.env.PROFILE_PICTURES,
    });
    const photo = new Photo_1.default();
    photo.src = url;
    await photo.save();
    user.photo = photo;
    await user.save();
    return {
        photo,
        signedRequest,
    };
}
exports.default = UploadPhotoMutation;
//# sourceMappingURL=UploadPhotoMutation.js.map
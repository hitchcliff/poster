"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const Photo_1 = __importDefault(require("../../../entities/Photo"));
const User_1 = __importDefault(require("../../../entities/User"));
const UploadPhotoMutation = async (options, { req }) => {
    if (!req.session.userId)
        return null;
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!user) {
        throw new Error("no user found");
    }
    if (user.photo) {
        if (!user.photo)
            return {
                error: {
                    message: "there is something wrong in the backend",
                },
            };
        const { url, signedRequest } = await (0, utils_1.s3)({
            ...options,
            foldername: process.env.PROFILE_PICTURES,
        });
        user.photo.src = url;
        await user.photo.save();
        await user.save();
        return {
            photo: user.photo,
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
};
exports.default = UploadPhotoMutation;
//# sourceMappingURL=UploadPhotoMutation.js.map
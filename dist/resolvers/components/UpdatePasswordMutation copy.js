"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../entities/User"));
const argon2_1 = __importDefault(require("argon2"));
const UpdatePasswordMutation = async (options, { req }) => {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!user)
        return {
            errors: [
                {
                    message: "can't find user",
                },
            ],
        };
    const newPasswordMatch = await argon2_1.default.verify(user.password, options.newPassword);
    if (newPasswordMatch) {
        return {
            errors: [
                {
                    field: "newPassword",
                    message: "new password is the same",
                },
            ],
        };
    }
    if (options.confirmPassword !== options.newPassword) {
        return {
            errors: [
                {
                    field: "newPassword",
                    message: "new password does not match",
                },
                {
                    field: "confirmPassword",
                    message: "confirm password does not match",
                },
            ],
        };
    }
    const newPassword = await argon2_1.default.hash(options.newPassword);
    user.password = newPassword;
    user.save();
    return {
        user,
    };
};
exports.default = UpdatePasswordMutation;
//# sourceMappingURL=UpdatePasswordMutation%20copy.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UpdatePasswordMutation = async (options, { req }) => {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!user) {
        throw new Error("no user found");
    }
    const newPasswordMatch = await bcrypt_1.default.compare(options.newPassword, user.password);
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
    const newPassword = await bcrypt_1.default.hash(options.newPassword);
    user.password = newPassword;
    user.save();
    return {
        user,
    };
};
exports.default = UpdatePasswordMutation;
//# sourceMappingURL=UpdatePasswordMutation.js.map
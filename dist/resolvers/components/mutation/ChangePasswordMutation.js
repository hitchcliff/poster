"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const constants_1 = require("../../../utils/constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ChangePasswordMutation = async (options, { redis, req }) => {
    if (options.newPassword.length <= 3) {
        return {
            errors: [
                {
                    field: "newPassword",
                    message: "password is too short",
                },
            ],
        };
    }
    const key = constants_1.FORGET_PASSWORD_PREFIX + options.token;
    const userId = await redis.get(key);
    if (!userId) {
        return {
            errors: [
                {
                    field: "newPassword",
                    message: "token expired",
                },
            ],
        };
    }
    const user = await User_1.default.findOne({
        where: {
            id: parseInt(userId),
        },
    });
    if (!user) {
        return {
            errors: [
                {
                    field: "newPassword",
                    message: "user doesn't exists",
                },
            ],
        };
    }
    user.password = await bcrypt_1.default.hash(options.newPassword);
    user.save();
    req.session.userId = userId;
    await redis.del(key);
    return {
        user,
    };
};
exports.default = ChangePasswordMutation;
//# sourceMappingURL=ChangePasswordMutation.js.map
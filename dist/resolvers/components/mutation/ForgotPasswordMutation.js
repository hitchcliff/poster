"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const uuid_1 = require("uuid");
const constants_1 = require("../../../utils/constants");
const utils_1 = require("../../../utils");
const ForgotPasswordMutation = async (email, { redis }) => {
    const user = await User_1.default.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        return false;
    }
    const token = (0, uuid_1.v4)();
    await redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, "EX", 1000 * 60 * 60 * 24 * 3);
    const body = `
    <a href="${constants_1.BASE_URL}/change-password/${token}" rel="noreferrer" target="_blank">Click here</a>
    `;
    await (0, utils_1.sendEmail)({ email, html: body });
    return true;
};
exports.default = ForgotPasswordMutation;
//# sourceMappingURL=ForgotPasswordMutation.js.map
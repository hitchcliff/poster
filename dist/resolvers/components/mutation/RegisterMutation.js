"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const utils_1 = require("../../../utils");
const argon2_1 = __importDefault(require("argon2"));
const RegisterMutation = async (options, { req }) => {
    const errors = (0, utils_1.validation)(options);
    if (errors.length) {
        return {
            errors,
        };
    }
    const emailIsTaken = await User_1.default.findOne({
        where: {
            email: options.email,
        },
    });
    if (emailIsTaken) {
        return {
            errors: [
                {
                    field: "email",
                    message: "email already exists",
                },
            ],
        };
    }
    const hashedPassword = await argon2_1.default.hash(options.password);
    const user = new User_1.default();
    try {
        user.username = options.username;
        user.email = options.email;
        user.password = hashedPassword;
        await user.save();
        return {
            user,
        };
    }
    catch (error) {
        const usernameError = (0, utils_1.unique)(error.code, error.detail);
        if (usernameError.length) {
            return {
                errors: usernameError,
            };
        }
    }
    req.session.userId = user.id;
    return {
        user,
    };
};
exports.default = RegisterMutation;
//# sourceMappingURL=RegisterMutation.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LoginMutation = async (options, { req }) => {
    const user = await User_1.default.findOne({
        where: {
            username: options.username,
        },
    });
    if (!user) {
        return {
            errors: [
                {
                    field: "username",
                    message: "username doesn't exists",
                },
            ],
        };
    }
    const verified = await bcrypt_1.default.compare(options.password, user.password);
    if (!verified) {
        return {
            errors: [
                {
                    field: "password",
                    message: "wrong password",
                },
            ],
        };
    }
    req.session.userId = user.id;
    return {
        user,
    };
};
exports.default = LoginMutation;
//# sourceMappingURL=LoginMutation.js.map
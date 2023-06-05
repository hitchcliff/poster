"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../entities/User"));
const UpdateUserProfileMutation = async (options, { req }) => {
    const user = await User_1.default.findOne({
        where: {
            id: req.session.userId,
        },
    });
    if (!user) {
        throw new Error("not authenticated");
    }
    if (options.firstName.length <= 3) {
        return {
            errors: [
                {
                    field: "firstName",
                    message: "must be length greater than 3",
                },
            ],
        };
    }
    if (options.lastName.length <= 3) {
        return {
            errors: [
                {
                    field: "lastName",
                    message: "must be length greater than 3",
                },
            ],
        };
    }
    user.firstName = options.firstName;
    user.lastName = options.lastName;
    user.save();
    return {
        user,
    };
};
exports.default = UpdateUserProfileMutation;
//# sourceMappingURL=UpdateUserProfileMutation.js.map
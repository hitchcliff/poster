"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("src/entities/Post"));
const hasPost = async ({ id }) => {
    const post = await Post_1.default.findOne({
        where: {
            id,
        },
    });
    return post ? true : false;
};
exports.default = hasPost;
//# sourceMappingURL=hasPost.js.map
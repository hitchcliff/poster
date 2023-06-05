"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../entities/Post"));
const getPost = async ({ id }) => {
    const post = await Post_1.default.findOne({
        where: {
            id,
        },
    });
    return post;
};
exports.default = getPost;
//# sourceMappingURL=getPost%20copy.js.map
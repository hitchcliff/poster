"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../entities/Post"));
const type_graphql_1 = require("type-graphql");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const User_1 = __importDefault(require("../entities/User"));
let PostInput = class PostInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostInput.prototype, "body", void 0);
PostInput = __decorate([
    (0, type_graphql_1.InputType)()
], PostInput);
let PostResolver = class PostResolver {
    async posts(take, skip) {
        const posts = await Post_1.default.find({
            relations: {
                user: true,
                likes: true,
            },
            order: {
                id: "DESC",
            },
            take,
            skip,
        });
        return posts;
    }
    async post(id) {
        return await Post_1.default.findOne({
            relations: {
                user: true,
                likes: true,
            },
            where: { id },
        });
    }
    async createPost(input, { req }) {
        const user = await User_1.default.findOne({
            where: {
                id: req.session.userId,
            },
        });
        if (!user) {
            return null;
        }
        const post = await Post_1.default.save({
            body: input.body,
            user,
        });
        return post;
    }
    async deletePost(id) {
        const post = await Post_1.default.findOne({ where: { id } });
        if (!post) {
            return false;
        }
        await (post === null || post === void 0 ? void 0 : post.remove());
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Post_1.default]),
    __param(0, (0, type_graphql_1.Arg)("take", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Post_1.default),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Post_1.default),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)(Post_1.default)
], PostResolver);
exports.default = PostResolver;
//# sourceMappingURL=post.js.map
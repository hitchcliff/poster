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
const type_graphql_1 = require("type-graphql");
const Like_1 = __importDefault(require("../entities/Like"));
const user_1 = require("./user");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const getPost_1 = __importDefault(require("../utils/getPost"));
const getUser_1 = __importDefault(require("../utils/getUser"));
let LikeError = class LikeError {
};
LikeError = __decorate([
    (0, type_graphql_1.ObjectType)()
], LikeError);
let LikeResponse = class LikeResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => Like_1.default, { nullable: true }),
    __metadata("design:type", Like_1.default)
], LikeResponse.prototype, "like", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [user_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LikeResponse.prototype, "errors", void 0);
LikeResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LikeResponse);
let LikeResolver = class LikeResolver {
    async getLikes() {
        return await Like_1.default.find();
    }
    async like(postId, { req }) {
        const user = await (0, getUser_1.default)({ id: req.session.userId });
        const post = await (0, getPost_1.default)({ id: postId });
        if (!post) {
            return {
                errors: [
                    {
                        message: "there is no post with id: " + postId,
                    },
                ],
            };
        }
        if (!user) {
            return {
                errors: [
                    {
                        message: "no user found",
                    },
                ],
            };
        }
        const like = await Like_1.default.findOne({
            where: {
                postId,
            },
        });
        if (!like) {
            const addLike = await Like_1.default.save({
                value: 1,
                postId,
                users: [user],
            });
            return {
                like: addLike,
            };
        }
        if (like.users.find((user) => user.id === req.session.userId)) {
            return {
                errors: [
                    {
                        message: "already liked this post",
                    },
                ],
            };
        }
        like.value += 1;
        like.users = [user, ...like.users];
        await like.save();
        return {
            like,
        };
    }
    async dislike(postId, { req }) {
        const post = await (0, getPost_1.default)({ id: postId });
        if (!post) {
            return {
                errors: [
                    {
                        message: "there is no post with id: " + postId,
                    },
                ],
            };
        }
        const like = await Like_1.default.findOne({
            where: {
                postId,
            },
        });
        if (!(like === null || like === void 0 ? void 0 : like.users.find((user) => user.id === req.session.userId))) {
            return {
                errors: [
                    {
                        message: "cannot dislike the post if not liked",
                    },
                ],
            };
        }
        if (like.value <= 0) {
            return {
                errors: [
                    {
                        message: "can't decrement further, currently has 0 likes",
                    },
                ],
            };
        }
        like.value -= 1;
        like.users = like.users.filter((user) => user.id !== req.session.userId);
        await like.save();
        return {
            like,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Like_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "getLikes", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    (0, type_graphql_1.Mutation)(() => LikeResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("postId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "like", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    (0, type_graphql_1.Mutation)(() => LikeResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("postId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "dislike", null);
LikeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], LikeResolver);
exports.default = LikeResolver;
//# sourceMappingURL=like.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Post_1 = __importDefault(require("./Post"));
const User_1 = __importDefault(require("./User"));
let Like = class Like extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Like.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 0 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Like.prototype, "value", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Post_1.default, { nullable: true }),
    (0, typeorm_1.OneToOne)(() => Post_1.default, (post) => post.likes, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Post_1.default)
], Like.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Like.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.default], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => User_1.default, (user) => user.likes, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Like.prototype, "users", void 0);
Like = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)("like")
], Like);
exports.default = Like;
//# sourceMappingURL=Like.js.map
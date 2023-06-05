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
exports.UploadImgInput = exports.UploadPhotoResponse = exports.PhotoError = void 0;
const type_graphql_1 = require("type-graphql");
const Photo_1 = __importDefault(require("../entities/Photo"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const mutation_1 = require("./components/mutation");
const query_1 = require("./components/query");
let PhotoError = class PhotoError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PhotoError.prototype, "message", void 0);
PhotoError = __decorate([
    (0, type_graphql_1.ObjectType)()
], PhotoError);
exports.PhotoError = PhotoError;
let UploadPhotoResponse = class UploadPhotoResponse {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", PhotoError)
], UploadPhotoResponse.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Photo_1.default)
], UploadPhotoResponse.prototype, "photo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UploadPhotoResponse.prototype, "signedRequest", void 0);
UploadPhotoResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UploadPhotoResponse);
exports.UploadPhotoResponse = UploadPhotoResponse;
let UploadImgInput = class UploadImgInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UploadImgInput.prototype, "filename", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UploadImgInput.prototype, "type", void 0);
UploadImgInput = __decorate([
    (0, type_graphql_1.InputType)()
], UploadImgInput);
exports.UploadImgInput = UploadImgInput;
let PhotoResolver = class PhotoResolver {
    async myPhoto(ctx) {
        return (0, query_1.MyPhotoQuery)(ctx);
    }
    async photo(id) {
        return await Photo_1.default.findOne({ where: { id } });
    }
    async uploadPhoto(options, ctx) {
        return (0, mutation_1.UploadPhotoMutation)(options, ctx);
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    (0, type_graphql_1.Query)(() => Photo_1.default, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "myPhoto", null);
__decorate([
    (0, type_graphql_1.Query)(() => Photo_1.default, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "photo", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    (0, type_graphql_1.Mutation)(() => UploadPhotoResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UploadImgInput, Object]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "uploadPhoto", null);
PhotoResolver = __decorate([
    (0, type_graphql_1.Resolver)(Photo_1.default)
], PhotoResolver);
exports.default = PhotoResolver;
//# sourceMappingURL=photo.js.map
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
const graphql_upload_ts_1 = require("graphql-upload-ts");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const type_graphql_1 = require("type-graphql");
let UploadResolver = class UploadResolver {
    async uploadImg(file) {
        return true;
    }
};
__decorate([
    (0, type_graphql_1.UseMiddleware)(isAuth_1.default),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("file", () => graphql_upload_ts_1.GraphQLUpload)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [graphql_upload_ts_1.Upload]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadImg", null);
UploadResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UploadResolver);
exports.default = UploadResolver;
//# sourceMappingURL=upload.js.map
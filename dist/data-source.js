"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.options = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Photo_1 = __importDefault(require("./entities/Photo"));
const Post_1 = __importDefault(require("./entities/Post"));
const Like_1 = __importDefault(require("./entities/Like"));
const User_1 = __importDefault(require("./entities/User"));
exports.options = {
    type: "postgres",
    url: process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : "postgresql://postgres:postgres@localhost:5432/poster",
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: [Post_1.default, User_1.default, Photo_1.default, Like_1.default],
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.options);
//# sourceMappingURL=data-source.js.map
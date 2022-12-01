"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.options = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
exports.options = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "poster",
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: [Post_1.Post],
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.options);
//# sourceMappingURL=data-source.js.map
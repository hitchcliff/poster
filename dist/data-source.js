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
require("dotenv-safe/config");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
exports.options = {
    type: "postgres",
    url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/poster?sslmode=true`,
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: [Post_1.default, User_1.default, Photo_1.default, Like_1.default],
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.options);
//# sourceMappingURL=data-source.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "poster",
    synchronize: true,
    logging: true,
    entities: [Post_1.Post],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map
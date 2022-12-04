"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const hello_1 = __importDefault(require("./resolvers/hello"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const post_1 = __importDefault(require("./resolvers/post"));
const main = async () => {
    const app = (0, express_1.default)();
    await data_source_1.AppDataSource.initialize();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.default, post_1.default],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: ["https://studio.apollographql.com"],
            credentials: true,
        },
    });
    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=server.js.map
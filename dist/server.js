"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const default_1 = require("@apollo/server/plugin/landingPage/default");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = __importDefault(require("./resolvers/hello"));
const post_1 = __importDefault(require("./resolvers/post"));
const user_1 = __importDefault(require("./resolvers/user"));
const constants_1 = require("./utils/constants");
const photo_1 = __importDefault(require("./resolvers/photo"));
const like_1 = __importDefault(require("./resolvers/like"));
require("dotenv-safe/config");
require("dotenv").config({
    path: __dirname + "/.env",
    allowEmptyValues: true,
});
const main = async () => {
    console.log(process.env.PORT);
    await data_source_1.AppDataSource.initialize();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: process.env.NODE_ENV !== "production",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            domain: process.env.NODE_ENV === "production" ? ".poster.asia" : undefined,
        },
    }));
    let plugins = [];
    if (process.env.NODE_ENV === "production") {
        plugins = [
            (0, default_1.ApolloServerPluginLandingPageProductionDefault)({
                embed: true,
                graphRef: "myGraph@prod",
                includeCookies: true,
                headers: {
                    "Access-Control-Allow-Origin": "https://studio.apollographql.com",
                    "Access-Control-Allow-Credentials": "true",
                },
            }),
        ];
    }
    else {
        plugins = [
            (0, default_1.ApolloServerPluginLandingPageLocalDefault)({
                embed: true,
                includeCookies: true,
            }),
        ];
    }
    const apolloServer = new apollo_server_express_1.ApolloServer({
        csrfPrevention: true,
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                hello_1.default,
                post_1.default,
                user_1.default,
                photo_1.default,
                like_1.default,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
        plugins,
        introspection: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: [
                "*",
                "https://studio.apollographql.com",
                "http://localhost:3000",
                "https://www.poster.asia",
                "https://poster.asia",
            ],
            credentials: true,
        },
    });
    const PORT = parseInt(process.env.PORT);
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=server.js.map
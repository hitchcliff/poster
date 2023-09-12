// @ts-ignore
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { Context } from "./types";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import HelloResolver from "./resolvers/hello";
import PostResolver from "./resolvers/post";
import UserResolver from "./resolvers/user";
import { COOKIE_NAME, isProd } from "./utils/constants";
import PhotoResolver from "./resolvers/photo";
import LikeResolver from "./resolvers/like";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
  // @ts-ignore
} from "@apollo/server/plugin/landingPage/default";

import "dotenv/config";

const main = async () => {
  // Database
  await AppDataSource.initialize();

  // Run Server
  const app = express();

  // Session
  const RedisStore = connectRedis(session);
  // const redis = new Redis(process.env.REDIS_URL as string);
  const redis = new Redis("redis://127.0.0.1:6379");

  app.set("trust proxy", 1);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.REDIS_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: process.env.NODE_ENV !== "production",
        sameSite: "lax", // csrf
        secure: process.env.NODE_ENV === "production", //https
        domain:
          process.env.NODE_ENV === "production" ? ".poster.asia" : undefined,
      },
    })
  );

  // Apollo Recommended Plugin
  // Works for Cookie in studio
  let plugins: any = [];
  if (process.env.NODE_ENV === "production") {
    plugins = [
      ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: "myGraph@prod",
        includeCookies: true,
        headers: {
          "Access-Control-Allow-Origin": "https://studio.apollographql.com",
          "Access-Control-Allow-Credentials": "true",
        },
      }),
    ];
  } else {
    plugins = [
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
        includeCookies: true,
      }),
    ];
  }

  // Apollo
  const apolloServer = new ApolloServer({
    csrfPrevention: true,
    cache: "bounded",
    persistedQueries: false,
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver,
        PhotoResolver,
        LikeResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
      redis,
    }),
    plugins,
    introspection: true,
  });

  await apolloServer.start();

  // runs the middleware
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

  // Run server
  const PORT = parseInt(process.env.PORT as string);
  app.listen(PORT, () => {
    console.log(
      `Listening at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });

  console.log("Is Production: ", isProd);
};

main().catch((err) => {
  console.error(err);
  console.log(err.code);
});

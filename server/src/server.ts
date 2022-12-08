import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { Context } from "./types";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import HelloResolver from "./resolvers/hello";
import PostResolver from "./resolvers/post";
import UserResolver from "./resolvers/user";
import { COOKIE_NAME } from "./utils/constants";

const main = async () => {
  // Database
  await AppDataSource.initialize();

  // Run Server
  const app = express();

  // Session
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: "SECRET",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: process.env.NODE_ENV === "production", //https
      },
    })
  );

  // Apollo Recommended Plugin
  let plugins: any = [];
  if (process.env.NODE_ENV === "production") {
    plugins = [
      ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: "myGraph@prod",
        includeCookies: true,
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
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
    }),
    plugins,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ["https://studio.apollographql.com/", "http://localhost:3000"],
      credentials: true,
    },
  });

  // Run server
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(
      `Listening at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});

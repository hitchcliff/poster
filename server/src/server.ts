import "reflect-metadata";
import { AppDataSource } from "./data-source";
import express from "express";
import HelloResolver from "./resolvers/hello";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import PostResolver from "./resolvers/post";

const main = async () => {
  // Run Server
  const app = express();

  // Database
  await AppDataSource.initialize();

  // Apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
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

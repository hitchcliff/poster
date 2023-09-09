import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import Photo from "./entities/Photo";
import Post from "./entities/Post";
import Like from "./entities/Like";
import User from "./entities/User";
// import { isProd } from "./utils/constants";
import "dotenv-safe/config";

// temporary reject ssl
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const options = {
  type: "postgres",
  url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/poster?sslmode=true`,
  synchronize: true,
  logging: true,
  subscribers: [],
  entities: [Post, User, Photo, Like],
  migrations: [path.join(__dirname, "./migrations/*")],
} as DataSourceOptions;

export const AppDataSource = new DataSource(options);

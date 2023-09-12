import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import Photo from "./entities/Photo";
import Post from "./entities/Post";
import Like from "./entities/Like";
import User from "./entities/User";
// import { isProd } from "./utils/constants";
import "dotenv/config";

// reject ssl on production when requesting to db
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const options = {
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  subscribers: [],
  entities: [Post, User, Photo, Like],
  migrations: [path.join(__dirname, "./migrations/*")],
} as DataSourceOptions;

export const AppDataSource = new DataSource(options);

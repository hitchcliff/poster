import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import Post from "./entities/Post";
import User from "./entities/User";

export const options = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "poster",
  synchronize: true,
  logging: true,
  subscribers: [],
  entities: [Post, User],
  migrations: [path.join(__dirname, "./migrations/*")],
} as DataSourceOptions;

export const AppDataSource = new DataSource(options);

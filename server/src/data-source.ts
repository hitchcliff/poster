import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "poster",
  synchronize: true,
  logging: true,
  entities: [Post],
  subscribers: [],
  migrations: [],
});

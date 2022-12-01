import "reflect-metadata";
import { AppDataSource } from "./data-source";

const main = async () => {
  await AppDataSource.initialize();
};

main().catch((err) => {
  console.error(err);
});

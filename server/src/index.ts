import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Post } from "./entities/Post";

const main = async () => {
  await AppDataSource.initialize();

  const post = new Post();
  post.title = "my second post";
  post.body = "my second body";

  await post.save();
  console.log("Post has been saved", post.id);
};

main().catch((err) => {
  console.error(err);
});

import Post from "../entities/Post";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import isAuth from "../middleware/isAuth";

@InputType()
class PostInput {
  @Field()
  body: string;
}

@Resolver(Post)
class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await Post.find();
  }

  @Query(() => Post)
  async post(@Arg("id", () => Int) id: number): Promise<Post | null> {
    return await Post.findOne({ where: { id } });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(@Arg("input") input: PostInput): Promise<Post> {
    const post = await Post.save({
      body: input.body,
    });

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => Int) id: number): Promise<boolean> {
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return false;
    }

    await post?.remove();

    return true;
  }
}

export default PostResolver;

import Post from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import isAuth from "../middleware/isAuth";
import { Context } from "../types";
import User from "../entities/User";

@InputType()
class PostInput {
  @Field()
  body: string;
}

@Resolver(Post)
class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number
  ): Promise<Post[]> {
    const posts = await Post.find({
      relations: {
        user: true,
        likes: true,
      },
      order: {
        id: "DESC",
      },
      take,
      skip,
    });

    return posts;
  }

  @Query(() => Post)
  async post(@Arg("id", () => Int) id: number): Promise<Post | null> {
    return await Post.findOne({
      relations: {
        user: true,
        likes: true,
      },
      where: { id },
    });
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: Context
  ): Promise<Post | null> {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return null;
    }

    const post = await Post.save({
      body: input.body,
      user,
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

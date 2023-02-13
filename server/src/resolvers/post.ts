import Post from "../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import isAuth from "../middleware/isAuth";
import { Context } from "../types";
import User from "../entities/User";
import { PaginatedPostQuery } from "./components/query";

@ObjectType()
class PostDetails {
  @Field()
  id: string;
  @Field()
  body: string;
  @Field()
  updatedAt: string;
}

@ObjectType()
class Poster {
  @Field()
  id: number;
  @Field()
  verified: boolean;
  @Field()
  username: string;
  @Field()
  fullName: string;
  @Field({ nullable: true })
  profileImg?: string;
}

@ObjectType()
export class PaginatedPostResponse {
  @Field()
  id: number;

  @Field()
  poster: Poster;

  @Field()
  postDetails: PostDetails;
}

@InputType()
export class PaginatedPostInput {
  @Field()
  offset: number;
  @Field()
  limit: number;
}

@InputType()
class PostInput {
  @Field()
  body: string;
}

@Resolver(Post)
class PostResolver {
  @Query(() => [PaginatedPostResponse], { nullable: true })
  async paginatedPosts(
    @Arg("options") options: PaginatedPostInput
  ): Promise<PaginatedPostResponse[] | null> {
    return await PaginatedPostQuery(options);
  }

  @Query(() => [Post])
  async posts(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number
  ): Promise<Post[]> {
    const posts = await Post.find({
      relations: {
        user: true,
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
    return await Post.findOne({ where: { id } });
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

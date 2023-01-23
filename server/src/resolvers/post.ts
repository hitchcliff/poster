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
import { AppDataSource } from "../data-source";

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
  username: string;
  @Field()
  fullName: string;
  @Field()
  profileImg: string;
}

@ObjectType()
class PaginatedPostResponse {
  @Field()
  poster: Poster;

  @Field()
  postDetails: PostDetails;
}

@InputType()
class PaginatedPostInput {
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
    // 2 offset x 3 limit = 6 offset

    const sql = `
        SELECT public.user.id   AS "userId"
              ,public.user.username
              ,CONCAT(public.user."firstName" ,public.user."lastName") as "fullName"
              ,public.post.id   AS "postId"
              ,public.post.body
              ,public.post."updatedAt"
              ,public.photo.src AS "profileImg"
        FROM public.post
        INNER JOIN public.user
        ON public.post."userId" = public.user.id
        INNER JOIN public.photo
        ON public.user."photoId" = public.photo.id
        ORDER BY "updatedAt" desc offset ${options.offset} rows fetch next ${options.limit} rows only
    `;

    const data = await AppDataSource.createQueryRunner().query(sql);
    const formattedData: PaginatedPostResponse[] = [];

    data.map((item: any) => {
      formattedData.push({
        postDetails: {
          id: item.postId,
          body: item.body,
          updatedAt: item.updatedAt,
        },
        poster: {
          id: item.userId,
          username: item.username,
          fullName: item.fullName,
          profileImg: item.profileImg,
        },
      });
    });

    return formattedData;
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

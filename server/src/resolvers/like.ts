import { Context } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Like from "../entities/Like";
import { FieldError } from "./user";
import isAuth from "../middleware/isAuth";
import getPost from "../utils/getPost";
import getUser from "../utils/getUser";

@ObjectType()
class LikeError {
  message: string;
}

@ObjectType()
class LikeResponse {
  @Field(() => Like, { nullable: true })
  like?: Like;
  @Field(() => [FieldError], { nullable: true })
  errors?: LikeError[];
}

@Resolver()
class LikeResolver {
  @Query(() => [Like])
  async getLikes(): Promise<Like[]> {
    return await Like.find();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse, { nullable: true })
  async like(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: Context
  ): Promise<LikeResponse> {
    const user = await getUser({ id: req.session.userId });
    const post = await getPost({ id: postId }); // gets the post

    if (!post) {
      return {
        errors: [
          {
            message: "there is no post with id: " + postId,
          },
        ],
      };
    }

    if (!user) {
      return {
        errors: [
          {
            message: "no user found",
          },
        ],
      };
    }

    // find the post
    const like = await Like.findOne({
      where: {
        postId,
      },
    });

    // no like yet
    // add 1 like to post
    if (!like) {
      const addLike = await Like.save({
        value: 1,
        postId,
        users: [user],
      });

      return {
        like: addLike,
      };
    }

    // if user already liked the post
    if (like.users.find((user) => user.id === req.session.userId)) {
      return {
        errors: [
          {
            message: "already liked this post",
          },
        ],
      };
    }

    // increments
    like.value += 1;
    like.users = [user, ...like.users];

    await like.save();

    return {
      like,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse, { nullable: true })
  async dislike(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: Context
  ): Promise<LikeResponse> {
    const post = await getPost({ id: postId }); // gets the post

    if (!post) {
      return {
        errors: [
          {
            message: "there is no post with id: " + postId,
          },
        ],
      };
    }

    // find the like by a user
    const like = await Like.findOne({
      where: {
        postId,
      },
    });

    if (!like?.users.find((user) => user.id === req.session.userId)) {
      return {
        errors: [
          {
            message: "cannot dislike the post if not liked",
          },
        ],
      };
    }

    // decrement
    if (like.value <= 0) {
      return {
        errors: [
          {
            message: "can't decrement further, currently has 0 likes",
          },
        ],
      };
    }

    like.value -= 1;
    like.users = like.users.filter((user) => user.id !== req.session.userId);
    await like.save();

    return {
      like,
    };
  }
}

export default LikeResolver;

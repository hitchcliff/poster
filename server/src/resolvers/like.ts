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

    const userId = req.session.userId;

    // find the post
    const like = await Like.findOne({
      where: {
        postId,
      },
    });

    // no like yet
    // add one like to post
    if (!like) {
      const addLike = new Like();
      addLike.value = 1;
      addLike.postId = postId;
      addLike.userId = userId;
      await addLike.save();

      return {
        like: addLike,
      };
    }

    // simply increments
    like.value += 1;
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

    const userId = req.session.userId;

    // find the post
    const like = await Like.findOne({
      where: {
        postId,
      },
    });

    // no like yet
    // set value to default
    if (!like) {
      const addLike = new Like();
      addLike.value = 0;
      addLike.postId = postId;
      addLike.userId = userId;
      await addLike.save();

      return {
        like: addLike,
      };
    }

    // decrement
    if (like.value <= 0) {
      return {
        errors: [
          {
            message: "currently has 0",
          },
        ],
      };
    }

    like.value -= 1;
    await like.save();

    return {
      like,
    };
  }
}

export default LikeResolver;

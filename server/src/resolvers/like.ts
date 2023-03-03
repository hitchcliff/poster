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
} from "type-graphql";
import Like from "../entities/Like";
import { FieldError } from "./user";

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

  @Mutation(() => Like, { nullable: true })
  async like(
    @Arg("postId", () => Int) postId: number,
    @Ctx() {}: Context
  ): Promise<Like> {
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

      return await addLike.save();
    }

    // simply increments
    like.value += 1;
    return await like.save();
  }

  @Mutation(() => LikeResponse, { nullable: true })
  async dislike(
    @Arg("postId", () => Int) postId: number,
    @Ctx() {}: Context
  ): Promise<LikeResponse> {
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

import { Context } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import Post from "../entities/Post";
import Like from "../entities/Like";

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
}

export default LikeResolver;

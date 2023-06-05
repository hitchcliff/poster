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
import Photo from "../entities/Photo";
import isAuth from "../middleware/isAuth";
import { Context } from "../types";
import { UploadPhotoMutation } from "./components/mutation";
import { MyPhotoQuery } from "./components/query";

@ObjectType()
export class PhotoError {
  @Field()
  message: string;
}

@ObjectType()
export class UploadPhotoResponse {
  @Field({ nullable: true })
  error?: PhotoError;

  @Field({ nullable: true })
  photo?: Photo;

  @Field()
  signedRequest?: string;
}

@InputType()
export class UploadImgInput {
  @Field()
  filename: string;
  @Field()
  type: string;
}

@Resolver(Photo)
class PhotoResolver {
  @UseMiddleware(isAuth)
  @Query(() => Photo, { nullable: true })
  async myPhoto(@Ctx() ctx: Context): Promise<Photo | null> {
    return MyPhotoQuery(ctx);
  }

  @Query(() => Photo, { nullable: true })
  async photo(@Arg("id", () => Int) id: number): Promise<Photo | null> {
    return await Photo.findOne({ where: { id } });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UploadPhotoResponse)
  async uploadPhoto(
    @Arg("options") options: UploadImgInput,
    @Ctx() ctx: Context
  ): Promise<UploadPhotoResponse | null> {
    return UploadPhotoMutation(options, ctx);
  }
}

export default PhotoResolver;

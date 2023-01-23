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
import MyPhotoQuery from "./components/MyPhotoQuery";
import UploadPhotoMutation from "./components/UploadPhotoMutation";

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
  async myPhoto(
    @Arg("id", () => Int, { nullable: true }) id: number
  ): Promise<Photo | null> {
    return MyPhotoQuery(id);
  }

  @Mutation(() => UploadPhotoResponse)
  async uploadPhoto(
    @Arg("options") options: UploadImgInput,
    @Ctx() ctx: Context
  ): Promise<UploadPhotoResponse> {
    // const f: FileUpload = file as any;
    return UploadPhotoMutation(options, ctx);
  }
}

export default PhotoResolver;

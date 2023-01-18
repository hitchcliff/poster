import Photo from "../entities/Photo";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import isAuth from "../middleware/isAuth";
import { Context } from "../types";
import MyPhotoQuery from "./components/MyPhotoQuery";
import UploadPhotoMutation from "./components/UploadPhotoMutation";

@InputType()
export class Upload {
  @Field()
  filename: string;
  @Field()
  mimetype: string;
}

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
}

@InputType()
export class UploadPhotoInput {
  @Field(() => Upload)
  file: Upload;
}

@Resolver(Photo)
class PhotoResolver {
  @UseMiddleware(isAuth)
  @Query(() => Photo, { nullable: true })
  async myPhoto(@Ctx() ctx: Context) {
    return MyPhotoQuery(ctx);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UploadPhotoResponse)
  async uploadPhoto(
    @Arg("values") values: UploadPhotoInput,
    @Ctx() ctx: Context
  ) {
    return UploadPhotoMutation(values, ctx);
  }
}

export default PhotoResolver;

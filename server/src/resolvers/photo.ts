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
import User from "../entities/User";
// import { Upload } from "../types/Upload";

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
  async myphoto(@Ctx() { req }: Context): Promise<Photo | null> {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return null;
    }

    const photo = await Photo.findOne({
      where: {
        id: user.photoId,
      },
      relations: {
        user: true,
      },
    });

    if (!photo) {
      return null;
    }

    return photo;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UploadPhotoResponse)
  async uploadPhoto(
    @Arg("values") values: UploadPhotoInput,
    @Ctx() { req }: Context
  ): Promise<UploadPhotoResponse> {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      throw new Error("no user found");
    }

    if (!values.file) {
      return {
        error: {
          message: "no file found",
        },
      };
    }

    if (user.photoId) {
      const photo = await Photo.findOne({
        where: {
          id: user.photoId,
        },
      });

      if (!photo)
        return {
          error: {
            message: "there is something wrong in the backend",
          },
        };

      // Upload a photo to bucket

      photo.src = "aphoto.com";
      await photo.save();

      user.photo = photo;
      await user.save();

      return {
        photo,
      };
    }

    const photo = new Photo();
    photo.src = "aphoto.com";
    await photo.save();

    user.photo = photo;
    await user.save();

    return {
      photo,
    };
  }
}

export default PhotoResolver;

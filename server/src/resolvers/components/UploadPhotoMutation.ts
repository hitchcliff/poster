import { s3 } from "../../utils";
import Photo from "../../entities/Photo";
import User from "../../entities/User";
import { Context } from "../../types";
import { UploadPhotoInput, UploadPhotoResponse } from "../photo";

async function UploadPhotoMutation(
  values: UploadPhotoInput,
  { req }: Context
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

  // replace the photo
  if (user.photoId) {
    const photo = await Photo.findOne({
      where: {
        id: user.photoId,
      },
    });

    // there must be something wrong or missing data
    if (!photo)
      return {
        error: {
          message: "there is something wrong in the backend",
        },
      };

    // upload a photo to bucket
    const { url } = await s3({
      ...values.file,
      foldername: process.env.PROFILE_PICTURES,
    });

    photo.src = url;
    await photo.save();

    user.photo = photo;
    await user.save();

    return {
      photo,
    };
  }

  // uploads a photo to bucket
  const { url } = await s3({
    ...values.file,
    foldername: process.env.PROFILE_PICTURES,
  });

  const photo = new Photo();
  photo.src = url;
  await photo.save();

  user.photo = photo;
  await user.save();

  return {
    photo,
  };
}

export default UploadPhotoMutation;

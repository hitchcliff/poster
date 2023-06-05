import { s3 } from "../../../utils";
import Photo from "../../../entities/Photo";
import User from "../../../entities/User";
import { Context } from "../../../types";
import { UploadImgInput, UploadPhotoResponse } from "../../photo";

const UploadPhotoMutation = async (
  // file: FileUpload,
  options: UploadImgInput,
  { req }: Context
): Promise<UploadPhotoResponse | null> => {
  if (!req.session.userId) return null;
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user) {
    throw new Error("no user found");
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
    const { url, signedRequest } = await s3({
      ...options,
      foldername: process.env.PROFILE_PICTURES,
    });

    photo.src = url;
    await photo.save();

    user.photo = photo;
    await user.save();

    return {
      photo,
      signedRequest,
    };
  }

  // if user doesn't have profile image
  // uploads a photo to bucket
  const { url, signedRequest } = await s3({
    ...options,
    foldername: process.env.PROFILE_PICTURES,
  });

  const photo = new Photo();
  photo.src = url;
  await photo.save();

  user.photo = photo;
  await user.save();

  return {
    photo,
    signedRequest,
  };
};

export default UploadPhotoMutation;

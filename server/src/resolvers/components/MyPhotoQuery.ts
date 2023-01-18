import User from "../../entities/User";
import Photo from "../../entities/Photo";
import { Context } from "../../types";

async function MyPhotoQuery({ req }: Context): Promise<Photo | null> {
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

export default MyPhotoQuery;

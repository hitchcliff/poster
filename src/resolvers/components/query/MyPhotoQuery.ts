import { Context } from "../../../types";
import Photo from "../../../entities/Photo";
import User from "../../../entities/User";

async function MyPhotoQuery({ req }: Context): Promise<Photo | null> {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  const photo = await Photo.findOne({
    where: {
      id: user?.photoId,
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

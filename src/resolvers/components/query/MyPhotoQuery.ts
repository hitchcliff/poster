import { Context } from "../../../types";
import Photo from "../../../entities/Photo";
import User from "../../../entities/User";

async function MyPhotoQuery({ req }: Context): Promise<Photo | null> {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user?.photo) {
    return null;
  }

  return user.photo;
}

export default MyPhotoQuery;

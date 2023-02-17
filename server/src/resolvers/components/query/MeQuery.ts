import User from "../../../entities/User";
import { Context } from "../../../types";

async function MeQuery({ req }: Context) {
  if (!req.session.userId) return null;

  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
    relations: {
      posts: true,
      photo: true,
    },
  });

  console.log(user);

  return user;
}

export default MeQuery;

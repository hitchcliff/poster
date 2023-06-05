import User from "../entities/User";

interface hasPostProps {
  id: number;
}

const getUser = async ({ id }: hasPostProps): Promise<User | null> => {
  const post = await User.findOne({
    where: {
      id,
    },
  });

  return post;
};
export default getUser;

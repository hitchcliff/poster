import Post from "../entities/Post";

interface hasPostProps {
  id: number;
}

const getPost = async ({ id }: hasPostProps): Promise<Post | null> => {
  const post = await Post.findOne({
    where: {
      id,
    },
  });

  return post;
};
export default getPost;

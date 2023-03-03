// import Photo from "../entities/Photo";
// import Post from "../entities/Post";
// import User from "../entities/User";
import Like from "../entities/Like";

export const deleteData = async () => {
  // await Post.delete({}); // deletes posts
  // await User.delete({}); // deletes users
  // await Photo.delete({}); // deletes photos
  await Like.delete({}); // deletes likeshoto.delete({})
};

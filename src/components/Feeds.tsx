import { Post, PostsQuery } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import Comments from "./Comments";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";
import PostReactions from "./PostReactions";

interface FeedsProps {
  post: Post;
}

const Feeds = ({ post: { body, updatedAt, user }, ...post }: FeedsProps) => {
  const { toggleComments } = useGlobalSelector();

  if (!post) return <Loader />;

  return (
    <div className="relative bg-light text-dark dark:bg-dark dark:text-light rounded-md overflow-hidden p-5 w-full">
      <div className="flex flex-row justify-start">
        <div className="w-12 h-12">
          <div className="w-12 h-12 rounded-full m-0 dark:bg-white bg-dark overflow-hidden">
            {user.photo && (
              <img
                className="object-cover h-full w-full object-top m-0"
                src={user.photo.src}
                alt={user.username}
              />
            )}
          </div>
        </div>

        <div className="px-5 w-full">
          <PosterInfo body={body} user={user} updatedAt={updatedAt} />
          <PostReactions />
          {toggleComments && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default Feeds;

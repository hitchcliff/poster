import { PostDetails, Poster } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import Comments from "./Comments";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";
import PostReactions from "./PostReactions";

interface FeedsProps {
  poster: Poster;
  postDetails: PostDetails;
}

const Feeds = ({ poster, postDetails }: FeedsProps) => {
  const { toggleComments } = useGlobalSelector();

  if (!poster) return <Loader />;

  return (
    <div className="relative bg-light text-dark dark:bg-dark dark:text-light rounded-md overflow-hidden p-5 w-full">
      <div className="flex flex-row justify-start">
        <div className="h-12 w-12 border-2 border-dark rounded-full bg-white dark:bg-dark overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={poster.profileImg}
            alt={poster.username}
          />
        </div>
        <div className="px-5 w-full">
          <PosterInfo
            body={postDetails.body}
            user={poster}
            updatedAt={postDetails.updatedAt}
          />
          <PostReactions />
          {toggleComments && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default Feeds;

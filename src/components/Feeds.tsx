import Img from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import {
  PaginatedPostResponse,
  Post,
  PostDetails,
  Poster,
  useMyPhotoQuery,
} from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import Comments from "./Comments";
import PosterInfo from "./PosterInfo";
import PostReactions from "./PostReactions";

interface FeedsProps {
  poster: Poster;
  postDetails: PostDetails;
}

const Feeds = ({ poster, postDetails }: FeedsProps) => {
  const { toggleComments } = useGlobalSelector();

  if (!poster) return;

  return (
    <div className="relative bg-dark text-light rounded-md overflow-hidden p-5 w-full">
      <div className="flex flex-row justify-start">
        <div className="h-12 w-12 border-2 border-dark rounded-full bg-white overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={poster.profileImg}
            alt={poster.username}
          />
        </div>
        <div className="text-light px-5 w-full">
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

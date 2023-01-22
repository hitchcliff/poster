import Img from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import { Post, useMyPhotoQuery } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import Comments from "./Comments";
import PosterInfo from "./PosterInfo";
import PostReactions from "./PostReactions";

interface FeedsProps {
  post: Post;
}

const Feeds = ({
  post: { id, body, createdAt, updatedAt, user },
}: FeedsProps) => {
  const [{ data }] = useMyPhotoQuery({ variables: { id: user.photoId } });
  const { toggleComments } = useGlobalSelector();

  console.log(data);

  return (
    <div className="relative bg-dark text-light rounded-md overflow-hidden p-5 w-full">
      <div className="flex flex-row justify-start">
        <div className="h-12 w-12 border-2 border-dark rounded-full bg-white overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={data?.myPhoto?.src}
            alt={user.username}
          />
        </div>
        <div className="text-light px-5 w-full">
          <PosterInfo body={body} user={user} updatedAt={updatedAt} />
          <PostReactions />
          {toggleComments && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default Feeds;

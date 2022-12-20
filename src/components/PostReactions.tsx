import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalService from "../hooks/useGlobalService";
import { useGlobalSelector } from "../redux/features/global.selector";

const PostReactions = () => {
  const { setToggleComments } = useGlobalService();
  const { toggleComments } = useGlobalSelector();

  return (
    <div className="mt-5">
      <button className="mr-5">
        <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
        100
      </button>
      <button onClick={() => setToggleComments(!toggleComments)}>
        <FontAwesomeIcon className="mr-2" icon={faComment} />
        100
      </button>
    </div>
  );
};

export default PostReactions;

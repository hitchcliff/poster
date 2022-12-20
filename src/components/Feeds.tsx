import { faOptinMonster } from "@fortawesome/free-brands-svg-icons";
import {
  faComment,
  faDotCircle,
  faHeart,
  faListDots,
  faPenToSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";

const Feeds = () => {
  return (
    <div className="relative flex flex-row justify-start bg-dark rounded-md overflow-hidden p-5 w-full">
      <div className="h-12 w-12 border-2 border-dark rounded-full bg-white overflow-hidden">
        <Img className="object-cover" src={PROFILE_IMG} alt="kevin nacario" />
      </div>
      <div className="text-light px-5 w-full">
        <div className="flex justify-between w-full">
          <div className="flex w-full">
            <h2 className="font-bold mr-2">Kevin Nacario</h2>
            <span className="text-light opacity-80 mr-2">@username</span>
            <span className="text-light opacity-80">
              <FontAwesomeIcon
                icon={faDotCircle}
                className="mr-2 text-green-400"
              />
              2h
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className="text-white mt-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
            asperiores dolorem distinctio ipsam et iusto facilis laboriosam
            perferendis ipsum dolor?
          </p>
        </div>
        <div className="mt-5">
          <button className="mr-5">
            <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
            100
          </button>
          <button>
            <FontAwesomeIcon className="mr-2" icon={faComment} />
            100
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feeds;

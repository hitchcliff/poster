import { faDotCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Poster, User } from "../gen/graphql";
import { useDayJs } from "../hooks";
import Badge from "./Badge";

interface PosterInfoProps {
  body: string;
  updatedAt: string;
  user: Poster;
}

const PosterInfo = ({ body, user, updatedAt }: PosterInfoProps) => {
  const date = useDayJs({ fromNow: updatedAt });

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <h2 className="font-bold mr-2">
            {!user.fullName ? user.username : user.fullName}
            <Badge />
          </h2>
          <span className="opacity-80 mr-2">@{user.username}</span>
          <span className="opacity-80">
            <FontAwesomeIcon
              icon={faDotCircle}
              className="mr-2 text-green-400"
            />
            {date}
          </span>
        </div>
        <div>
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
      </div>
      <div className="mt-2">
        <p>{body}</p>
      </div>
    </>
  );
};

export default PosterInfo;

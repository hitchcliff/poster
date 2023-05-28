import { faDotCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../gen/graphql";
import { useAuthService, useDayJs } from "../hooks";
import Badge from "./Badge";

interface PosterInfoProps {
  body: string;
  updatedAt: string;
  user: User;
}

const PosterInfo = ({ body, user, updatedAt }: PosterInfoProps) => {
  const [{ user: u }] = useAuthService();
  const date = useDayJs({ fromNow: updatedAt });
  const name =
    !user.firstName || !user.lastName
      ? user.username
      : user.firstName + " " + user.lastName;

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <h2 className="font-bold capitalize mr-2">
            {name}
            {user.verified && <Badge />}
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
        {u!.id === user.id && (
          <div className="ml-auto">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )}
      </div>
      <div className="mt-2">
        <p>{body}</p>
      </div>
    </>
  );
};

export default PosterInfo;

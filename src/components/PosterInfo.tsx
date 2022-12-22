import { faDotCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "./Badge";

const PosterInfo = () => {
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <h2 className="font-bold mr-2">
            Kevin Nacario
            <Badge />
          </h2>
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
    </>
  );
};

export default PosterInfo;

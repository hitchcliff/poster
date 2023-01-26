import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Badge = () => {
  return (
    <div className="ml-2 inline-block leading-0 text-white">
      <FontAwesomeIcon
        className="leading-0 bg-primary p-1 rounded-full text-xs"
        icon={faCheck}
        data-label="verified"
        title="verfied"
      />
    </div>
  );
};

export default Badge;

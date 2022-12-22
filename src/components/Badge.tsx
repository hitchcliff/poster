import {
  faCheckCircle,
  faCheckDouble,
  faCheckToSlot,
  faIdBadge,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Badge = () => {
  return (
    <div className="ml-2 w-5 h-5 inline-block leading-0 bg-primary text-white rounded-full">
      <FontAwesomeIcon
        icon={faCheckDouble}
        data-label="verified"
        title="verfied"
      />
    </div>
  );
};

export default Badge;

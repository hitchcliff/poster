import PROFILE_IMG from "../assets/images/profile.jpg";
import Img from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGear,
  faHome,
  faListDots,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import RoutePattern from "../routes/RoutePattern";
import Notifications from "./Notifications";

const InfoBar = () => {
  return (
    <div className="p-2 primary-gradient flex-col justify-start items-start">
      <div className="h-10 w-10 border-2 border-light rounded-full bg-white overflow-hidden">
        <Img className="object-cover" src={PROFILE_IMG} alt="kevin nacario" />
      </div>
      <div className="flex flex-col gap-5 mt-5 text-light infobar-icons">
        <button>
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button className="relative">
          <Link href={RoutePattern.NOTIFICATIONS}>
            <FontAwesomeIcon icon={faBell} />
            <Notifications>10</Notifications>
          </Link>
        </button>
        <button>
          <Link href={RoutePattern.MESSAGES}>
            <FontAwesomeIcon icon={faMessage} />
            <Notifications>5</Notifications>
          </Link>
        </button>
        <button>
          <Link href={RoutePattern.SETTINGS}>
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default InfoBar;

import {
  faArrowCircleRight,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faArrowsUpDownLeftRight,
  faArrowUpFromBracket,
  faBell,
  faGear,
  faHome,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PROFILE_IMG from "../assets/images/profile.jpg";
import { useLogoutMutation, useMeQuery, useMyPhotoQuery } from "../gen/graphql";
import RoutePattern from "../routes/RoutePattern";
import Loader from "./Loader";
import Notifications from "./Notifications";

const InfoBar = () => {
  const [{ fetching, data }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  if (fetching || !data?.me) return null;

  const { me } = data;

  return (
    <div className="h-full px-2 py-7 bg-dark text-light flex flex-col justify-start items-center ">
      <div className="h-10 w-10 border border-white rounded-full bg-white overflow-hidden">
        {me.photo && (
          <img className="object-cover" src={me.photo.src} alt={me.username} />
        )}
      </div>
      <div className="flex flex-col justify-center gap-5 mt-5 infobar-icons">
        <button aria-label="homepage">
          <Link href={RoutePattern.HOME}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </button>
        <button className="relative" aria-label="notifications">
          <Link href={RoutePattern.NOTIFICATIONS}>
            <FontAwesomeIcon icon={faBell} />
            <Notifications>10</Notifications>
          </Link>
        </button>
        <button aria-label="messages">
          <Link href={RoutePattern.MESSAGES}>
            <FontAwesomeIcon icon={faMessage} />
            <Notifications>5</Notifications>
          </Link>
        </button>
        <button aria-label="settings">
          <Link href={RoutePattern.SETTINGS}>
            <FontAwesomeIcon icon={faGear} />
          </Link>
        </button>
      </div>
      <div className="w-full mt-auto mx-auto">
        <button
          onClick={async () => {
            await logout({});
          }}
          aria-label="logout"
          className="p-2 rounded-full bg-red-500 w-10 h-10"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default InfoBar;

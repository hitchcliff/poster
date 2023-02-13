import {
  faArrowRightFromBracket,
  faBell,
  faGear,
  faHome,
  faMessage,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../gen/graphql";
import useSpaghetti from "../hooks/useSpaghetti";
import RoutePattern from "../routes/RoutePattern";
import Notifications from "./Notifications";

const InfoBar = () => {
  const [toggle, setToggle] = useSpaghetti();
  const [{ fetching, data }] = useMeQuery();
  const [, logout] = useLogoutMutation();

  if (fetching || !data?.me) return null;

  const { me } = data;

  return (
    <div className="h-full px-2 py-7 bg-light text-dark dark:bg-dark dark:text-light flex flex-col justify-start items-center ">
      <div className="h-10 w-10 rounded-full bg-dark dark:bg-white overflow-hidden">
        {me.photo && (
          <img
            className="object-cover w-full h-auto m-0 rounded-full"
            src={me.photo.src}
            alt={me.username}
          />
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
        <button
          aria-label="mode-switch"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          {toggle ? (
            <FontAwesomeIcon className="text-yellow-400" icon={faSun} />
          ) : (
            <FontAwesomeIcon className="text-gray-400" icon={faMoon} />
          )}
        </button>
      </div>
      <div className="w-full mt-auto mx-auto">
        <button
          onClick={async () => {
            await logout({});
          }}
          aria-label="logout"
          className="p-2 rounded-full bg-red-500 w-10 h-10 text-white"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default InfoBar;

import Image from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import Badge from "./Badge";
import Button from "./Button";
import ButtonSecondary from "./ButtonSecondary";

const FriendSuggestions = () => {
  return (
    <div className="flex flex-col w-full text-dark dark:text-light">
      <h2 className="font-bold">Friend suggestions</h2>
      <div className="bg-light text-dark dark:bg-dark dark:text-light p-5 overflow-hidden shadow-sm rounded-md ">
        <div className="py-2 flex flex-row">
          <div className="h-12 w-12 mr-5 border-2 border-dark rounded-full bg-white overflow-hidden">
            <Image
              className="object-cover"
              src={PROFILE_IMG}
              alt="kevin nacario"
            />
          </div>
          <div className="">
            <h2 className="font-bold text-ellipsis overflow-hidden whitespace-nowrap w-56">
              Kevin Nacario <Badge />
            </h2>
            <ButtonSecondary>Add Friend</ButtonSecondary>
          </div>
        </div>
        <div className="py-2 flex flex-row">
          <div className="h-12 w-12 mr-5 border-2 border-dark rounded-full bg-white overflow-hidden">
            <Image
              className="object-cover"
              src={PROFILE_IMG}
              alt="kevin nacario"
            />
          </div>
          <div className="">
            <h2 className="font-bold text-ellipsis overflow-hidden whitespace-nowrap w-56">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              praesentium?
            </h2>
            <ButtonSecondary>Add Friend</ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSuggestions;

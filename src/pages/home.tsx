import CreateFeed from "../components/CreateFeed";
import Feeds from "../components/Feeds";
import FriendSuggestions from "../components/FriendSuggestions";
import InfoBar from "../components/InfoBar";
import PrivateRoute from "../components/Route/PrivateRoute";

const Home = () => {
  return (
    <div className="relative bg-light flex flex-row min-h-screen gap-7">
      <InfoBar />
      <div className="relative py-7 w-full flex flex-col gap-7">
        <CreateFeed />
        <Feeds />
      </div>
      <div className="relative py-7 pr-7 w-1/2 flex flex-col gap-7">
        <FriendSuggestions />
      </div>
    </div>
  );
};

export default PrivateRoute(Home, { ssr: true });

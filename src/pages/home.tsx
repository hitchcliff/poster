import CreateFeed from "../components/CreateFeed";
import Feeds from "../components/Feeds";
import InfoBar from "../components/InfoBar";
import PrivateRoute from "../components/Route/PrivateRoute";

const Home = () => {
  return (
    <div className="relative bg-light flex flex-row min-h-screen">
      <InfoBar />
      <div className="relative p-7 w-full flex flex-col gap-7">
        <CreateFeed />
        <Feeds />
      </div>
    </div>
  );
};

export default PrivateRoute(Home, { ssr: true });

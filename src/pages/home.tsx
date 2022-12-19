import Feeds from "../components/Feeds";
import InfoBar from "../components/InfoBar";
import PrivateRoute from "../components/Route/PrivateRoute";

const Home = () => {
  return (
    <div className="relative bg-light flex flex-row min-h-screen">
      <InfoBar />
      <Feeds />
    </div>
  );
};

export default PrivateRoute(Home, { ssr: true });

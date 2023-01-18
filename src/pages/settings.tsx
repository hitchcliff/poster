import Doornav from "../components/Doornav";
import ProfileForm from "../components/Form/ProfileForm";
import SecurityForm from "../components/Form/SecurityForm";
import InfoBar from "../components/InfoBar";
import PrivateRoute from "../components/Route/PrivateRoute";

const Settings = () => {
  return (
    <div className="relative bg-light flex flex-row min-h-screen gap-7 pr-7 py-7">
      <div className="relative">
        <div className="opacity-0">
          <InfoBar />
        </div>
        <div className="fixed top-0 left-0 h-full">
          <InfoBar />
        </div>
      </div>

      <div className="bg-dark text-light rounded-md shadow-md relative p-7 w-full flex flex-col gap-7">
        <Doornav buttons={["Update Profile", "Privacy & Security"]}>
          <ProfileForm />
          <SecurityForm />
        </Doornav>
      </div>
    </div>
  );
};

export default PrivateRoute(Settings, { ssr: true });

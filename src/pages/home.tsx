import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useLogoutMutation, useMeQuery } from "../gen/graphql";
import { useAuthService } from "../hooks";
import RoutePattern from "../routes/RoutePattern";
import createUrqlClient from "../urql/createUrqlClient";

const Home = () => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const route = useRouter();
  useAuthService();

  return (
    <div className="relative">
      {logoutFetching && <Loader />}
      <Button
        isSubmitting={logoutFetching}
        onClick={async () => {
          await logout({});
          route.push(RoutePattern.LANDING_PAGE);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);

import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import Loader from "../components/Loader";
import PrivateRoute from "../components/Route/PrivateRoute";
import { useLogoutMutation, useMeQuery, usePostsQuery } from "../gen/graphql";
import { useAuthService } from "../hooks";
import RoutePattern from "../routes/RoutePattern";
import createUrqlClient from "../urql/createUrqlClient";

const Home = () => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const route = useRouter();
  useAuthService();

  const [{ data: posts }] = usePostsQuery();

  return (
    <div className="relative">
      <Link href="test-route">go to test route</Link>
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

export default PrivateRoute(Home, { ssr: true });

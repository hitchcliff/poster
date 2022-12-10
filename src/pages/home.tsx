import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { useLogoutMutation } from "../gen/graphql";
import useMeService from "../hooks/useMeService";
import RoutePattern from "../routes/RoutePattern";
import createUrqlClient from "../urql/createUrqlClient";

const Home = () => {
  const [{ data, fetching }] = useMeService();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const route = useRouter();

  return (
    <div>
      {data?.me && (
        <span className="capitalize">Hello, {data?.me?.username}</span>
      )}
      {fetching && <span>Fetching...</span>}
      <Button
        isSubmitting={logoutFetching}
        onClick={async () => {
          const { data } = await logout({});

          route.push(RoutePattern.LANDING_PAGE);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);

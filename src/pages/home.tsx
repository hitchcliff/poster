import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { useLogoutMutation, useMeQuery } from "../gen/graphql";
import useMeService from "../hooks/useMeService";
import createUrqlClient from "../urql/createUrqlClient";

const Home = () => {
  const [{ data, fetching }] = useMeQuery();
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
          console.log(data);

          if (data?.logout) {
            route.push("/");
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);

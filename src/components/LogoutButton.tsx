import { useRouter } from "next/router";
import { useMeQuery, useLogoutMutation } from "../gen/graphql";
import RoutePattern from "../routes/RoutePattern";
import Button from "./Button";

const LogoutButton = () => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const route = useRouter();

  return (
    <Button
      isSubmitting={logoutFetching}
      onClick={async () => {
        await logout({});
        route.push(RoutePattern.LANDING_PAGE);
      }}
    >
      Logout
    </Button>
  );
};
export default LogoutButton;

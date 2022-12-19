import { withUrqlClient } from "next-urql";
import Link from "next/link";
import PrivateRoute from "../components/Route/PrivateRoute";
import { useMeQuery, usePostsQuery } from "../gen/graphql";
import createUrqlClient from "../urql/createUrqlClient";

const TestRoute = () => {
  const [{ data: user }] = useMeQuery();
  const [{ data }] = usePostsQuery();

  // console.log(data);

  return (
    <div>
      {/* {user?.me?.username} */}
      <br />
      <Link href="/home">go back to home</Link>
    </div>
  );
};

export default PrivateRoute(TestRoute, { ssr: true });

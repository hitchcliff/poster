import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useMeQuery, usePostsQuery } from "../gen/graphql";
import createUrqlClient from "../urql/createUrqlClient";

const TestRoute = () => {
  const [{ data: user }] = useMeQuery();
  const [{ data }] = usePostsQuery();

  console.log(data);

  return (
    <div>
      {user?.me?.username}
      <br />
      <Link href="/home">go back to home</Link>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(TestRoute);

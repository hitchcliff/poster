import { NextPage } from "next";
import { withUrqlClient, WithUrqlClientOptions } from "next-urql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import createUrqlClient from "../../urql/createUrqlClient";
import Loader from "../Loader";

const PrivateRoute = (
  Component: NextPage<any, any>,
  options?: WithUrqlClientOptions
) => {
  const C = ({ ...props }) => {
    const [{ data: user, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
      const controller = new AbortController();

      if (!user?.me || fetching) {
        router.push(RoutePattern.LOGIN);
      } else if (user.me) {
        if (router.query.next) {
          router.replace(router.query!.next as string);
        }
      }

      return () => {
        controller.abort();
      };
    }, [router, user, fetching]);

    if (!user?.me) return <Loader />;

    return <Component {...props} />;
  };

  return withUrqlClient(createUrqlClient, options)(C);
};

export default PrivateRoute;

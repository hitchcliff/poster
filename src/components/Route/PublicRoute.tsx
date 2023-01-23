import { NextPage } from "next";
import { WithUrqlClientOptions, withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { useMeQuery } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import createUrqlClient from "../../urql/createUrqlClient";
import Loader from "../Loader";

const PublicRoute = (
  Component: NextPage<any, any>,
  options?: WithUrqlClientOptions
) => {
  const C = ({ ...props }) => {
    const [{ data: user, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
      const controller = new AbortController();
      if (user?.me) {
        if (router.query.next) {
          router.replace(router.query!.next as string);
        } else {
          router.replace(RoutePattern.HOME);
        }
      }

      return () => {
        controller.abort();
      };
    }, [router, user, fetching]);

    if (user?.me) return <Loader />;

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return withUrqlClient(createUrqlClient, options)(C);
};

export default PublicRoute;

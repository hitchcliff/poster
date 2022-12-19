import { useEffect, useMemo } from "react";
import { useMeQuery } from "../gen/graphql";
import router from "next/router";
import RoutePattern from "../routes/RoutePattern";

const useAuthService = () => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!data?.me && fetching) {
      router.replace(RoutePattern.LANDING_PAGE);
    }
  }, [data, fetching, router]);

  return [{ user: data?.me }];
};

export default useAuthService;

import { useEffect, useMemo } from "react";
import { useMeQuery } from "../gen/graphql";
import router from "next/router";
import RoutePattern from "../routes/RoutePattern";

const useAuthService = () => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!data?.me) {
      router.push(RoutePattern.LANDING_PAGE);
    } else {
      router.push(RoutePattern.HOME);
    }
  }, [data, router]);

  return [{ user: data?.me }];
};

export default useAuthService;

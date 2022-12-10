import { useEffect } from "react";
import { useMeQuery } from "../gen/graphql";
import RoutePattern from "../routes/RoutePattern";
import { useRouter } from "next/router";

export default function useMeService() {
  const [{ data, fetching, ...props }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    // if there is no user
    if (!data?.me) {
      router.push(RoutePattern.LANDING_PAGE);
    } else {
      router.push(RoutePattern.HOME);
    }
  }, [data, router]);

  return [{ data, fetching, ...props }];
}

import { ClientOptions, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { GRAPHQL_URL } from "../utils/constants";
import { LoginMutation, LogoutMutation, MeDocument } from "../gen/graphql";

const createUrqlClient = (ssrExchange: any, ctx: any): ClientOptions => {
  let cookie = "";

  if (typeof window === "undefined" && ctx) {
    ctx.req.headers.cookie;
  }

  return {
    url: GRAPHQL_URL,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        resolvers: {
          Query: {
            me: (obj, args, cache, _info) => {
              return obj.me;
            },
          },
        },
        updates: {
          Mutation: {
            logout: (result: LogoutMutation, args, cache, _info) => {
              return cache.updateQuery({ query: MeDocument }, () => ({
                me: null,
              }));
            },
            login: (result: LoginMutation, args, cache, _info) => {
              return cache.updateQuery({ query: MeDocument }, (data: any) => {
                if (result.login.errors) {
                  return data;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              });
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

export default createUrqlClient;

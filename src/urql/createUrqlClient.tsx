import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { ClientOptions, dedupExchange, fetchExchange, gql } from "urql";
import {
  CreatePostMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  PostsDocument,
  PostsQuery,
  RegisterMutation,
} from "../gen/graphql";
import { GRAPHQL_URL } from "../utils/constants";
import { CacheUpdateQuery } from "./CacheUpdateQuery";

const createUrqlClient = (ssrExchange: any, ctx: any): ClientOptions => {
  let cookie = "";

  if (typeof window === "undefined" && ctx) {
    cookie = ctx.req.headers.cookie;
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
        updates: {
          Mutation: {
            createPost: (
              result: CreatePostMutation,
              args,
              cache: Cache,
              info
            ) => {
              const allFields = cache.inspectFields("Query"); // get all the query
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "posts" // filter the query
              );

              // invalidate all query
              fieldInfos.forEach((fi) => {
                cache.invalidate("Query", "posts", fi.arguments || {});
              });
            },
            register: (result: RegisterMutation, args, cache: Cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (): MeQuery => {
                if (result.register.errors) {
                  return null as any;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              });
            },
            login: (result: LoginMutation, args, cache: Cache, _info) => {
              cache.updateQuery({ query: MeDocument }, (): MeQuery => {
                if (result.login.errors) {
                  return null as any;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              });
            },
            logout: (result: LogoutMutation, args, cache, _info) => {
              cache.updateQuery({ query: MeDocument }, () => ({
                me: null,
              }));
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

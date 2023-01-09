import { Cache, QueryInput } from "@urql/exchange-graphcache";

export const CacheUpdateQuery = <Q, R>(
  result: R,
  query: QueryInput,
  cache: Cache,
  fn: (q: Q, r: R) => Q
) => {
  return cache.updateQuery(query, (data) => fn(data as any, result) as any);
};

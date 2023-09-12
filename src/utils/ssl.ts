import { isProd } from "./constants";

export const ssl = () => {
  // temporary reject ssl on production
  return isProd ? (process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0") : null;
};

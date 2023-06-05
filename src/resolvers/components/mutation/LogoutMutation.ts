import { Context } from "../../../types";
import { COOKIE_NAME } from "../../../utils/constants";

const LogoutMutation = async ({ req, res }: Context) => {
  return new Promise((resolve) => {
    return req.session.destroy((err: any) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.error(err);
        resolve(false);
        return;
      }

      resolve(true);
    });
  });
};

export default LogoutMutation;

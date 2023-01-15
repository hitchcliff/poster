import { Context } from "../types";
import { MiddlewareFn } from "type-graphql";
import User from "../entities/User";

const isAuth: MiddlewareFn<Context> = async (
  { context },
  next
): Promise<boolean> => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne({
    where: {
      id: context.req.session.userId,
    },
  });

  if (!user) {
    throw new Error("no user found");
  }

  return next();
};

export default isAuth;

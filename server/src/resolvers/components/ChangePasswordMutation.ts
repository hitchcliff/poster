import User from "../../entities/User";
import { FORGET_PASSWORD_PREFIX } from "../../utils/constants";
import { Context } from "../../types";
import { ForgotPasswordInput } from "../user";
import argon2 from "argon2";

const ChangePasswordMutation = async (
  options: ForgotPasswordInput,
  { redis, req }: Context
) => {
  if (options.newPassword.length <= 3) {
    return {
      errors: [
        {
          field: "newPassword",
          message: "password is too short",
        },
      ],
    };
  }

  const key = FORGET_PASSWORD_PREFIX + options.token;
  // Get redis data
  const userId = await redis.get(key);

  // If cannot find user
  if (!userId) {
    return {
      errors: [
        {
          field: "newPassword",
          message: "token expired",
        },
      ],
    };
  }

  const user = await User.findOne({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    return {
      errors: [
        {
          field: "newPassword",
          message: "user doesn't exists",
        },
      ],
    };
  }

  // Change password
  user.password = await argon2.hash(options.newPassword);
  user.save();

  // Save cookie after
  req.session.userId = userId;

  // Delete redis data
  await redis.del(key);

  return {
    user,
  };
};

export default ChangePasswordMutation;

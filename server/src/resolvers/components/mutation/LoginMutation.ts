import { Context } from "../../../types";
import { LoginInput } from "../../user";
import argon2 from "argon2";
import User from "../../../entities/User";

const LoginMutation = async (options: LoginInput, { req }: Context) => {
  const user = await User.findOne({
    where: {
      username: options.username,
    },
  });

  if (!user) {
    return {
      errors: [
        {
          field: "username",
          message: "username doesn't exists",
        },
      ],
    };
  }

  const verified = await argon2.verify(user.password, options.password);

  if (!verified) {
    return {
      errors: [
        {
          field: "password",
          message: "wrong password",
        },
      ],
    };
  }

  // Store cookies in Redis
  req.session.userId = user.id;

  return {
    user,
  };
};

export default LoginMutation;

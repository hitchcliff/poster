import { Context } from "../../../types";
import { LoginInput } from "../../user";
import User from "../../../entities/User";
import bcrypt from "bcrypt";

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

  const verified = await bcrypt.compare(options.password, user.password);

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

import { Context } from "../../../types";
import User from "../../../entities/User";
import { unique, validation } from "../../../utils";
import { UsernamePasswordInput } from "../../user";
import argon2 from "argon2";

const RegisterMutation = async (
  options: UsernamePasswordInput,
  { req }: Context
) => {
  const errors = validation(options);
  if (errors.length) {
    return {
      errors,
    };
  }

  const emailIsTaken = await User.findOne({
    where: {
      email: options.email,
    },
  });

  if (emailIsTaken) {
    return {
      errors: [
        {
          field: "email",
          message: "email already exists",
        },
      ],
    };
  }

  // Hash Password
  const hashedPassword = await argon2.hash(options.password);
  const user = new User();

  try {
    user.username = options.username;
    user.email = options.email;
    user.password = hashedPassword;

    await user.save();

    return {
      user,
    };
  } catch (error) {
    const usernameError = unique(error.code, error.detail);

    if (usernameError.length) {
      return {
        errors: usernameError,
      };
    }
  }

  // Store userId in Redis
  req.session.userId = user.id;

  return {
    user,
  };
};

export default RegisterMutation;

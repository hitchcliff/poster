import { Context } from "../../types";
import User from "../../entities/User";
import argon2 from "argon2";
import { UpdatePasswordInput } from "../user";

const UpdatePasswordMutation = async (
  options: UpdatePasswordInput,
  { req }: Context
) => {
  if (!req.session.userId)
    return {
      errors: [
        {
          message: "need to login first",
        },
      ],
    };

  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user)
    return {
      errors: [
        {
          message: "can't find user",
        },
      ],
    };

  const newPasswordMatch = await argon2.verify(
    user.password,
    options.newPassword
  );

  if (newPasswordMatch) {
    return {
      errors: [
        {
          field: "newPassword",
          message: "new password is the same",
        },
      ],
    };
  }

  if (options.confirmPassword !== options.newPassword) {
    return {
      errors: [
        {
          field: "newPassword",
          message: "new password does not match",
        },
        {
          field: "confirmPassword",
          message: "confirm password does not match",
        },
      ],
    };
  }

  // Hash new password
  const newPassword = await argon2.hash(options.newPassword);

  // Set new password
  user.password = newPassword;
  user.save();

  return {
    user,
  };
};

export default UpdatePasswordMutation;

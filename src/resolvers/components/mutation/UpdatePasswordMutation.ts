import { Context } from "../../../types";
import User from "../../../entities/User";
import bcrypt from "bcrypt";
import { PasswordInput } from "../../user";

const UpdatePasswordMutation = async (
  options: PasswordInput,
  { req }: Context
) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user) {
    throw new Error("no user found");
  }

  const newPasswordMatch = await bcrypt.compare(
    options.newPassword,
    user.password
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
  const newPassword = await bcrypt.hash(options.newPassword);

  // Set new password
  user.password = newPassword;
  user.save();

  return {
    user,
  };
};

export default UpdatePasswordMutation;

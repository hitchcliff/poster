import User from "../../entities/User";
import { Context } from "../../types";
import { UserProfileInput, UserResponse } from "../user";

const UpdateUserProfileMutation = async (
  options: UserProfileInput,
  { req }: Context
): Promise<UserResponse> => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });

  if (!user) {
    throw new Error("not authenticated");
  }

  if (options.firstName.length <= 3) {
    return {
      errors: [
        {
          field: "firstName",
          message: "must be length greater than 3",
        },
      ],
    };
  }

  if (options.lastName.length <= 3) {
    return {
      errors: [
        {
          field: "lastName",
          message: "must be length greater than 3",
        },
      ],
    };
  }

  user.firstName = options.firstName;
  user.lastName = options.lastName;
  user.save();

  return {
    user,
  };
};

export default UpdateUserProfileMutation;

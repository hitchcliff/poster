import { FieldError, UsernamePasswordInput } from "src/resolvers/user";

/**
 * Validation for Register
 * @param options
 */
export const validation = (options: UsernamePasswordInput): FieldError[] => {
  const errors: FieldError[] = [];

  if (options.username.length <= 3) {
    errors.push({
      field: "username",
      message: "must be atleast 3 characters",
    });
  }

  if (!options.email.includes("@")) {
    errors.push({
      field: "email",
      message: "must be container @ sign",
    });
  }

  if (options.password.length <= 3) {
    errors.push({
      field: "password",
      message: "must be atleast 3 characters",
    });
  }

  if (options.confirmPassword.length <= 3) {
    errors.push({
      field: "confirm_password",
      message: "must be atleast 3 characters",
    });
  }

  if (options.password !== options.confirmPassword) {
    errors.push(
      {
        field: "password",
        message: "must match to confirm password",
      },
      {
        field: "confirm_password",
        message: "must match to password",
      }
    );
  }

  return errors;
};

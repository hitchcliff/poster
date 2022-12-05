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

export const unique = (code: string, detail: string): FieldError[] => {
  const errors: FieldError[] = [];
  if (code === "23505" || detail.includes("already exists.")) {
    errors.push({
      field: "username",
      message: "username already exists",
    });
  }

  return errors;
};

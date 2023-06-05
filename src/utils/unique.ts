import { FieldError } from "src/resolvers/user";

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

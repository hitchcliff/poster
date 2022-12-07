import { FieldError } from "../gen/graphql";

const toRecordError = (errors: FieldError[]) => {
  const error: Record<string, string> = {};

  errors.forEach(({ field, message }) => {
    if (!field || !message) return;

    error[field] = message;
  });

  return error;
};

export default toRecordError;

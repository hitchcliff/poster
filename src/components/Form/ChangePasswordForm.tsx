import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
} from "../../gen/graphql";
import { SuccessType1 } from "../../utils/swal";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

interface ChangePasswordFormProps {
  token: string;
}

const ChangePasswordForm = ({ token }: ChangePasswordFormProps) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();

  return (
    <div className="bg-white rounded-md shadow-md p-5 mt-5">
      <Formik
        initialValues={{
          newPassword: "",
          token,
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await changePassword({ options: values });
          if (res.data?.changePassword.errors) {
            setErrors(toRecordError(res.data.changePassword.errors));
          } else {
            SuccessType1();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <InputField
                type="password"
                name="newPassword"
                label="new password"
                placeholder="enter new password"
              />
            </div>
            <div className="mt-5">
              <Button type="submit" isSubmitting={isSubmitting}>
                Change password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;

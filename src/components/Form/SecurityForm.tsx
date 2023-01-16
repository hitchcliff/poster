import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  useRegisterMutation,
  useUpdatePasswordMutation,
} from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import { ThrowSuccess } from "../../utils/swal";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const SecurityForm = () => {
  const [, updatePassword] = useUpdatePasswordMutation();
  const route = useRouter();

  return (
    <>
      <div>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await updatePassword({ options: values });
            if (data?.updatePassword.errors) {
              setErrors(toRecordError(data.updatePassword.errors));
            } else if (data?.updatePassword.user) {
              await ThrowSuccess({ text: "Updated password successfully" });
              route.push(RoutePattern.HOME);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-2">
                <InputField
                  name="newPassword"
                  placeholder="New Password"
                  label="password"
                  type="password"
                />
              </div>
              <div className="mt-2">
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  label="confirm password"
                  type="password"
                />
              </div>
              <div className="mt-7">
                <Button type="submit" isSubmitting={isSubmitting}>
                  Update password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SecurityForm;

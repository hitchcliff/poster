import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const RegisterForm = () => {
  const [, register] = useRegisterMutation();
  const route = useRouter();

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-5 mt-5">
        <Formik
          initialValues={{
            username: "",
            email: "",
            confirmPassword: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({ options: values });

            if (res.data?.register.errors) {
              setErrors(toRecordError(res.data.register.errors));
            } else if (res.data?.register.user) {
              route.push(RoutePattern.HOME);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-2">
                <InputField
                  name="username"
                  placeholder="New Username"
                  label="username"
                  type="text"
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="email"
                  label="email"
                  name="email"
                  placeholder="new email"
                />
              </div>

              <div className="mt-2">
                <InputField
                  name="password"
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
              <div className="mt-2">
                <Button type="submit" isSubmitting={isSubmitting}>
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterForm;

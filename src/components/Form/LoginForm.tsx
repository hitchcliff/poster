import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useLoginMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const LoginForm = () => {
  const [, login] = useLoginMutation();
  const route = useRouter();

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-5 mt-5">
        <Formik
          key={1}
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ options: values });
            const errors = response.data?.login.errors;

            if (errors) {
              setErrors(toRecordError(errors));
            } else if (response.data?.login.user) {
              route.push(RoutePattern.HOME);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <InputField
                  label="username"
                  name="username"
                  placeholder="enter username"
                  type="text"
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="password"
                  label="password"
                  name="password"
                  placeholder="enter password"
                />
              </div>

              <div className="mt-5">
                <Button type="submit" isSubmitting={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;

import { Form, Formik } from "formik";
import { useForgotPasswordMutation } from "../../gen/graphql";
import Button from "../Button";
import InputField from "./InputField";

const ForgotPasswordForm = () => {
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <div className="bg-white rounded-md shadow-md p-5 mt-5">
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values) => {
          const res = await forgotPassword(values);

          return res;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <InputField
                type="text"
                name="email"
                label="email"
                placeholder="enter email"
              />
            </div>
            <div className="mt-5">
              <Button type="submit" isSubmitting={isSubmitting}>
                Forgot password
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;

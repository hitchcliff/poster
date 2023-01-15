import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const ProfileForm = () => {
  const [, register] = useRegisterMutation();
  const route = useRouter();

  return (
    <div className="">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-2">
              <InputField
                name="firstName"
                placeholder="Enter First Name"
                label="First Name"
                type="text"
              />
            </div>

            <div className="mt-2">
              <InputField
                name="lastName"
                placeholder="Enter Last Name"
                label="Last Name"
                type="text"
              />
            </div>
            <div className="mt-7">
              <Button type="submit" isSubmitting={isSubmitting}>
                Update Profile
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;

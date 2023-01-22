import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useUpdateUserProfileMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import { ThrowSuccess } from "../../utils/swal";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const ProfileForm = () => {
  const [, updateProfile] = useUpdateUserProfileMutation();
  const route = useRouter();

  return (
    <div className="">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
        }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const { data } = await updateProfile({ options: values });

          if (data?.updateUserProfile?.errors) {
            setErrors(toRecordError(data.updateUserProfile.errors));
          } else if (data?.updateUserProfile?.user) {
            const success = await ThrowSuccess({
              text: "Profile updated successfully",
            });

            if (!success) return;

            resetForm();
            route.push(RoutePattern.HOME);
          }
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

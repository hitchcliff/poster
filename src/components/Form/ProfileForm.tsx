import { Form, Formik, useField } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import {
  useUpdateUserProfileMutation,
  useUploadPhotoMutation,
} from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import { ThrowError, ThrowSuccess } from "../../utils/swal";
import toRecordError from "../../utils/toRecordError";
import uploadToS3, { RenameFile } from "../../utils/uploadToS3";
import Button from "../Button";
import InputField from "./InputField";
import UploadField from "./UploadField";

const ShowUploadedImage = ({ file }: any) => {
  const ref: any = useRef(null);

  useEffect(() => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      ref.current.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="overflow-hidden w-24 h-24">
      <img ref={ref} className="object-cover" alt="kevin nacario" />
    </div>
  );
};

const ProfileForm = () => {
  const [, updateProfile] = useUpdateUserProfileMutation();
  const [, uploadPhoto] = useUploadPhotoMutation();
  const route = useRouter();
  const [file, setFile] = useState<File | null>(null);

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
            await ThrowSuccess({ text: "Profile updated successfully" });

            resetForm();
          }

          if (!file || data?.updateUserProfile?.errors) {
            await ThrowError({ text: "Missing field info" });
            return;
          }

          const { data: photo } = await uploadPhoto({
            values: {
              file: {
                filename: RenameFile({ file }),
                mimetype: file.type,
                size: file.size,
              },
            },
          });

          // uploads to S3 bucket
          await uploadToS3({
            file,
            signedRequest: photo?.uploadPhoto.signedRequest,
          });

          const success = await ThrowSuccess({
            text: "Profile updated successfully",
          });

          if (success) {
            setFile(null);
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
            <div className="mt-2">
              <label className="mb-2 block">Upload Picture</label>
              <Dropzone onDrop={async (files) => setFile(files[0])}>
                {({
                  isDragActive,
                  getInputProps,
                  getRootProps,
                  acceptedFiles,
                }) => (
                  <section>
                    {acceptedFiles[0] && (
                      <ShowUploadedImage file={acceptedFiles[0]} />
                    )}
                    <div
                      {...getRootProps()}
                      className={`outline-dashed p-10 text-center transition-all cursor-pointer ${
                        isDragActive
                          ? "outline-secondary bg-secondary"
                          : "bg-transparent outline-white"
                      }
                      ${acceptedFiles[0] ? "mt-2" : "mt-0"}
                      `}
                    >
                      <input
                        {...getInputProps()}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                      {isDragActive ? (
                        <span className="text-xl text-white">
                          Drop image here
                        </span>
                      ) : (
                        <span>
                          <span className="rounded-md shadow-sm py-2 px-4 bg-white text-dark mr-2">
                            Upload Picture
                          </span>
                          <span>Or drag and drop files .jpg, .png, .webp</span>
                        </span>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
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

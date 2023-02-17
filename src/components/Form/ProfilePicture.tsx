import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { useMeQuery, useUploadPhotoMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import { ThrowError, ThrowSuccess } from "../../utils/swal";
import Button from "../Button";

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
    <div className="overflow-hidden w-24 h-24 outline-dashed rounded-full">
      <img ref={ref} className="object-cover" alt="kevin nacario" />
    </div>
  );
};

const ProfilePicture = () => {
  const [{ fetching }, uploadPhoto] = useUploadPhotoMutation();
  const route = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [data, {}] = useMeQuery();
  console.log(data.data?.me);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    try {
      // Uploads an image
      const { data: photo } = await uploadPhoto({
        options: {
          filename: file.name,
          type: file.type,
        },
      });

      if (photo?.uploadPhoto.error) {
        await ThrowError({ text: photo.uploadPhoto.error.message });
        return;
      }

      if (!photo?.uploadPhoto.signedRequest) {
        await ThrowError({ text: "No signed request url" });
        return;
      }

      // REST
      await axios.put(photo?.uploadPhoto.signedRequest, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      const success = await ThrowSuccess({
        text: "Profile updated successfully",
      });

      if (!success) return;
      route.push(RoutePattern.HOME);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={onSubmit}>
        <div className="mt-2">
          <label className="mb-2 block">Upload Picture</label>
          <Dropzone onDrop={async (files) => setFile(files[0])}>
            {({ isDragActive, getInputProps, getRootProps, acceptedFiles }) => (
              <section>
                {acceptedFiles[0] ? (
                  <ShowUploadedImage file={acceptedFiles[0]} />
                ) : (
                  <div
                    {...getRootProps()}
                    className={`outline-dashed outline-light-mode dark:outline-white p-10 text-center transition-all cursor-pointer ${
                      isDragActive && "outline-secondary bg-secondary"
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
                        <span className="rounded-md shadow-sm py-2 px-4 bg-dark text-light dark:text-dark dark:bg-white mr-2">
                          Upload Picture
                        </span>
                        <span>Or drag and drop files .jpg, .png, .webp</span>
                      </span>
                    )}
                  </div>
                )}
              </section>
            )}
          </Dropzone>
        </div>
        <div className="mt-7">
          <Button type="submit" isSubmitting={fetching}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePicture;

import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useCreatePostMutation } from "../gen/graphql";
import Button from "./Button";
import TextAreaField from "./Form/TextAreaField";

const CreateFeed = () => {
  const [, createPost] = useCreatePostMutation();

  return (
    <div className="flex flex-col rounded-md bg-light text-dark dark:text-light dark:bg-dark w-full shadowm-sm overflow-hidden">
      <Formik
        initialValues={{ body: "" }}
        onSubmit={async (values, { resetForm }) => {
          await createPost({ input: values });

          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextAreaField
              className="w-full p-5 dark:bg-dark dark:text-light outline-none"
              name="body"
              placeholder="What's happening?"
              rows={1}
            />
            <div className="p-5 flex flex-row items-center justify-between">
              <div>
                <Button type="submit" isSubmitting={isSubmitting}>
                  Post
                </Button>
              </div>
              <div className="gap-5 flex">
                <button>
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <span>Drag and drop</span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFeed;

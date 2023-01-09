import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Button from "./Button";
import TextAreaField from "./Form/TextAreaField";

const CreateFeed = () => {
  return (
    <div className="flex flex-col rounded-md bg-dark w-full shadowm-sm overflow-hidden">
      <Formik
        initialValues={{ body: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextAreaField
              className="w-full p-5 bg-dark text-light outline-none"
              name="body"
              placeholder="What's happening?"
              rows={1}
            />
            <div className="p-5 flex flex-row items-center justify-between text-light">
              <div>
                <Button isSubmitting={isSubmitting}>Post</Button>
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

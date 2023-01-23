import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import InputField from "./Form/InputField";
import Img from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import ButtonSecondary from "./ButtonSecondary";

const Comments = () => {
  return (
    <div className="p-5">
      <span>Comments</span>
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="relative">
              <InputField
                name="comment"
                type="comment"
                placeholder="Leave your comment"
                className="mt-2 p-2 rounded-md shadow-md bg-light dark:bg-dark"
              />
              <ButtonSecondary
                className="absolute top-1/2 transform -translate-y-1/2 right-2"
                type="submit"
                isSubmitting={isSubmitting}
              >
                Comment
              </ButtonSecondary>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-5 flex">
        <div className="h-7 w-7 mr-5 border-2 dark:border-dark rounded-full overflow-hidden">
          <Img className="object-cover" src={PROFILE_IMG} alt="kevin nacario" />
        </div>
        <p>Amazing as always!</p>
        <div className="ml-auto">
          <button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;

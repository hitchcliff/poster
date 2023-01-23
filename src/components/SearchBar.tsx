import { Form, Formik } from "formik";
import InputField from "./Form/InputField";

const SearchBar = () => {
  return (
    <div className="flex flex-col w-full text-dark dark:text-light ">
      <h2 className="font-bold">Search</h2>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={() => {
          console.log("submitted");
        }}
      >
        {() => (
          <Form>
            <InputField
              name="search"
              placeholder="Search something..."
              className="bg-light text-dark dark:bg-dark dark:text-light p-2 rounded-md"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;

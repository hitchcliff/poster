import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import InputField from "../components/Form/InputField";

export default function Home() {
  return (
    <div className="bg-light min-h-screen">
      <div className="flex flex-row justify-between items-center mx-auto h-screen">
        <div className="w-full h-full px-10 flex flex-col">
          <div className="my-auto">
            <h1 className="text-5xl uppercase font-brand text-primary">
              poster.io
            </h1>
            <p className="mt-5 text-2xl">
              A lightweight social media app,{" "}
              <span className="text-primary font-bold">WELCOME!</span>
            </p>
            <p className="text-xl mt-5">
              This app is built in NextJs, Postress, NodeJs, Graphql, Urql,
              Apollo, and Redis.
            </p>
          </div>

          <div className="pb-5">
            <span>
              Develop with{" "}
              <FontAwesomeIcon className="text-red-600" icon={faHeart} /> by{" "}
              <a
                className="underline text-primary"
                href="httpsL//kevinnacario.com"
                target="_blank"
                rel="noreferrer"
              >
                Kevin Nacario
              </a>
            </span>
          </div>
        </div>

        <div className="primary-gradient w-full h-full p-10 flex flex-col justify-center">
          <div>
            <h2>Login</h2>
            <div className="bg-white rounded-md shadow-md p-5">
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      label="username"
                      name="username"
                      placeholder="enter username"
                    />
                    <button type="submit">Submit</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

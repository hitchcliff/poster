import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import InputField from "../components/Form/InputField";
import { useLoginMutation } from "../gen/graphql";
import toRecordError from "../utils/toRecordError";

export default function Home() {
  const [, login] = useLoginMutation();
  const route = useRouter();

  return (
    <div className="bg-light min-h-screen">
      <div className="flex flex-row justify-between items-center mx-auto h-screen">
        <div className="w-full h-full px-10 flex flex-col relative">
          <div className="my-auto">
            <h1 className="text-5xl uppercase font-brand text-primary">
              poster.tk
            </h1>
            <p className="mt-5 text-2xl">
              A lightweight social media app,{" "}
              <span className="text-primary font-bold">WELCOME!</span>
            </p>
            <p className="text-xl mt-5">
              This app is built in NextJs, Postress, NodeJs, Graphql, Urql,
              Apollo, and Redis.{" "}
              <a
                className="italic text-blue-500 underline"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                View code in Github
              </a>
            </p>
          </div>

          <div className="pb-5 absolute bottom-5 w-full">
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
            <h2 className="text-light text-2xl">Login to your account</h2>
            <div className="bg-white rounded-md shadow-md p-5 mt-5">
              <Formik
                key={1}
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login({ options: values });
                  const errors = response.data?.login.errors;

                  if (errors) {
                    setErrors(toRecordError(errors));
                  } else if (response.data?.login.user) {
                    route.push("/");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <InputField
                        label="username"
                        name="username"
                        placeholder="enter username"
                        type="text"
                      />
                    </div>

                    <div className="mt-2">
                      <InputField
                        type="password"
                        label="password"
                        name="password"
                        placeholder="enter password"
                      />
                    </div>

                    <div className="mt-5">
                      <Button type="submit" isSubmitting={isSubmitting}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-light mt-5 flex flex-row">
              <h2 className="mr-2">Dont have an account?</h2>
              <Link className="underline italic" href="/register">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

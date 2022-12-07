import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "urql";
import Button from "../components/Button";
import InputField from "../components/Form/InputField";

const PostsQuery = `
  
query {
  posts {
    id
    title
  }
}

`;

export default function Home() {
  const [{ data, error }] = useQuery({
    query: PostsQuery,
  });

  useEffect(() => {
    console.log(data);
  }, []);

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
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values) => {
                  console.log(values);
                  return new Promise((res) => {
                    setTimeout(() => {
                      if (!values.username) {
                        return res(false);
                      }
                      return res(true);
                    }, 1000);
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <InputField
                        label="username"
                        name="username"
                        placeholder="enter username"
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

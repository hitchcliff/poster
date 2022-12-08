import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import InputField from "../components/Form/InputField";
import LoginForm from "../components/Form/LoginForm";
import { useLoginMutation } from "../gen/graphql";
import RoutePattern from "../routes/RoutePattern";
import toRecordError from "../utils/toRecordError";

export default function Home() {
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
            <h2 className="text-light">Login to your account</h2>
            <LoginForm />
            <div className="text-light mt-5 flex flex-row">
              <h2 className="mr-2">Dont have an account?</h2>
              <Link className="underline italic" href={RoutePattern.REGISTER}>
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

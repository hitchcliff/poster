import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoginForm from "../components/Form/LoginForm";
import Loader from "../components/Loader";
import { useAuthService } from "../hooks";
import { RootState } from "../redux/store";
import RoutePattern from "../routes/RoutePattern";
import createUrqlClient from "../urql/createUrqlClient";
import useLoadingState from "../hooks/useLoadingState";

const Index = () => {
  const loading = useSelector((state: RootState) => state.global.loading);
  useLoadingState();
  useAuthService();

  if (loading) return null;

  return (
    <div className="bg-light min-h-screen relative">
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
            <div className="mt-5">
              <Link className="text-white" href={RoutePattern.FORGOT_PASSWORD}>
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

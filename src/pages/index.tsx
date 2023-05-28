import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoginForm from "../components/Form/LoginForm";
import PublicRoute from "../components/Route/PublicRoute";
import useLoadingState from "../hooks/useLoadingState";
import { RootState } from "../redux/store";
import RoutePattern from "../routes/RoutePattern";

const Index = () => {
  const loading = useSelector((state: RootState) => state.global.loading);
  useLoadingState();

  if (loading)
    return (
      <>
        <div></div>
      </>
    );

  return (
    <div className="bg-light min-h-screen relative">
      <div className="flex flex-row justify-between items-center mx-auto h-screen">
        <div className="w-full h-full px-10 flex flex-col relative">
          <div className="my-auto">
            <h1 className="text-5xl uppercase font-brand text-primary">
              poster.asia
            </h1>
            <p className="mt-5 text-2xl">
              A lightweight social media app,{" "}
              <span className="text-primary font-bold">WELCOME!</span>
            </p>
            <p className="text-xl mt-5">
              This app is built in NextJs, Postress, NodeJs, Graphql, Urql,
              Apollo, Redis, AWS, and much more.
            </p>
          </div>

          <div className="pb-5 absolute bottom-5 w-full">
            <span>
              Develop with{" "}
              <FontAwesomeIcon className="text-red-600" icon={faHeart} /> by{" "}
              <a
                className="underline text-primary"
                href="https://www.linkedin.com/in/kevin-nacario-57485718a/"
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

export default PublicRoute(Index, { ssr: true });

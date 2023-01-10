import Link from "next/link";
import LoginForm from "../components/Form/LoginForm";
import PublicRoute from "../components/Route/PublicRoute";
import RoutePattern from "../routes/RoutePattern";

const login = () => {
  return (
    <>
      <div className="bg-light py-10 min-h-screen flex justify-center items-center">
        <div className="w-5/6 md:w-3/4 lg:w-1/2">
          <h2 className="text-dark font-bold">Login to your account</h2>
          <LoginForm />
          <div className="mt-5 flex flex-row">
            <h2 className="mr-2">Don't have an account?</h2>
            <Link
              className="underline italic text-primary"
              href={RoutePattern.REGISTER}
            >
              Register here
            </Link>
          </div>
          <div className="mt-5">
            <Link className="text-dark" href={RoutePattern.FORGOT_PASSWORD}>
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicRoute(login);

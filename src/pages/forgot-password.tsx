import Link from "next/link";
import RoutePattern from "../routes/RoutePattern";
import ForgotPasswordForm from "../components/Form/ForgotPasswordForm";
import { withUrqlClient } from "next-urql";
import createUrqlClient from "../urql/createUrqlClient";

const ForgotPassword = () => {
  return (
    <>
      <div className="bg-light py-10 min-h-screen flex justify-center items-center">
        <div className="w-5/6 md:w-3/4 lg:w-1/2">
          <h2 className="text-dark font-bold">Forgot password</h2>
          <ForgotPasswordForm />
          <div className="mt-5 flex flex-row">
            <h2 className="mr-2">Don't have an account?</h2>
            <Link
              className="underline italic text-primary"
              href={RoutePattern.REGISTER}
            >
              Register here
            </Link>
          </div>
          <div className="mt-5 flex flex-row">
            <h2 className="mr-2">Already have an account?</h2>
            <Link
              className="underline italic text-primary"
              href={RoutePattern.LOGIN}
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

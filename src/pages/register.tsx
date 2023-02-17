import { withUrqlClient } from "next-urql";
import Link from "next/link";
import RegisterForm from "../components/Form/RegisterForm";
import RoutePattern from "../routes/RoutePattern";
import createUrqlClient from "../urql/createUrqlClient";

const register = () => {
  return (
    <>
      <div className="bg-light py-10 min-h-screen flex justify-center items-center">
        <div className="w-5/6 md:w-3/4 lg:w-1/2">
          <h2 className="text-dark font-bold">Signup an account</h2>
          <RegisterForm />
          <div className="mt-5 flex flex-row">
            <h2 className="mr-2">Already have an account?</h2>
            <Link
              className="underline italic text-primary"
              href={RoutePattern.LOGIN}
            >
              Login here
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

export default withUrqlClient(createUrqlClient)(register);

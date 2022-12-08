import Link from "next/link";
import RegisterForm from "../components/Form/RegisterForm";
import RoutePattern from "../routes/RoutePattern";

const register = () => {
  return (
    <>
      <div className="bg-light min-h-screen flex justify-center items-center">
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
        </div>
      </div>
    </>
  );
};

export default register;

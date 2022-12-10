import { withUrqlClient } from "next-urql";
import Link from "next/link";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm";
import RoutePattern from "../../routes/RoutePattern";
import createUrqlClient from "../../urql/createUrqlClient";

const ChangePassword = ({ ...props }) => {
  return (
    <div className="bg-light py-10 min-h-screen flex justify-center items-center">
      <div className="w-5/6 md:w-3/4 lg:w-1/2">
        <h2 className="text-dark font-bold">Change Password</h2>
        <ChangePasswordForm token={props.token} />
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
  );
};

export async function getServerSideProps(context: any) {
  const { token } = context.query;

  return {
    props: {
      token: token,
    },
  };
}

export default withUrqlClient(createUrqlClient)(ChangePassword);

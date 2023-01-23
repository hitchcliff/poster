import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const ButtonSecondary = ({ isSubmitting, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={
        props.className +
        "  z-50 block bg-blue-500 text-white rounded-sm p-1 px-5 text-sm"
      }
    >
      {isSubmitting ? (
        <span className="flex flex-row items-center">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="block">{props.children}</span>
      )}
    </button>
  );
};

export default ButtonSecondary;

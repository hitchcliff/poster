import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, useField } from "formik";
import { InputHTMLAttributes } from "react";

type UploadFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder?: string;
};

const UploadField = ({ label, placeholder, ...props }: UploadFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <div className="flex flex-col">
      {label && <label className="capitalize">{label}</label>}
      <input
        className="absolute top-0 left-0 opacity-0 w-full h-full text-dark mt-2 block py-2 px-2 rounded-md bg-light border border-red-500 placeholder:capitalize"
        style={{ border: !!error ? "1px solid rgb(239 68 68)" : "none" }}
        id={field.name}
        placeholder={placeholder}
        type="file"
        {...field}
        {...props}
      />
      {!!error && (
        <span className="text-red-500 px-2 mt-2 text-sm">
          <FontAwesomeIcon icon={faWarning} className="mr-2" />
          {error}
        </span>
      )}
    </div>
  );
};

export default UploadField;

import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import { TextareaHTMLAttributes } from "react";

type InputFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
  placeholder?: string;
};

const TextAreaField = ({ label, placeholder, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <div className="flex flex-col">
      {label && <label className="capitalize">{label}</label>}
      <textarea
        className="mt-2 block py-2 px-2 bg-light border border-red-500 placeholder:capitalize"
        style={{ border: !!error ? "1px solid rgb(239 68 68)" : "none" }}
        id={field.name}
        placeholder={placeholder}
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

export default TextAreaField;

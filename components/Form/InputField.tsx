import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputField = ({ label, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <div className="flex flex-col">
      <label className="capitalize" htmlFor={field.name}>
        {label}
      </label>
      <input
        className="mt-2 block py-2 px-2 bg-light placeholder:capitalize"
        {...field}
        {...props}
        name={field.name}
      />
      {!!error && <span>{error}</span>}
    </div>
  );
};

export default InputField;

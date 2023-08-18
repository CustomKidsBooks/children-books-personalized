import React from "react";
import { ReusableInputProps } from "@utils/interfaces";
import { twMerge } from "tailwind-merge";

const ReusableInput: React.FC<ReusableInputProps> = ({
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  options,
  rows,
  className,
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="form_input shadow"
        >
          {options &&
            options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      );
    } else if (type === "textarea") {
      return (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className={twMerge(`form_input shadow ${className}`)}
        />
      );
    } else {
      return (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="form_input shadow w-full"
        />
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      {renderInput()}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ReusableInput;
import React from "react";
interface ReusableInputProps {
  label: string;
  name: string;
  type: "text" | "number" | "select" | "textarea";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  options?: string[]; // Only used for select type
  rows?: number; // Only used for textarea type
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  options,
  rows,
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
          className="form_input"
        >
          {options && options.map((option) => (
            <option key={option} value={option}>{option}</option>
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
          className="form_input"
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
          className="form_input"
        />
      );
    }
  };

  return (
    <div className="flex flex-col mt-5">
      <label htmlFor={name}>{label}</label>
      {renderInput()}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ReusableInput;

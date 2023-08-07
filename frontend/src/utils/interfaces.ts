export interface FormValues {
  title: string;
  ageGroup: string;
  subject: string;
  name?: string;
  description?: string;
  lesson?: string;
  characters?: string[];
}
export interface AdditionalField {
  name: string;
  description: string;
}
export interface LogInFormValues {
  username: string;
  password: string;
}
export interface SignUpFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}
export interface ReusableInputProps {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "textarea";
  value?: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onBlur: (
    event: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  error?: string;
  placeholder?: string;
  options?: string[];
  rows?: number;
  className?: string;
}

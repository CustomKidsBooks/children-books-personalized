export interface BookValues {
  id: number;
  title: string;
  desc?: string;
  author?: string;
  page?: number;
  image?: string;
  tag?: string;
}

export interface CreateStoryFormValues {
  title: string;
  ageGroup: string;
  subject: string;
  page: number;
  lesson?: string;
  characters?: AdditionalField[];
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

export interface AdditionalField {
  name: string;
  description: string;
}

export interface ReusableInputProps {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "textarea" | "password" | "email";
  value?: string | number;
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

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface DeleteModalProps extends ModalProps {
  title: string;
  text?: string;
  buttonText?: string;
  extra?: React.ReactNode;
  cancel?: boolean;
  height?: string;
  width?: string;
  onConfirm: () => void;
}
export interface SendEmailModalProps {
  email: string;
}

export interface ToastModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}
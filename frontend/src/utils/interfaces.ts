export interface FormValues {
  title: string;
  ageGroup: string;
  subject: string;
  name?: string;
  description?: string;
  lesson?: string;
  characters?: string[];
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

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface DelModalProps {
  title: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  close?: () => void;
  isVisible?: boolean;
}

export interface DeleteModalProps {
  onClose: () => void;
  title: string;
  text: string;
  buttonText: string;
  cancel?: boolean;
  onConfirm: () => void;
  height?: string;
  isVisible: boolean;
}
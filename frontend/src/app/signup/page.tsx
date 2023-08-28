"use client";
import { useState } from "react";
import SignUpForm from "@components/SignUpForm";
import { SignUpFormValues } from "@utils/interfaces";
import { axiosInstance } from "@services/api-client";

const SignUp = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  const SignUpPrompt = async (values: SignUpFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <SignUpForm
      handleSubmit={SignUpPrompt}
    />
  );
};

export default SignUp;

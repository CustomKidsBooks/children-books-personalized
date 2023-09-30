"use client";
import { useState } from "react";
import LoginForm from "@components/LoginForm";
import { LoginFormValues } from "@utils/interfaces";
import { axiosInstance } from "@services/api-client";

const Login = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  const LoginPrompt = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/login", {
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
    setIsSubmitting(false);
  };

  return <LoginForm handleSubmit={LoginPrompt} />;
};

export default Login;

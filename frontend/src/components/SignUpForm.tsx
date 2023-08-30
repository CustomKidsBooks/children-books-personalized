"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { signUpValidationSchema } from "@utils/signUpValidation";
import ReusableInput from "./ReusableInput";
import { SignUpFormValues } from "@utils/interfaces";
import { LinkButton } from "@ui/LinkButton";
import Modal from "@components/Modal";
import LoginForm from "@components/LoginForm";

interface SignUpFormProps {
  handleSubmit: (values: SignUpFormValues) => Promise<void>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  handleSubmit,
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit: formikSubmit,
  } = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  //TODO comment: add functionalities to the signup form once the signup API is done

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="inline-flex flex-col justify-center items-center form-card border-bg">
          <h1 className="font-extrabold text-pink-deep label-input text-2xl -mt-10">
            Sign In
          </h1>
          <form onSubmit={formikSubmit} className="flex flex-col justify-center">
            <div className="place-item gap-px">
              <label
                htmlFor="name"
                className="label-text"
              >
                Name
                <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? (
                <div className="asterisk">{errors.name}</div>
              ) : null}
            </div>
            <div className="place-item gap-px">
              <label
                htmlFor="email"
                className="label-text"
              >
                Email
                <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <div className="asterisk">{errors.email}</div>
              ) : null}
            </div>
            <div className="place-item">
              <label
                htmlFor="password"
                className="label-text"
              >
                Password
                <span className="asterisk">*</span>
              </label>
              <ReusableInput
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <div className="asterisk">{errors.password}</div>
              ) : null}
            </div>
            <div className="flex-center mt-4">
              <LinkButton href="/" intent="pink" size="small">
                Create my account
              </LinkButton>
            </div>
          </form>
          <div className="flex-center text-base font-quicksand font-semibold">
            <p>Already have an account?{" "}
              <Link href="#" onClick={(e) => {
              e.preventDefault();
              openLoginModal();
            }} className="text-pink font-bold">
                Login<span className="text-black">!</span>
              </Link></p>
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <Modal isVisible={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
          <LoginForm handleSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  );
};

export default SignUpForm;

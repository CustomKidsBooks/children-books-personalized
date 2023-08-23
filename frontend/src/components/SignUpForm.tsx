"use client";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { signUpValidationSchema } from "@utils/signUpValidation";
import ReusableInput from "./ReusableInput";
import { SignUpFormValues } from "@utils/interfaces";
import { LinkButton } from "@ui/LinkButton";

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

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="inline-flex flex-col justify-center items-center form-card border-bg">
          <h1 className="font-extrabold text-pink-deep label-input text-2xl -mt-10">
            Sign In
          </h1>
          <form onSubmit={formikSubmit} className="flex flex-col justify-center">
              <div className="flex flex-col justify-end items-start gap-px">
                <label
                  htmlFor="name"
                  className="text-lg font-bold font-quicksand"
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
              <div className="flex flex-col justify-end items-start gap-px">
                <label
                  htmlFor="email"
                  className="text-lg font-bold font-quicksand"
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
              <div className="flex flex-col justify-end items-start">
                <label
                  htmlFor="password"
                  className="text-lg font-bold font-quicksand"
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
            <div className="flex flex-col justify-center items-center mt-4">
              <LinkButton href="/" intent="pink" size="small">
                Create my account
              </LinkButton>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center text-base font-quicksand font-semibold">
            <p>Already have an account?{" "}
              <Link href="/login" className="text-pink font-bold">
                Login<span className="text-black">!</span>
              </Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;

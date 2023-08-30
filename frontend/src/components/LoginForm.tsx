"use client";
import React from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { loginValidationSchema } from "@utils/loginValidation";
import ReusableInput from "./ReusableInput";
import { LoginFormValues } from "@utils/interfaces";
import { LinkButton } from "@ui/LinkButton";

interface LoginFormProps {
  handleSubmit: (values: LoginFormValues) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit: formikSubmit,
  } = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  //TODO comment: add functionalities to the login form once the login API is done

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="inline-flex flex-col justify-center items-center form-card border-bg">
          <h1 className="font-bold text-pink-deep label-input text-2xl -mt-4">
            Login
          </h1>
          <form onSubmit={formikSubmit} className="flex flex-col justify-center">
            <div className="flex flex-col gap-4">
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
              <div className="place-item gap-px">
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
            </div>
            <div className="flex items-center h-5">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 rounded-md border-bg" />
              <label htmlFor="default-checkbox" className="ml-2 mr-4 font-medium text-black tracking-widest text-base">Remember me</label>
            </div>
            <div className="flex-center mt-8">
              <LinkButton href="/" intent="pink" size="small" className="flex items-center justify-center w-full">
                Login
              </LinkButton>
            </div>
          </form>
          <div className="flex-center text-base font-quicksand font-semibold">
            <p>Doesn&apos;t have an account?{" "}
              <Link href="/signup" className="text-pink font-bold">
                Sign in<span className="text-black">!</span>
              </Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
"use client";

import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { SignUpFormValues } from "@utils/interfaces";
import { Heading } from "@ui/Heading";
import { Button } from "@ui/Button";

const SignUpForm = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<SignUpFormValues>({
      initialValues: {
        username: "",
        password: "",
        confirmPassword: "",
      },

      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <section className="grid content-center max-w-full">
      <h1 className={Heading({ align: "center", size: "small" })}>Sign up</h1>
      <p className="mt-10 text-center">Enter your username and password</p>
      <form onSubmit={handleSubmit} className="mt-3 w-96">
        <div>
          <input
            type="text"
            name="username"
            id="username"
            className="form_input"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username ? (
            <div>{errors.username}</div>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            className="form_input"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <div>{errors.password}</div>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            id="password"
            className="form_input"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <div>{errors.confirmPassword}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          intent="primary"
          size="medium"
          className="text-white w-full mt-5"
        >
          Sign up
        </Button>
      </form>
      <p className="mt-5">
        Already have an account{" "}
        <Link href="/login" className="text-blue-500 hover:text-red-500">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;

"use client";

import { LogInFormValues } from "@utils/interfaces";
import { useFormik } from "formik";
import React from "react";

const LogInForm = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<LogInFormValues>({
      initialValues: {
        username: "",
        password: "",
      },

      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <section className="grid content-center max-w-full">
      <h1 className="text-center font-bold text-3xl mt-10">Log in</h1>

      <form onSubmit={handleSubmit} className="mt-10 w-96">
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
        <button
          type="submit"
          className="w-full rounded-md bg-sky-500 py-3 mt-5"
        >
          Log in
        </button>
      </form>
    </section>
  );
};

export default LogInForm;

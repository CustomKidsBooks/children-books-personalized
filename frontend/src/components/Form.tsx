"use client";

import { useFormik } from "formik";
import React from "react";

interface FormValues {
  subject: string;
  character: string;
  message: string;
  description: string;
  ageGroup: number;
  //   special_needs?: string;
  //   language: string;
}

const characterList: string[] = [
  "boy",
  "girl",
  "toy",
  "superhero",
  "car",
  "pet",
  "other",
];

const Form = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        subject: "",
        character: "",
        message: "",
        description: "",
        ageGroup: 0,
        // special_needs: "",
        // language: "",
      },

      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <section className="w-full max-w-full">
      <h1 className="head_text text-left">Create Story</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex-col gap-7"
      >
        <div className="flex flex-col mt-5">
          <label htmlFor="subject" className="my-3">
            Subject of a story
          </label>
          <textarea
            name="subject"
            id="subject"
            cols={20}
            rows={5}
            placeholder="Ex. A young girl name sara loves exploring a world. And she faces challenges along the way. "
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {touched.subject && errors.subject ? (
            <div>{errors.subject}</div>
          ) : null}
        </div>

        <div className="mt-5 flex">
          <div className="flex flex-col w-2/5 p-3">
            <label htmlFor="character" className="m-1">
              Choose the character
            </label>
            <select
              className="p-2"
              name="character"
              id="character"
              value={values.character}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {characterList.map((character) => (
                <option value={character} key={character} className="">
                  A {character}
                </option>
              ))}
            </select>
            {touched.character && errors.character ? (
              <div>{errors.character}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-3/5 p-3">
            <label htmlFor="message">Message to convey</label>
            <input
              type="text"
              name="message"
              id="message"
              className="form_input"
              placeholder="Importance of playing alone and free"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.message && errors.message ? (
              <div>{errors.message}</div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col mt-5 gap-5">
          <label htmlFor="description" className="">
            Character description:
          </label>
          <textarea
            name="description"
            id="description"
            cols={20}
            rows={5}
            className="m-3"
            placeholder="Ex. A young girl with curly brown hair and brown green eyes."
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {touched.description && errors.description ? (
            <div>{errors.description}</div>
          ) : null}
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="ageGroup" className="">
            Enter your desire age group
          </label>
          <input
            type="number"
            name="ageGroup"
            id="ageGroup"
            className="form_input"
            value={values.ageGroup}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span>* Please Enter a number</span>
          {touched.ageGroup && errors.ageGroup ? (
            <div>{errors.ageGroup}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full rounded-none bg-sky-500 p-2 m-5"
        >
          Create
        </button>
      </form>
    </section>
  );
};

export default Form;

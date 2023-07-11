"use client";

import {
  characterList,
  specialNeedsList,
  languageList,
} from "@utils/constants";
import { Button } from "@ui/Button";
import { FormValues } from "@utils/interfaces";
import { useFormik } from "formik";
import React from "react";
import { Heading } from "@ui/Heading";

const Form = () => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
    useFormik<FormValues>({
      initialValues: {
        subject: "",
        character: "boy",
        message: "",
        description: "",
        ageGroup: 0,
        specialNeeds: "",
        language: "English",
      },

      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <section className="w-full max-w-full m-4">
      <h1 className={Heading({ align: "left", size: "small" })}>
        Create Story
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex-col gap-7"
      >
        <div className="flex flex-col mt-5">
          <label htmlFor="subject">Subject of a story</label>
          <textarea
            name="subject"
            id="subject"
            cols={20}
            rows={5}
            className="my-3"
            placeholder="Ex. A young girl name sara loves exploring a world. And she faces challenges along the way. "
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {touched.subject && errors.subject ? (
            <div>{errors.subject}</div>
          ) : null}
        </div>

        <div className="mt-5 flex-between grid justify-items-stretch">
          <div className="flex flex-col w-2/5 justify-items-start">
            <label htmlFor="character">Choose the character</label>
            <select
              className="my-3 p-3"
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

          <div className="flex flex-col w-2/4 justify-self-end">
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

        <div className="flex flex-col mt-5">
          <label htmlFor="description" className="">
            Character description:
          </label>
          <textarea
            name="description"
            id="description"
            cols={20}
            rows={5}
            className="my-3"
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
          <span className="text-neutral-400">* Please Enter a number</span>
          {touched.ageGroup && errors.ageGroup ? (
            <div>{errors.ageGroup}</div>
          ) : null}
        </div>

        <div className="mt-5 flex-between grid justify-items-stretch">
          <div className="flex flex-col w-2/5 justify-items-start">
            <label htmlFor="specialNeeds" className="m-1">
              Special Needs of Children:
            </label>
            <select
              className="my-3 p-3"
              name="specialNeeds"
              id="specialNeeds"
              value={values.specialNeeds}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {specialNeedsList.map((need) => (
                <option value={need} key={need} className="">
                  A {need}
                </option>
              ))}
            </select>
            {touched.specialNeeds && errors.specialNeeds ? (
              <div>{errors.specialNeeds}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-2/4 justify-self-end">
            <label htmlFor="language">Language: </label>
            <select
              className="my-3 p-3"
              name="language"
              id="language"
              value={values.language}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              {languageList.map((language) => (
                <option value={language} key={language} className="">
                  A {language}
                </option>
              ))}
            </select>
            {touched.language && errors.language ? (
              <div>{errors.language}</div>
            ) : null}
          </div>
        </div>

        <Button
          type="submit"
          intent="gradiant"
          size="large"
          className="text-white"
        >
          Create &#10024;
        </Button>
      </form>
    </section>
  );
};

export default Form;

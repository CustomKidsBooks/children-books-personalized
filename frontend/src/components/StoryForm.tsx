"use client";
import {
  characterList,
  specialNeedsList,
  languageList,
} from "@utils/constants";
import { Button } from "@ui/Button";
import { FormValues } from "@utils/interfaces";
import { useFormik } from "formik";
import { createStoryValidationSchema } from "@utils/storyValidation";
import React from "react";
import { Heading } from "@ui/Heading";
import ReusableInput from "./ReusableInput";
interface FormProps {
  handleSubmit: (values: FormValues) => Promise<void>;
}

const StoryForm: React.FC<FormProps> = ({ handleSubmit }) => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit: formikSubmit } =
    useFormik<FormValues>({
      initialValues: {
        subject: "",
        characters: "boy",
        name: "",
        description: "",
        ageGroup: 0,
        lesson: "",
        title: "",
      },
      validationSchema: createStoryValidationSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

  return (
    <section className="w-full max-w-full m-4">
      <h1 className={Heading({ align: "left", size: "small" })}>
        Create Story
      </h1>
      <form
        onSubmit={formikSubmit}
        className="mt-10 w-full max-w-2xl flex-col gap-7"
      >
        <div className="flex flex-col mt-5">
          <ReusableInput
            label="Subject of a story"
            name="subject"
            type="textarea"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex. A young girl named Arpi loves exploring the world and she faces challenges along the way."
            rows={5}
          />
          {/* <textarea
            name="subject"
            id="subject"
            cols={20}
            rows={5}
            className="my-3"
            placeholder="Ex. A young girl named Sara loves exploring the world and she faces challenges along the way. "
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea> */}
          {touched.subject && errors.subject ? (
            <div>{errors.subject}</div>
          ) : null}
        </div>
        <div className="mt-5 flex-between grid justify-items-stretch">
          <div className="flex flex-col w-2/5 justify-items-start">
            <ReusableInput
              label="Choose the character"
              name="character"
              type="select"
              value={values.characters}
              onChange={handleChange}
              onBlur={handleBlur}
              options={characterList}
            />
            {/* <select
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
            </select> */}
            {touched.characters && errors.characters ? (
              <div>{errors.characters}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-2/4 justify-self-end">
            <label htmlFor="message">Name</label>
            <input
              type="text"
              name="name"
              id="message"
              className="form_input"
              placeholder="Importance of playing alone and free"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name ? (
              <div>{errors.name}</div>
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
            placeholder="Ex. A young girl with curly brown hair and green eyes."
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {touched.description && errors.description ? (
            <div>{errors.description}</div>
          ) : null}
        </div>

        <div className="flex flex-col mt-5">
          {/* <label htmlFor="ageGroup" className="">
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
          /> */}
          <ReusableInput
            label="Age"
            name="ageGroup"
            type="number"
            value={values.ageGroup.toString()}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please Enter a number"
          />
          <span className="text-neutral-400">* Please Enter a number</span>
          {touched.ageGroup && errors.ageGroup ? (
            <div>{errors.ageGroup}</div>
          ) : null}
        </div>

        <div className="mt-5 flex-between grid justify-items-stretch">
          <div className="flex flex-col w-2/5 justify-items-start">
            {/* <label htmlFor="specialNeeds" className="m-1">
              Special Needs of Children:
            </label> */}
            <ReusableInput
              label="Lesson:"
              name="specialNeeds"
              type="select"
              value={values.lesson}
              onChange={handleChange}
              onBlur={handleBlur}
              options={languageList}
            />
            {/* <select
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
            </select> */}
            {touched.lesson && errors.lesson ? (
              <div>{errors.lesson}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-2/4 justify-self-end">
            {/* <select
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
            </select> */}
            <ReusableInput
              label="Title"
              name="title"
              type="select"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title ? (
              <div>{errors.title}</div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          intent="gradiant"
          size="large"
          className="text-white"
        >
          Write My Book;
        </Button>
      </form>
    </section>
  );
};

export default StoryForm;
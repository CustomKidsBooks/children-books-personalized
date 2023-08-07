"use client";
import {
  ageGroupList,
} from "@utils/constants";
import { Button } from "@ui/Button";
import { FormValues, AdditionalField, ReusableInputProps } from "@utils/interfaces";
import { useFormik } from "formik";
import { createStoryValidationSchema } from "@utils/storyValidation";
import React, { useState } from "react";
import Image from "next/image";
import { Heading } from "@ui/Heading";
import ReusableInput from "./ReusableInput";

interface FormProps {
  handleSubmit: (values: FormValues) => Promise<void>;
}
interface StoryFormProps extends FormProps {
  setAdditionalFields: React.Dispatch<React.SetStateAction<AdditionalField[]>>;
  additionalFields: AdditionalField[];
}

const StoryForm: React.FC<StoryFormProps> = ({ handleSubmit, setAdditionalFields, additionalFields }) => {
  const { values, handleChange, handleBlur, errors, touched, handleSubmit: formikSubmit } =
    useFormik<FormValues>({
      initialValues: {
        subject: "",
        name: "",
        description: "",
        ageGroup: "0-1",
        lesson: "",
        title: "",
      },
      validationSchema: createStoryValidationSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      },
    });

  const handleAddField = () => {
    setAdditionalFields([
      ...additionalFields,
      { name: "", description: "" }
    ]);
  };

  const handleAdditionalFieldChange = (
    index: number,
    field: keyof AdditionalField,
    value: string
  ) => {
    const updatedFields = [...additionalFields];
    updatedFields[index][field] = value;
    setAdditionalFields(updatedFields);
  };

  return (
    <section className="w-full max-w-2xl m-4">
      <h1 className={Heading({ align: "left", size: "small" })}>
        Create Story
      </h1>
      <form
        onSubmit={formikSubmit}
        className="mt-10 w-full max-w-2xl flex-col space-y-0.5 md:flex-row md:space-y-0"
      >
        <div className="md:grid md:grid-cols-1 gap-px m-3 sm:flex sm:flex-col">
          <div className="flex flex-col max-w-2xl md:w-3/4 md:pr-2">
            <div className="flex items-center">
              <label htmlFor="title" className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                <span>Title</span><span className="text-red-500">*</span>
              </label>
              <ReusableInput
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            </div>
            {touched.title && errors.title ? (
              <div>{errors.title}</div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label htmlFor="ageGroup" className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                <span>Age</span><span className="text-red-500">*</span>
              </label>
              <ReusableInput
                id="ageGroup"
                name="ageGroup"
                type="select"
                value={values.ageGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                options={ageGroupList}
              />
            </div>
            {touched.ageGroup && errors.ageGroup ? (
              <div>{errors.ageGroup}</div>
            ) : null}
          </div>
          <label htmlFor="details" className="font-bold font-quicksand text-pink font_feature text-xl  md:text-2xl tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose">Add more details:</label>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label htmlFor="subject" className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                Subject of the Story
              </label>
              <ReusableInput
                id="subject"
                name="subject"
                type="textarea"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ex. A young girl named Sara loves exploring the world"
                rows={2}
              />
            </div>
            {touched.subject && errors.subject ? (
              <div>{errors.subject}</div>
            ) : null}
          </div>

          <div className="flex flex-col text-sm md:w-1/2 md:pr-2">
            <div className="flex items-center">
              <label htmlFor="characters" className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2 ">Characters</label>
              <div className="flex items-center">
                <button id="addFieldButton" className="px-1 bg-white font-bold font-quicksand" onClick={handleAddField}>
                  <Image
                    src="/assets/pepicons-pop_plus.svg"
                    alt="Add"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
            </div>
            {additionalFields.map((field, index) => (
              <div key={index} className="flex flex-col mt-1">
                <div className="flex items-center">
                  <label htmlFor="subject" className="font-medium text-base md:text-lg font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                    Name:
                  </label>
                  <ReusableInput
                    id="name"
                    name={`name${index}`}
                    type="text"
                    value={field.name}
                    onChange={(e) => handleAdditionalFieldChange(index, "name", e.target.value)}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="subject" className="font-medium text-base md:text-lg font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                    Description:
                  </label>
                  <ReusableInput
                    id="description"
                    name={`description${index}`}
                    type="textarea"
                    value={field.description}
                    onChange={(e) => handleAdditionalFieldChange(index, "description", e.target.value)}
                    onBlur={handleBlur}
                    placeholder={`Ex. Description of the character`}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col text-sm md:w-1/2 md:pl-2">
            <div className="flex items-center">
              <label htmlFor="lesson" className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2">
                Lesson
              </label>
              <ReusableInput
                id="lesson"
                name="lesson"
                type="text"
                value={values.lesson}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.lesson && errors.lesson ? (
              <div>{errors.lesson}</div>
            ) : null}
          </div>
          <Button
            type="submit"
            intent="pink"
            size="medium"
            className="text-white text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal boxShadow rounded "
          >
            Write my book!
          </Button>
        </div>
      </form>
    </section>
  );
};

export default StoryForm;

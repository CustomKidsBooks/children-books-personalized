"use client";
import {
  ageGroupList,
} from "@utils/constants";
import { Button } from "@ui/Button";
import { FormValues, AdditionalField, ReusableInputProps } from "@utils/interfaces";
import { useFormik } from "formik";
import { createStoryValidationSchema } from "@utils/storyValidation";
import React, { useState } from "react";
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
  const ReusableInputMemo = React.memo(ReusableInput) as React.FC<ReusableInputProps>;

  const FlexLabelInput: React.FC<ReusableInputProps> = ({ label, ...inputProps }) => (
    <div className="flex items-center">
      <label className="mr-2">{label}</label>
      <ReusableInputMemo { ...(inputProps as ReusableInputProps)} />
    </div>
  );
  return (
    <section className="w-full max-w-full m-4">
      <h1 className={Heading({ align: "left", size: "small" })}>
        Create Story
      </h1>
      <form
        onSubmit={formikSubmit}
        className="mt-10 w-full max-w-2xl flex-col gap-7 md:flex-row md:flex-wrap"
      >
        <div className="flex flex-col mt-1 mb-1 font-bold md:w-1/2 md:pr-2">
        <FlexLabelInput
          label={<><span>Title</span><span className="text-red-500">*</span></>}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          />
          {touched.title && errors.title ? (
            <div>{errors.title}</div>
          ) : null}
        </div>
        <div className="flex flex-col mt-1 font-bold md:w-1/2 md:pl-2">
          <FlexLabelInput
            label={<><span>Age</span><span className="text-red-500">*</span></>}
            name="ageGroup"
            type="select"
            value={values.ageGroup.toString()}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please choose the range of age"
            options={ageGroupList}
          />
          {touched.ageGroup && errors.ageGroup ? (
            <div>{errors.ageGroup}</div>
          ) : null}
        </div>
        <label htmlFor="details" className="font-bold font-inter text-pink font_feature text-2xl">Add more details:</label>
        <div className="flex flex-col mt-5 font-bold">
          <FlexLabelInput
            label="Subject of the Story"
            name="subject"
            type="textarea"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex. A young girl named Sara loves exploring the world"
            rows={2}
          />
          {touched.subject && errors.subject ? (
            <div>{errors.subject}</div>
          ) : null}
        </div>

        <div className="flex flex-col mt-1 md:w-1/2 md:pr-2">
          <div className="flex items-center">
            <label htmlFor="characters" className="mr-2 font-bold">Characters</label>
            <div className="relative">
              <button id="addFieldButton" className="px-1 bg-white font-bold rounded-md shadow" onClick={handleAddField}>
                +
              </button>
            </div>
          </div>
          {additionalFields.map((field, index) => (
            <div key={index} className="flex flex-col mt-1">
              <FlexLabelInput
                label="Name:"
                name={`name${index}`}
                type="text"
                value={field.name}
                onChange={(e) => handleAdditionalFieldChange(index, "name", e.target.value)}
                onBlur={handleBlur}
              />
              <FlexLabelInput
                label="Description:"
                name={`description${index}`}
                type="textarea"
                value={field.description}
                onChange={(e) => handleAdditionalFieldChange(index, "description", e.target.value)}
                onBlur={handleBlur}
                placeholder={`Ex. Description of the character`}
                rows={2}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-5 font-bold md:w-1/2 md:pl-2">
          <FlexLabelInput
            label="Lesson"
            name="lesson"
            type="text"
            value={values.lesson}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.lesson && errors.lesson ? (
            <div>{errors.lesson}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          intent="gradiant"
          size="large"
          className="bg-pink text-white font-satoshi rounded w-96 h-12 p-2 text-xl"
        >
          Write My Book!
        </Button>
      </form>
    </section>
  );
};

export default StoryForm;

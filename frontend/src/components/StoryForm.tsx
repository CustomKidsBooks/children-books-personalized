"use client";
import { Button } from "@ui/Button";
import { Heading } from "@ui/Heading";
import { ageGroupList } from "@utils/constants";
import { AdditionalField, FormValues } from "@utils/interfaces";
import { createStoryValidationSchema } from "@utils/storyValidation";
import React, { useState } from "react";
import ReusableInput from "./ReusableInput";
import Image from "next/image";
import { useFormik } from "formik";

interface FormProps {
  handleSubmit: (values: FormValues) => Promise<void>;
}
interface StoryFormProps extends FormProps {
  setAdditionalFields: React.Dispatch<React.SetStateAction<AdditionalField[]>>;
  additionalFields: AdditionalField[];
}

const StoryForm: React.FC<StoryFormProps> = ({
  handleSubmit,
  setAdditionalFields,
  additionalFields,
}) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit: formikSubmit,
  } = useFormik<FormValues>({
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
    setAdditionalFields([...additionalFields, { name: "", description: "" }]);
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
    <section className="w-full max-w-2xl p-10">
      <div className="p-10">
        <h1 className={Heading({ align: "left", size: "small" })}>
          Create your Story!
        </h1>
      </div>
      <div className="p-10 flex flex-col">
        <form onSubmit={formikSubmit}>
          <div className="md:flex items-center justify-between p-1">
            <label
              htmlFor="title"
              className="text-lg md:text-xl font-quicksand font-bold tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2"
            >
              Title
              <span className="text-red-500">*</span>
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
          <div>
            {touched.title && errors.title ? <div>{errors.title}</div> : null}
          </div>

          <div className="md:flex items-center justify-between p-1">
            <label
              htmlFor="ageGroup"
              className="font-bold text-xl md:text-2xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2"
            >
              Age
              <span className="text-red-500">*</span>
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
            {touched.ageGroup && errors.ageGroup ? (
              <div>{errors.ageGroup}</div>
            ) : null}
          </div>
          <label
            htmlFor="details"
            className="font-bold font-quicksand text-pink font_feature text-2xl  md:text-3xl tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose"
          >
            Add more details:
          </label>

          <div className="items-center justify-between px-1">
            <label
              htmlFor="subject"
              className="text-lg  md:text-xl font-bold font-quicksand"
            >
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
              className="md:w-full"
            />
            {touched.subject && errors.subject ? (
              <div>{errors.subject}</div>
            ) : null}
          </div>

          <div className="flex flex-col text-sm md:pr-2">
            <div className="flex items-center">
              <label
                htmlFor="characters"
                className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2 "
              >
                Characters
              </label>
              <div className="flex items-center">
                <button
                  id="addFieldButton"
                  className="px-1 bg-white font-bold font-quicksand"
                  onClick={handleAddField}
                >
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
                <div className="md:flex items-center justify-between px-1">
                  <label
                    htmlFor="subject"
                    className="font-medium text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2"
                  >
                    Name:
                  </label>
                  <ReusableInput
                    id="name"
                    name={`name${index}`}
                    type="text"
                    value={field.name}
                    onChange={(e) =>
                      handleAdditionalFieldChange(index, "name", e.target.value)
                    }
                    onBlur={handleBlur}
                    className="md:w-full"
                  />
                </div>
                <div className="md:flex items-center justify-between px-1">
                  <label
                    htmlFor="subject"
                    className="font-medium text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2"
                  >
                    Description:
                  </label>
                  <ReusableInput
                    id="description"
                    name={`description${index}`}
                    type="textarea"
                    value={field.description}
                    onChange={(e) =>
                      handleAdditionalFieldChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    onBlur={handleBlur}
                    placeholder={`Ex. Description of the character`}
                    rows={2}
                  />
                </div>
                <hr className="bg-pink h-0.5 mx-10" />
              </div>
            ))}
          </div>
          <div className="flex flex-col text-sm">
            <div className="md:flex items-center justify-between px-1">
              <label
                htmlFor="lesson"
                className="font-bold text-lg md:text-xl font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose mr-2"
              >
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
          <Button type="submit" intent="pink" size="xl">
            Write my book!
          </Button>
        </form>
      </div>
    </section>
  );
};

export default StoryForm;

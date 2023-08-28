"use client";
import React from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@ui/Button";
import { Heading } from "@ui/Heading";
import { ageGroupList } from "@utils/constants";
import { AdditionalField, FormValues } from "@utils/interfaces";
import { createStoryValidationSchema } from "@utils/storyValidation";
import ReusableInput from "./ReusableInput";

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
    <>
      <section className="w-full p-10">
        <div className="flex">
          <div className="p-1 relative shrink flex flex-col items-center sm:flex-row sm:items-center justify-center">
            <Image
              src="/assets/create-story.jpg"
              alt="create-story"
              width={500}
              height={3}
              className="ml-4 lg:ml-12"
            />
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-70 p-2 whitespace-nowrap`}
            >
              <h1
                className={`${Heading({
                  align: "center",
                })} font-normal text-xl lg:text-3xl text-black font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose`}
              >
                Create your{" "}
                <span className="font-pacifico font-bold">Story!</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 lg:grid-cols-12 gap-x-8">
          <div className="col-span-7">
            <div className="bg-kid h-229 background"></div>
            <div className="inline-flex pt-3 pr-4 pb-px pl-3 flex-col justify-end items-start bg-education h-113.12 background">
            </div>
            <div className="px-10 flex flex-col -mt-28 lg:-mt-0">
              <form onSubmit={formikSubmit}>
                <div className="md:flex items-center justify-between">
                  <label
                    htmlFor="title"
                    className="label-input font-bold"
                  >
                    Title
                    <span className="asterisk">*</span>
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
                  {touched.title && errors.title ? (
                    <div className="asterisk">{errors.title}</div>
                  ) : null}
                </div>
                <div className="md:flex items-center">
                  <label
                    htmlFor="ageGroup"
                    className="label-input font-bold"
                  >
                    Age
                    <span className="asterisk">*</span>
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
                <div>
                  {touched.ageGroup && errors.ageGroup ? (
                    <div className="asterisk">{errors.ageGroup}</div>
                  ) : null}
                </div>
                <div className="relative">
                  <div className="bg-gradient-radial rounded-l-1337.728 absolute right-[-150px] opacity-40 w-350 h-full lg:bg-none lg:rounded-none"></div>
                  <label
                    htmlFor="details"
                    className="font-bold font-quicksand text-pink sm:text-2xl lg:text-3xl tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose"
                  >
                    Add more details:
                  </label>
                  <div className="md:flex items-center justify-between">
                    <label
                      htmlFor="subject"
                      className="label-input font-bold"
                    >
                      Subject
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
                      className="w-full"
                    />
                    {touched.subject && errors.subject ? (
                      <div>{errors.subject}</div>
                    ) : null}
                  </div>
                  <div className="flex flex-col text-sm md:pr-2">
                    <div className="flex items-center">
                      <label
                        htmlFor="characters"
                        className="label-input font-bold"
                      >
                        Characters
                      </label>
                      <div className="flex items-center">
                        <button
                          id="addFieldButton"
                          className="px-1 sm:px-0.5 bg-white font-bold font-quicksand shadow-xl sm:shadow-md"
                          onClick={handleAddField}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                    {additionalFields.map((field, index) => (
                      <div key={index} className="flex flex-col mt-1">
                        <div className="md:flex items-center justify-between px-1">
                          <label
                            htmlFor="name"
                            className="label-input font-medium"
                          >
                            Name:
                          </label>
                          <ReusableInput
                            id="name"
                            name={`name${index}`}
                            type="text"
                            value={field.name}
                            onChange={(e) =>
                              handleAdditionalFieldChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            onBlur={handleBlur}
                            className="w-full"
                          />
                        </div>
                        <div className="md:flex items-center justify-between px-1">
                          <label
                            htmlFor="description"
                            className="label-input font-medium"
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
                  <div className="md:flex items-center justify-between">
                    <label
                      htmlFor="lesson"
                      className="label-input font-bold"
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
                    {touched.lesson && errors.lesson ? (
                      <div>{errors.lesson}</div>
                    ) : null}
                  </div>
                  <div className="pt-10">
                    <Button type="submit" intent="pink" size="xl">
                      Write my book!
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-5 ml-auto shrink hidden lg:block">
            <Image
              src="/assets/kid-book.svg"
              alt="kids book"
              width={514}
              height={783}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryForm;

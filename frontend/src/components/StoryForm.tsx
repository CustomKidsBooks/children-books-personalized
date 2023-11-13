"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@ui/Button";
import { ageGroupList, privacyList } from "@utils/constants";
import { CreateStoryFormValues } from "@utils/interfaces";
import { createStoryValidationSchema } from "@utils/storyValidation";
import { getIn, useFormik } from "formik";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReusableInput from "./ReusableInput";
import CreateStorySkeleton from "./skeleton/CreateStory.skeleton";
import CreateStoryResponseModal from "@components/create-story-model/createStoryResponse";

interface CreateStoryFormProps {
  isError: boolean;
  submitting: boolean;
  bookID: string;
  handleCreateStory: (values: CreateStoryFormValues) => Promise<void>;
  userID?: string | null;
}

const StoryForm: React.FC<CreateStoryFormProps> = ({
  isError,
  submitting,
  bookID,
  handleCreateStory,
  userID,
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik<CreateStoryFormValues>({
    initialValues: {
      title: "",
      privacy: "Public",
      ageGroup: "0-1",
      subject: "",
      page: 3,
      characters: [],
      lesson: "",
    },
    validationSchema: createStoryValidationSchema,
    onSubmit: (values) => {
      handleCreateStory(values);
    },
  });

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isError || bookID !== "") {
      setIsModalVisible(true);
    }
    return () => { };
  }, [isError, bookID]);

  if (submitting) {
    return <CreateStorySkeleton />;
  }

  return (
    <>
      <section className="w-full py-10 lg:px-10 lg:pb-20">
        <div className="flex px-10">
          <div className="relative">
            <Image
              src="/assets/create-story.jpg"
              alt="create-story"
              width={500}
              height={3}
            />
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-normal text-xl lg:text-3xl text-black font-quicksand tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose whitespace-nowrap">
              Create your{" "}
              <span className="font-pacifico font-bold">Story!</span>
            </h1>
          </div>
        </div>
        <div className="bg-kid h-[229px] bg-no-repeat bg-left-top background lg:hidden"></div>
        <div className="bg-education h-[114px] background lg:hidden"></div>
        <div className="w-full lg:flex -mt-24 lg:mt-10 bg-ellipse-create-story-page bg-no-repeat bg-contain lg:bg-none bg-right-bottom">
          <div className="lg:w-2/4 px-10">
            <form onSubmit={handleSubmit}>
              <div className="md:flex items-center justify-between">
                <label htmlFor="title" className="label-input font-bold">
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
                <label htmlFor="ageGroup" className="label-input font-bold">
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

              {userID && (
                <div className="md:flex items-center">
                  <label htmlFor="privacy" className="label-input font-bold">
                    Privacy
                    <span className="asterisk">*</span>
                  </label>
                  <ReusableInput
                    id="privacy"
                    name="privacy"
                    type="select"
                    value={values.privacy}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    options={privacyList}
                  />
                </div>
              )}
              <div>
                {touched.privacy && errors.privacy ? (
                  <div className="asterisk">{errors.privacy}</div>
                ) : null}
              </div>

              <div className="relative">
                <label
                  htmlFor="details"
                  className="font-bold font-quicksand text-pink sm:text-2xl lg:text-3xl tracking-normal md:tracking-widest leading-none md:leading-normal lg:leading-loose"
                >
                  Add more details:
                </label>
                <div className="md:flex items-center justify-between">
                  <label htmlFor="subject" className="label-input font-bold">
                    Subject
                    <span className="asterisk">*</span>
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
                </div>
                <div>
                  {touched.subject && errors.subject ? (
                    <div className="asterisk">{errors.subject}</div>
                  ) : null}
                </div>
                <div className="md:flex items-center justify-between">
                  <label htmlFor="page" className="label-input font-bold">
                    Page
                  </label>
                  <ReusableInput
                    id="page"
                    name="page"
                    type="number"
                    value={values.page}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  {touched.page && errors.page ? (
                    <div className="asterisk">{errors.page}</div>
                  ) : null}
                </div>
                <div className="flex items-center">
                  <label htmlFor="characters" className="label-input font-bold">
                    Characters
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("characters", [
                          ...(values.characters || []),
                          { name: "", description: "" },
                        ])
                      }
                    >
                      <FontAwesomeIcon icon={faPlus} />{" "}
                    </button>
                  </div>
                </div>
                {values.characters && values.characters.length > 0
                  ? (values.characters || []).map((character, index) => (
                    <div key={index} className="flex flex-col mt-1">
                      <div className="md:flex items-center justify-between px-1">
                        <label
                          htmlFor={`characters.${index}.name`}
                          className="label-input font-medium"
                        >
                          Name:
                        </label>
                        <ReusableInput
                          type="text"
                          id={`characters.${index}.name`}
                          name={`characters.${index}.name`}
                          onChange={handleChange}
                          value={character.name}
                          placeholder="Name"
                          onBlur={handleBlur}
                          className="w-full"
                        />
                      </div>
                      <div className="asterisk">
                        {errors.characters && (
                          <div>
                            {getIn(errors, `characters.${index}.name`)}
                          </div>
                        )}
                      </div>
                      <div className="md:flex items-center justify-between px-1">
                        <label
                          htmlFor={`characters.${index}.description`}
                          className="label-input font-medium"
                        >
                          Description:
                        </label>
                        <ReusableInput
                          type="text"
                          id={`characters.${index}.description`}
                          name={`characters.${index}.description`}
                          onChange={handleChange}
                          value={character.description}
                          onBlur={handleBlur}
                          placeholder={`Ex. Description of the character`}
                          rows={2}
                        />
                      </div>
                      <div className="asterisk">
                        {errors.characters && (
                          <div>
                            {getIn(errors, `characters.${index}.description`)}
                          </div>
                        )}
                      </div>
                      <button
                        className="text-pink p-3"
                        type="button"
                        onClick={() => {
                          const updatedCharacters = [
                            ...(values.characters || []),
                          ];
                          updatedCharacters.splice(index, 1);
                          setFieldValue("characters", updatedCharacters);
                        }}
                      >
                        Remove Character
                      </button>
                      <hr className="bg-pink h-0.5 mx-10" />
                    </div>
                  ))
                  : null}

                <div className="md:flex items-center justify-between">
                  <label htmlFor="lesson" className="label-input font-bold">
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
                {isModalVisible && (
                  <div>
                    <CreateStoryResponseModal
                      onClose={handleModalClose}
                      isVisible={true}
                      bookID={bookID}
                      isError={isError}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="lg:w-2/4 bg-contain bg-no-repeat bg-top bg-kid-book hidden lg:block"></div>
        </div>
      </section>
    </>
  );
};

export default StoryForm;

"use client";
import { useState } from "react";
import StoryForm from "@components/StoryForm";
import { CreateStoryFormValues, AdditionalField } from "@utils/interfaces";
import { axiosInstance } from "@services/api-client";

const CreateStory = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    []
  );

  const createPrompt = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/api/create_book", {
        title: values.title,
        ageGroup: values.ageGroup,
        subject: values.subject,
        page: values.page,
        characters: additionalFields,
        lesson: values.lesson,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <StoryForm
      additionalFields={additionalFields}
      setAdditionalFields={setAdditionalFields}
      handleSubmit={createPrompt}
    />
  );
};

export default CreateStory;

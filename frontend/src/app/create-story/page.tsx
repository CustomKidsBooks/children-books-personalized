"use client";
import { useState } from "react";
import StoryForm from "@components/StoryForm";
import { FormValues } from "@utils/interfaces";
import { axiosInstance } from "@services/api-client";

const CreateStory = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  const createPrompt = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
        const response = await axiosInstance.post("/api/create_book", {
          subject: values.subject,
          description: values.description,
          character: values.character,
          ageGroup: values.ageGroup,
        });
    } catch (error) {
      console.error("API Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <StoryForm
      handleSubmit={createPrompt}
    />
  );
};

export default CreateStory;
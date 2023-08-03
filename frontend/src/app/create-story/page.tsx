"use client";
import { useState } from "react";
import StoryForm from "@components/StoryForm";
import { FormValues } from "@utils/interfaces";
import axios from "axios";

const CreateStory = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  const createPrompt = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
        const response = await axios.post("http://localhost:5001/api/create_paragraph", {
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
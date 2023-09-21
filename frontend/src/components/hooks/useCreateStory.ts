import { axiosInstance } from "@services/api-client";
import { CreateStoryFormValues } from "@utils/interfaces";
import { useState } from "react";

const useCreateStory = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);

  const createStory = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    console.log('characters', values);
    
    await axiosInstance
      .post("/api/create_book", {
        title: values.title,
        ageGroup: values.ageGroup,
        subject: values.subject,
        page: values.page,
        characters: values.characters,
        lesson: values.lesson,
      })
      .then((res) => console.log("Book created successfully!"))
      .catch((err) => setIsError(true))
      .finally(() => setIsSubmitting(false));
  };

  return {
    isError,
    submitting,
    createStory,
  };
};

export default useCreateStory;

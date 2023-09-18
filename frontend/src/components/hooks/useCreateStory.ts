import { axiosInstance } from "@services/api-client";
import { AdditionalField, CreateStoryFormValues } from "@utils/interfaces";
import { useState } from "react";

const useCreateStory = () => {
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [additionalFields, setAdditionalFields] = useState<AdditionalField[]>(
    []
  );

  const [isError, setIsError] = useState<boolean>(false);

  const createStory = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    await axiosInstance
      .post("/api/create_post", {
        title: values.title,
        ageGroup: values.ageGroup,
        subject: values.subject,
        page: values.page,
        characters: additionalFields,
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

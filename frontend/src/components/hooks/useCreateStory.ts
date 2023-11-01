import { useUser } from "@auth0/nextjs-auth0/client";
import { CreateStoryFormValues } from "@utils/interfaces";
import axios from "axios";
import { useState } from "react";

const useCreateStory = () => {
  const { user, error, isLoading } = useUser();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const url = user ? `/api/protected/create_book/${user.sub}` : `/api/create_book`;

  const createStory = async (values: CreateStoryFormValues) => {
    setIsSubmitting(true);
    await axios
      .post(url, {
        title: values.title,
        ageGroup: values.ageGroup,
        privacy: values.privacy,
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

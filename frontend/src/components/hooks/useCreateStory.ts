import { axiosInstance } from "@services/api-client";
import { CreateStoryFormValues } from "@utils/interfaces";
import { useState } from "react";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

const useCreateStory = () => {
  const { user, error, isLoading } = useUser();
  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const createStory = async (values: CreateStoryFormValues) => {
    // if (user) {
    //   const { accessToken } = await getAccessToken();
    // }

    setIsSubmitting(true);
    await axiosInstance
      .post("/api/create_book", {
        userEmail: user?.email || null,
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
